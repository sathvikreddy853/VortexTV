import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center p-8 rounded-lg shadow-lg bg-white max-w-md w-full">
                <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Page Not Found</h2>
                <p className="text-gray-600 mb-8">
                    Oops! The page you're looking for doesn't exist.
                </p>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                >
                    {localStorage.getItem('token') ? 'Logout' : 'Login'}
                </button>
            </div>
        </div>
    );
};

export default NotFound;