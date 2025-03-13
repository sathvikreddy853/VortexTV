import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar1 = () => {
    const location = useLocation();

    const getLinkStyle = (path) => {
        return `text-gray-300 hover:text-white transition duration-300 ease-in-out px-4 py-2 rounded-lg 
            ${location.pathname === path ? 'bg-gray-700 shadow-md' : 'hover:bg-gray-600'}`;
    };

    return (
        <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white font-extrabold text-2xl tracking-wide">VortexTV</div>
                <div className="space-x-4 flex">
                    <Link to="/" className={getLinkStyle('/')}>Intro</Link>
                    <Link to="/login" className={getLinkStyle('/login')}>Login</Link>
                    <Link to="/aboutus" className={getLinkStyle('/aboutus')}>About Us</Link>
                    <Link to="/contactus" className={getLinkStyle('/contactus')}>Contact Us</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar1;
