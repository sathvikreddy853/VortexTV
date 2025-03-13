import React from 'react';
import Navbar1 from './Navbar1';

const ContactUs = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white">
            <div className="container mx-auto px-6 py-12 text-center">
                <h1 className="text-4xl font-extrabold mb-6">Contact Us</h1>
                <p className="max-w-3xl mx-auto text-lg text-gray-300 leading-relaxed">
                    We'd love to hear from you! If you have any questions, comments, or concerns, 
                    please don't hesitate to reach out.
                </p>
                
                <div className="mt-8 space-y-4 max-w-lg mx-auto text-left bg-gray-800 p-6 rounded-lg shadow-lg">
                    <div>
                        <p className="text-blue-400 font-semibold">Email:</p>
                        <p className="text-gray-300">support@vortextv.com</p>
                    </div>
                    <div>
                        <p className="text-blue-400 font-semibold">Phone:</p>
                        <p className="text-gray-300">1234567890</p>
                    </div>
                    <div>
                        <p className="text-blue-400 font-semibold">Address:</p>
                        <p className="text-gray-300">IIT Hyderabad, Kandi</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
