import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PasswordChangeForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await fetch("http://localhost:3000/auth/reset-password",
            { 
                method: "POST",
                headers: 
                {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email: email,newPassword: password,}),
            });

            const data = await response.json();

            if (response.ok) 
            {
                setSuccess("Password reset successful!");
                setEmail("");
                setPassword("");
            } 
            else 
            {
                setError(data.message || "Failed to reset password.");
            }
        } catch (err) {
            setError("Network error. Please try again.");
            console.error(err);
        }
    };

    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="p-8 rounded-lg shadow-lg bg-white max-w-md w-full">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                    Reset Password
                </h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                {success && <div className="text-green-500 mb-4">{success}</div>}
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-bold mb-2">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="newPassword"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            New Password:
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your new password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PasswordChangeForm;