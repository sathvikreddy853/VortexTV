import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Home = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();  

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
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
                    <NavLink to="/dashboard/planspage" label="Plans" location={location} />
                </nav>
            </div>

            {/* Main Content */}

                            {/* right part of nav bar */}
                {/* observe carefully i added margin 64 so thats y it seems this div is pushed 
                in actual if u dont add margin then simply the side bar will overlap the content */}


                {/* flex1 is basically flex 1 1 0%  that is it atkes up complete remaining space offered by parent flex */}



            <div className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? "ml-64" : "ml-0"} p-6`}>
                <h1 className="text-5xl font-extrabold text-center text-gray-800 mt-6 mb-4 drop-shadow-lg">
                    Vortex<span className="text-blue-500">TV</span>
                </h1>

                <button
                    onClick={toggleSidebar}
                    className={`bg-gray-900 text-white p-3 rounded-full m-4 hover:bg-gray-700 transition-all duration-300 shadow-md fixed top-0
                        ${isSidebarOpen ? "rotate-90" : "rotate-0"}`}>
                    ☰
                </button>

                <div className="min-h-screen bg-gradient-to-r from-blue-400 to-indigo-400 p-6 shadow-lg rounded-lg">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

// NavLink Component
const NavLink = ({ to, label, location }) => (
    <Link to={to} className={`block py-2 px-4 rounded-md text-lg font-medium transition-all duration-200 
        ${location.pathname === to ? "bg-indigo-600 text-white" : "hover:bg-red-500"}`}>
        {label}
    </Link>
);

export default Home;
