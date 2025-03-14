import { useState } from "react";


// u can ftchh from db but as they dont change much simply hard code
const plans = [
    { id: "Plan_1", name: "Basic", price: 100, duration: 30 },
    { id: "Plan_2", name: "Vip", price: 200, duration: 30 },
    { id: "Plan_3", name: "Premium", price: 300, duration: 30 },
];




export default function PlansPage() {
    const [message, setMessage] = useState("");
    const [endDate, setEndDate] = useState(null);
    
    const user = JSON.parse(localStorage.getItem("user")); // Assuming 'user' is stored in localStorage
    if (!user) return <p>Please log in to subscribe.</p>;


    const handleSubscribe = async (planId,index) => 
    {
        setMessage("Processing...");

        try {
            console.log(planId)
            console.log(user.email)
            console.log(user.user_id)
            
        
            const response = await fetch("http://localhost:3000/subscription/subscribe", 
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: user.user_id, email: user.email, plan_id:planId ,duration: plans[index].duration }),
            });
            const data = await response.json();

            if (response.ok) 
            {
                setMessage("Subscription successful!");
                setEndDate(data.subscription.end_date); 
            } 
            else 
            {
                setMessage(data.message);
            }
        } 
        catch (error) 
        {
            setMessage("Error processing subscription. Please try again.");
            console.error("Subscription error:", error);
        }
    };

    return (
        <div className="flex flex-col items-center p-6">
            <h1 className="text-2xl font-bold mb-4">Choose Your Plan</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {
                plans.map((plan, index) => (
                    <div key={plan.id} className="border p-4 rounded-lg shadow-lg text-center">
                        <h2 className="text-xl font-semibold">
                            {index + 1}. {plan.name}
                        </h2>
                        <p className="text-gray-700">${plan.price} / {plan.duration} days</p>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                            onClick={() => handleSubscribe(plan.id,index)}
                        >
                            Subscribe
                        </button>
                    </div>
                ))
            }
            </div>
            {message && (
                <div className="mt-4 p-3 bg-gray-100 border rounded-lg text-center">
                    <p>{message}</p>
                    {endDate && <p>Subscription ends on: {endDate}</p>}
                </div>
            )}
        </div>
    );
}
