import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangeUsernameForm = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");


        const userString = localStorage.getItem("user");
        const user = JSON.parse(userString);

        
        try {
            const response = await fetch(`http://localhost:3000/users/change-name`, 
            {
                method: "PUT",
                headers: 
                {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ name: username,email:user.email}),
            });
    
            const data = await response.json();
    
            if (response.ok) 
            {
                setSuccess("Username changed successfully!");
                setEmail("");
                setUsername("");
            } else 
            {
                setError(data.message || "Failed to change username.");
            }
        } catch (err) 
        {
            setError("Network error. Please try again.");
            console.error(err);
        }
    };
    

    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="p-8 rounded-lg shadow-lg bg-white max-w-md w-full">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                    Change Username
                </h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                {success && <div className="text-green-500 mb-4">{success}</div>}
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="username"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            New Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your new username"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                        Change Username
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangeUsernameForm;
