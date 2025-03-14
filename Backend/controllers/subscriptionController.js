import Subscription from "../models/subscription.js";
import User from "../models/user.js";

const SubscriptionController = {

    // if was succesful then in return along with message it sends the row also
    subscribeUser: async (req, res) => {
        try {
            const { email, user_id, plan_id ,duration} = req.body;
             /******************** */
             console.log( "from controller ",user_id,plan_id,duration)  // planid null here
            const value = await User.IsUserPresent(user_id, email);

            if (!value) 
            {
                return res.status(404).json({ message: "User not found" });
            }
            // this is not of much use but a security check 
            /************************ */

            const existingSubscription = await Subscription.findSubscriptionByUserId(user_id);

            if (existingSubscription) 
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

    subscriptionDetails: async (req, res) => {

            const {user_id} = req.body

        try 
        {
                const subscription = await Subscription.findSubscriptionByUserId(user_id);
                const {planName} = await Subscription.getPlanName(subscription.plan_id);
                const endDate = await Subscription.getEndDate(user_id);

                if (subscription) 
                {
                    return res.status(200).json({ planName,endDate})}
                    
                else 
                {
                    return res.status(404).json({ message: "Subscription not found" });
                }
        } catch (error) 
        {
            console.error("Error getting subscription details:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }


};

export default SubscriptionController;
