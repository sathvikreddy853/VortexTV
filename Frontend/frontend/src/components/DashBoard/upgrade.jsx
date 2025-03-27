import { useState } from "react";

const plans = [
    { id: "Plan_1", name: "Basic", price: 100, duration: 30 },
    { id: "Plan_2", name: "Vip", price: 200, duration: 30 },
    { id: "Plan_3", name: "Premium", price: 300, duration: 30 },
];

export default function UpgradePage() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));


    const handleUpgrade = async (plan) => {
        setLoading(true);
        setMessage("");
        try {
            const token = localStorage.getItem("token");

            const response = await fetch("http://localhost:3000/subscription/upgrade", {
                method: "POST",
                headers: 
                {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    user_id: user.user_id, // Replace with actual user_id
                    plan_id: plan.id,
                    duration: plan.duration,
                }),
            });

            const data = await response.json();
            if (response.ok) 
            {
                setMessage(data.message);
            } else 
            {
                setMessage(data.error || "Something went wrong");
            }
        } catch (error) {
            setMessage("Failed to connect to the server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-6 p-6">
            <h1 className="text-2xl font-bold">Choose Your Plan</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan, index) => (
                    <div key={plan.id} className="border p-4 rounded-lg shadow-lg text-center">
                        <h2 className="text-xl font-semibold">{plan.name}</h2>
                        <p className="text-gray-600">Plan Index: {index + 1}</p>
                        <p className="text-gray-800 font-bold">Price: ₹{plan.price}</p>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() => handleUpgrade(plan)}
                            disabled={loading}
                        >
                            {loading ? "Processing..." : "Upgrade"}
                        </button>
                    </div>
                ))}
            </div>
            {message && <p className="mt-4 text-center text-lg text-green-600">{message}</p>}
        </div>
    );
}
