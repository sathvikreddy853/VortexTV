// Profile.jsx
import React from 'react';
import { useEffect,useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

const Profile = () => {
    const user = JSON.parse(localStorage.getItem('user')) || 
    {
        name: 'Guest User',
        email: 'guest@example.com',
    };
    const [plan, setPlan] = useState("No plan");
    const [endDate, setEndDate] = useState(new Date()); 
    const navigate =  useNavigate();


        // arrow function inside arrow is done because useffect dosent accept async functions
    useEffect(() => {
        const fetchPlanDetails = async () => {
            try {
                if (!user || !user.user_id)
                {
                    navigate("/login");
                    return;
                }
    
                const response = await fetch('http://localhost:3000/subscription/fetchplan', 
                                                {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({ user_id: user.user_id }),
                                                }
                                            );
    
                if (response.ok) 
                {
                    console.log()
                    const data = await response.json();
                    setPlan(data.planName);
                    setEndDate(new Date(data.endDate));
                }
            } catch (err) 
            {
                console.error("Error fetching plan details:", err);
            }
        };
    
        fetchPlanDetails();
    }, []); 
    

    
    //  useeffect hook helps in fetching which plan the user is subscribed to and also end date
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Profile</h2>

                <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
                    <h3 className="text-2xl font-semibold mb-6 text-center text-gray-700">User Information</h3>
                    <div className="mb-4">
                        <strong className="block text-gray-700 font-medium mb-1">Username:</strong>
                        <span className="block text-lg text-gray-900">{user.name}</span>
                    </div>
                    <div className="mb-4">
                        <strong className="block text-gray-700 font-medium mb-1">Email:</strong>
                        <span className="block text-lg text-gray-900">{user.email}</span>
                    </div>
                    <div className="mb-4">
                        <strong className="block text-gray-700 font-medium mb-1">Plan:</strong>
                        <span className="block text-lg text-gray-900">{plan}</span>
                    </div>
                    <div className="mb-4">
                        <strong className="block text-gray-700 font-medium mb-1">End Date:</strong>
                        <span className="block text-lg text-gray-900">{endDate ? endDate.toLocaleDateString() : "No plan subscribed"}</span>                    </div>
                </div>

                <div className="flex flex-col space-y-4">
                    <Link
                        to="/dashboard/profile/changeusername"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition duration-300"
                    >
                        Change Username
                    </Link>
                    <Link
                        to="/dashboard/profile/changepassword"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition duration-300"
                    >
                        Change Password
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;