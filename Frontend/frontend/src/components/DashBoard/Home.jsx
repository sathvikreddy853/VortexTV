import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
const Home = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex h-screen bg-gray-100">
            
        <div className={`bg-gray-900 text-white w-64 p-6 fixed h-full transition-transform duration-300 ease-in-out shadow-xl
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-64"} `} >
            <button
                onClick={toggleSidebar}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200 text-2xl">
                ✕
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>
            <nav className="space-y-3">
                <NavLink to="/dashboard" label="Home" location={location} />
                <NavLink to="/dashboard/profile" label="Profile" location={location} />
                <NavLink to="/dashboard/watchlist" label="Watchlist" location={location} />
                <NavLink   to="/dashboard/planspage" label="plans" location={location} />
            </nav>
        </div>
    
        <div className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
            <h1 className="text-5xl font-extrabold text-center text-gray-800 mt-6 mb-4 drop-shadow-lg">
                Vortex<span className="text-blue-500">TV</span>
            </h1>
    
            <button
                onClick={toggleSidebar}
                className={`bg-gray-900 text-white p-3 rounded-full m-4 hover:bg-gray-700 transition-all duration-300 shadow-md fixed
                    ${isSidebarOpen ? "rotate-90" : "rotate-0"}`}>
                ☰
            </button>
    
            <div className="h-full bg-gradient-to-r from-blue-400 to-indigo-400 p-6 shadow-lg rounded-lg">
                <Outlet />
            </div>
        </div>
    </div>
    
    );
};


// navlink componnent is there to dinamically style the link based on location providesd by browser
const NavLink = ({ to, label, location }) => (
    <Link to={to} className={`block py-2 px-4 rounded-md text-lg font-medium transition-all duration-200 ${location.pathname === to ? "bg-indigo-600 text-white" : "hover:bg-red-500"}`}>
        {label}
    </Link>
);

export default Home;
