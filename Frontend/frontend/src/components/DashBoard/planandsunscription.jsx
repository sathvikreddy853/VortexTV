// PlansPage.jsx
import React, { useState } from "react";
import "./CSS/PlansPage.css"; // Import the custom CSS

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
    if (!user) return <p className="login-message">Please log in to subscribe.</p>;

    const handleSubscribe = async (planId, index) => {
        setMessage("Processing...");

        try {
            console.log(planId, user.email, user.user_id);

            const token = localStorage.getItem("token");
            if (!token) {
                setMessage("Unauthorized: No token found.");
                return;
            }

            const response = await fetch("http://localhost:3000/subscription/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    user_id: user.user_id,
                    email: user.email,
                    plan_id: planId,
                    duration: plans[index].duration,
                }),
            });
            const data = await response.json();

            if (response.ok) {
                setMessage("Subscription successful!");
                setEndDate(data.subscription.end_date);
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage("Error processing subscription. Please try again.");
            console.error("Subscription error:", error);
        }

        setTimeout(() => {
            setMessage("");
            setEndDate(null);
        }, 5000);
    };

    return (
        <div className="plans-container">
            <h1 className="plans-title">Choose Your Plan</h1>
            <div className="plans-grid">
                {plans.map((plan, index) => (
                    <div key={plan.id} className="plan-card">
                        <h2 className="plan-name">{plan.name}</h2>
                        <p className="plan-price">
                            {plan.price} Rs / {plan.duration} days
                        </p>
                        <button className="subscribe-button" onClick={() => handleSubscribe(plan.id, index)}>
                            Subscribe
                        </button>
                    </div>
                ))}
            </div>

            {message && (
                <div className="message-box">
                    <p className="message-text">{message}</p>
                    {endDate && <p className="end-date">Subscription ends on: {endDate}</p>}
                </div>
            )}
        </div>
    );
}