// ContactUs.jsx

import React from 'react';
import Navbar1 from './Navbar1';
const ContactUs = () => {
    return (
        <div>
        <Navbar1/>
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <p className="text-gray-700 leading-relaxed">
                We'd love to hear from you! If you have any questions, comments, or concerns, please don't hesitate to reach out.
            </p>
            <div className="mt-4">
                <p className="font-semibold">Emails:</p>
                <p className="text-gray-700">support@vortextv.com</p>
            </div>
            <div className="mt-2">
                <p className="font-semibold">Phone:</p>
                <p className="text-gray-700">1234567890</p>
            </div>
            <div className="mt-2">
                <p className="font-semibold">Address:</p>
                <p className="text-gray-700">IIT Hyderabad Kandi</p>
            </div>
        </div>
        </div>
    );
};

export default ContactUs;