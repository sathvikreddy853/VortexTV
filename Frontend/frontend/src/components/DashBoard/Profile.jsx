import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
    let user = JSON.parse(localStorage.getItem('user')) || {
        name: 'Guest User',
        email: 'guest@example.com',
    };
    const [plan, setPlan] = useState("No plan");
    const [endDate, setEndDate] = useState(null);
    const navigate = useNavigate();

    useEffect(
        () => {
        const fetchPlanDetails = async () => 
        {
            try {
                if (!user || !user.user_id) {
                    navigate("/login");
                    return;
                }

                let token = localStorage.getItem("token");
                
                // console.log(token)   // for debugging process
                
                if (!token) 
                {
                    console.error("No token found! Redirecting to login...");
                    return;  
                }



                const response = await fetch('http://localhost:3000/subscription/fetchplan', 
                        {
                            method: 'POST',
                            headers:{ 
                                        "Authorization": `Bearer ${token}`,
                                        'Content-Type': 'application/json' ,
                                    },
                                    body: JSON.stringify({ user_id: user.user_id }),
                        }
                );

                if (response.ok) 
                {
                    const data = await response.json();
                    setPlan(data.planName);
                    setEndDate(data.endDate ? new Date(data.endDate) : null);
                }
            } 
            catch (err) 
            {
                console.error("Error fetching plan details:", err);
            }
        };

        fetchPlanDetails();
    }, []);


//         useEffect (()=>{
//                 const fetchUserDetails = async () => 
//                 {
//                     // pending fill based on provided api
//                 }

//                 user=fetchUserDetails()
// },[])

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Profile</h2>

                <div className="bg-gray-50 rounded-xl shadow-md p-6 mb-6 border border-gray-200">
                    <h3 className="text-2xl font-semibold mb-4 text-center text-gray-700">User Information</h3>
                    <div className="mb-4">
                        <strong className="block text-gray-700 font-medium">Username:</strong>
                        <span className="block text-lg text-gray-900">{user.name}</span>
                    </div>
                    <div className="mb-4">
                        <strong className="block text-gray-700 font-medium">Email:</strong>
                        <span className="block text-lg text-gray-900">{user.email}</span>
                    </div>
                    <div className="mb-4">
                        <strong className="block text-gray-700 font-medium">Plan:</strong>
                        <span className="block text-lg text-gray-900">{plan}</span>
                    </div>
                    <div className="mb-4">
                        <strong className="block text-gray-700 font-medium">End Date:</strong>
                        <span className="block text-lg text-gray-900">
                            {endDate ? endDate.toLocaleDateString() : "No plan subscribed"}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col space-y-4">
                    <Link
                        to="/dashboard/profile/changeusername"
                        className="w-full bg-blue-600 hover:bg-blue-500 active:scale-90 text-white font-semibold py-3 px-6 rounded-xl text-center transition-all duration-300 ease-in-out shadow-md transform hover:-translate-y-1 hover:shadow-lg"
                    >
                        Change Username
                    </Link>
                    <Link
                        to="/dashboard/profile/changepassword"
                        className="w-full bg-blue-600 hover:bg-blue-500 active:scale-90 text-white font-semibold py-3 px-6 rounded-xl text-center transition-all duration-300 ease-in-out shadow-md transform hover:-translate-y-1 hover:shadow-lg"
                    >
                        Change Password
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-600 hover:bg-red-500 active:scale-90 text-white font-semibold py-3 px-6 rounded-xl text-center transition-all duration-300 ease-in-out shadow-md transform hover:-translate-y-1 hover:shadow-lg"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
