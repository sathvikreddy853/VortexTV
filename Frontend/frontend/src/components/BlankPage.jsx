// BlankPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlankPage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token
        localStorage.removeItem('user'); // remove user data
        navigate('/'); // Redirect to login page
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            {user ? (
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Welcome, {user.name}!</h1>
                    <p className="text-lg">Your email: {user.email}</p>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <p>User data not found.</p>
            )}
        </div>
    );
};

export default BlankPage;