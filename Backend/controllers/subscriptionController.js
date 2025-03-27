import Subscription from "../models/subscription.js";
import User from "../models/user.js";

const SubscriptionController = {

    // if was succesful then in return along with message it sends the row also
    // description: it adds user if he is already not present or atleast his end date is greater than current date

    subscribeUser: async (req, res) => {
        try {
                const { email, user_id, plan_id ,duration} = req.body;
                /******************** */
                const value = await User.IsUserPresent(user_id, email);

                if (!value) 
                {
                    return res.status(404).json({ message: "User not found" });
                }
                // this is not of much use but a security check 
                /************************ */

                const existingSubscription = await Subscription.findSubscriptionByUserId(user_id);

                if (existingSubscription)  // if the user already has subscription
                {
                    const currentDate = new Date();
                    const subscriptionEndDate = new Date(existingSubscription.end_date);

                    if (currentDate > subscriptionEndDate) 
                    {
                        await Subscription.deleteSubscription(user_id);
                    } 
                    else 
                    {
                        return res.status(400).json({ message: `You already have an active plan until ${existingSubscription.end_date}`});
                    }
                }

                const newSubscription = await Subscription.addUserSubscription(user_id, plan_id,duration);

                if (newSubscription) 
                {
                        return res.status(201).json({ 
                        message: "Subscription successful", 
                        subscription: newSubscription });
                } 
                else 
                {
                    return res.status(500).json({ message: "Failed to subscribe" });
                }
            } 
            catch (error) 
            {
                console.error("Error subscribing user:", error);
                return res.status(500).json({ message: "Internal server error" });
            }
    },

    subscriptionDetails: async (req, res) => 
    {
        const { user_id } = req.body;
    
        try {
            const subscription = await Subscription.findSubscriptionByUserId(user_id);
    
            if (!subscription) {
                return res.status(200).json({ planName: "No Plan", endDate: null });
            }
    
            const { planName } = await Subscription.getPlanName(subscription.plan_id);
            const endDate = await Subscription.getEndDate(user_id);
    
            return res.status(200).json({ planName, endDate });
    
        } catch (error) {
            console.error("Error getting subscription details:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },
    updateSubscription: async (req, res) => {
        try {
            const { user_id, plan_id, duration } = req.body;
    
            //  Check if the user is already subscribed
            const isSubscribed = await Subscription.isUserSubscribed(user_id);
    
            if (isSubscribed) 
            {
                //Get current subscription details
                const currentSubscription = await Subscription.findSubscriptionByUserId(user_id);
                console.log("Current subscription", currentSubscription, plan_id);
    
                const currentPlanId = currentSubscription.plan_id;
                const currentEndDate = new Date(currentSubscription.end_date); // Ensure it's a Date object
                const now = new Date();
                let changedInDb = false;
    
                const currentPlanNumber = parseInt(currentPlanId.split("_")[1]);
                const requestedPlanNumber = parseInt(plan_id.split("_")[1]);
    
                if (currentPlanNumber === requestedPlanNumber) 
                {
                    console.log("Entering same plan check");
    
                    //  If the plan is the same, check if the subscription has expired
                    if (currentEndDate < now) 
                    {
                        // If expired, delete the existing subscription and add a new one
                        changedInDb = true;
                        await Subscription.deleteSubscription(user_id);
                        await Subscription.addUserSubscription(user_id, plan_id, duration);
                        return res.status(200).json({ message: "Subscription renewed with the same plan after expiration.", changedInDb });
                    } 
                    else 
                    {
                        // Inform user that they are already subscribed with the end date in Indian format (DD-MM-YYYY)
                        const formattedDate = currentEndDate.toLocaleDateString("en-IN");
                        return res.status(200).json({ message: `You are already subscribed to this Plan, your subscription will end at ${formattedDate}`, changedInDb });
                    }
                } 
                else if (currentPlanNumber < requestedPlanNumber) 
                {
                    // If switching to a higher plan, delete the old subscription and add a new one
                    changedInDb = true;
                    await Subscription.deleteSubscription(user_id);
                    await Subscription.addUserSubscription(user_id, plan_id, duration);
                    return res.status(200).json({ message: "Subscription updated to a new plan.", changedInDb });
                }
                else 
                {
                    // User is trying to downgrade their plan, which isn't allowed
                    const formattedDate = currentEndDate.toLocaleDateString("en-IN");
                    return res.status(200).json({ message: `You are already subscribed to a higher Plan, your subscription will end at ${formattedDate}`, changedInDb });
                }
            } 
            else 
            {
                // Step 5: If the user has no subscription, add a new one
                let changedInDb = true;
                await Subscription.addUserSubscription(user_id, plan_id, duration);
                return res.status(200).json({ message: "New subscription added.", changedInDb });
            }
        } 
        catch (error) 
        {
            console.error("Error updating subscription:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
    
    

};

export default SubscriptionController;
