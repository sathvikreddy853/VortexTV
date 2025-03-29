
import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Home = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();  

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    console.log("in Home.jsx");

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`bg-gray-900 text-white w-64 p-6 fixed h-full transition-transform duration-300 ease-in-out shadow-2xl z-50
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-64"} `} >
                <button
                    onClick={toggleSidebar}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200 text-2xl">
                    ☰
                </button>
                <h2 className="text-3xl font-bold mb-6 text-center tracking-wide">Dashboard</h2>

                <nav className="space-y-4">
                    <NavLink to="/dashboard" label="Home" location={location} />
                    <NavLink to="/dashboard/profile" label="Profile" location={location} />
                    <NavLink to="/dashboard/watchlist" label="Watchlist" location={location} />
                    <NavLink to="/dashboard/planspage" label="Plans" location={location} />
                    <NavLink to ="/dashboard/searchbar" label="Search" location={location} />
                    <NavLink to ="/dashboard/upgrade" label="Upgrade" location={location} />
                    <NavLink to="/usr" label="My Reviews" location={location} />
                    <NavLink to ="/usr/genrefilterpage" label="Genre Filter" location={location} />
                    <NavLink to ="/usr/watchhistory" label="Watch History" location={location} />
                    </nav>
            </div>

            {/* Main Content */}
            <div className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? "ml-64" : "ml-0"} p-8 relative`}>
                <h1 className="text-6xl font-extrabold text-center text-gray-900 mt-6 mb-8 drop-shadow-xl">
                    Vortex<span className="text-blue-500">TV</span>
                </h1>

                <button
                    onClick={toggleSidebar}
                    className={`bg-gray-900 text-white p-3 rounded-full hover:bg-gray-700 transition-all duration-300 shadow-lg fixed top-6 left-6 z-40
                        ${isSidebarOpen ? "rotate-90" : "rotate-0"}`}>
                    ☰
                </button>

                <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 p-8 shadow-xl rounded-lg text-white">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

// NavLink Component
const NavLink = ({ to, label, location }) => 
(
    <Link to={to} className={`block py-3 px-5 rounded-lg text-lg font-medium transition-all duration-200 text-white tracking-wide shadow-md
        ${location.pathname === to ? "bg-indigo-700 scale-105" : "hover:bg-red-500"}`}>
        {label}
    </Link>
);

export default Home;
