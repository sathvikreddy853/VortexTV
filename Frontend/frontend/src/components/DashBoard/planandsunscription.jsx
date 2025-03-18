import { useState } from "react";

// Hardcoded plans
const plans = [
    { id: "Plan_1", name: "Basic", price: 100, duration: 30 },
    { id: "Plan_2", name: "Vip", price: 200, duration: 30 },
    { id: "Plan_3", name: "Premium", price: 300, duration: 30 },
];

export default function PlansPage() {
    const [message, setMessage] = useState("");
    const [endDate, setEndDate] = useState(null);

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return <p className="text-center text-lg">Please log in to subscribe.</p>;

    const handleSubscribe = async (planId, index) => {
        setMessage("Processing...");

        try {
            console.log(planId, user.email, user.user_id);

            const token = localStorage.getItem("token");
            if (!token) 
            {
                setMessage("Unauthorized: No token found.");
                return;
            }
    

            const response = await fetch("http://localhost:3000/subscription/subscribe", 
                {
                    method: "POST",
                    headers: 
                        {  "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    body: JSON.stringify({ user_id: user.user_id, email: user.email, plan_id: planId, duration: plans[index].duration }),
                }
            );
            const data = await response.json();

            if (response.ok) 
            {
                setMessage("Subscription successful!");
                setEndDate(data.subscription.end_date);
            } else 
            {
                setMessage(data.message);
            }
        } 
        catch (error) 
        {
            setMessage("Error processing subscription. Please try again.");
            console.error("Subscription error:", error);
        }

        setTimeout(() => 
        {
            setMessage("");
            setEndDate(null);
        }, 5000);
    };

    return (
        <div className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-3xl font-bold mb-8 text-center">Choose Your Plan</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map((plan, index) => (
                    <div key={plan.id} className="w-full max-w-xs sm:max-w-sm bg-white border p-6 rounded-2xl shadow-xl text-center transform hover:scale-105 transition-transform duration-300">
                        <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
                        <p className="text-gray-700 text-lg">{plan.price} Rs / {plan.duration} days</p>
                        <button  className="mt-6 px-5 py-3 bg-blue-500 text-white rounded-xl font-semibold shadow-md hover:bg-blue-600 transition-all duration-300" onClick={() => handleSubscribe(plan.id, index)}>
                            Subscribe
                        </button>
                    </div>
                ))}
            </div>

            {message && (
                <div className="mt-6 p-4 bg-gray-50 border rounded-xl shadow-md text-center w-full max-w-md">
                    <p className="text-lg">{message}</p>
                    {endDate && <p className="text-gray-600 mt-2">Subscription ends on: {endDate}</p>}
                </div>
            )}
        </div>
    );
}
