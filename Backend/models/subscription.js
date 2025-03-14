import pool from "../config/db.js";

const Subscription=
{
    // used only when u know confirmly the user need to be added
    addUserSubscription: async  (user_id,plan_id,duration)=>
    {
        console.log("from model ",user_id,plan_id)
        try{
            const subscriptionId = user_id+"_"+plan_id;

            const endDate = new Date();
            endDate.setDate(endDate.getDate() + duration);  // this 30 should be sent by the front end

            const [result]=await pool.execute(
                'INSERT INTO Subscriptions (subscription_id,user_id, plan_id,end_date) VALUES (?, ?, ?, ?)',
                [subscriptionId,user_id, plan_id,endDate]
            );
            return result.affectedRows;
            //pending rather than returning the affected rows return that subscription row
        }
        catch(error){
            console.error('Error adding subscription:', error);
            throw error;
        }
    },

    // Find a Subscription  by user_id

    findSubscriptionByUserId: async(user_id)=>
    {
        try{
            const [rows]=await pool.execute(
                'SELECT * FROM Subscriptions WHERE user_id = ?',
                [user_id]
            );
            return rows[0]; // returns complete row so u can check whats end date when user tries to claim a subscription when he is already there
        }
        catch(error){
            console.error('Error finding subscription by user_id:', error);
            throw error;
        }
    },

    //check wether user is already subscribe to some plan or not (basically returns boolean)
    isUserSubscribed: async(user_id)=>
    {
        try
        {
            const [rows]=await pool.execute(
                'SELECT * FROM Subscriptions WHERE user_id = ?',
                [user_id]
            );
            return rows.length>0;  // ofc will be 1
        }
        catch(error)
        {
            console.error('Error finding subscription by user_id:', error);
            throw error;
        }
    },

    // use after check from isSubscribed
    getEndDate: async (user_id)=>
    {
        try{
            const [rows]=await pool.execute(
                'SELECT * FROM Subscriptions WHERE user_id = ?',
                [user_id]
            );
            return rows[0].end_date;
        }
        catch(error)
        {
            console.error('Error finding subscription by user_id:', error);
            throw error;
        }
    },

    getPlanName: async (plan_id) => {
        try {
            const [rows] = await pool.execute(
                'SELECT name FROM Plans WHERE plan_id = ?',
                [plan_id]
            );
    
            if (rows.length === 0) 
            {
                throw new Error("Plan Not Found: plan_id=" + plan_id);
            }
    
            return {
                planName: rows[0].name,
            };
        } 
        catch (error) 
        {
            console.error('Error finding plan by plan_id:', error);
            throw error;
        }
    },


    
    

}

export default Subscription