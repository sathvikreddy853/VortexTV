// AboutUs.jsx

import React from 'react';
import Navbar1 from './Navbar1';

const AboutUs = () => {
    return (
        <div>
        <Navbar1/>
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-4">About VortexTV</h1>
            <p className="text-gray-700 leading-relaxed">
                Welcome to VortexTV, your premier source for high-quality entertainment. We are dedicated to providing a diverse range of content to satisfy all your viewing needs. Our mission is to deliver exceptional experiences through innovative technology and creative storytelling.
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed">
                Our team is composed of passionate professionals who strive to bring you the best in entertainment. We value your feedback and continuously work to improve our services. Thank you for choosing VortexTV.
            </p>
        </div>
        </div>
    );
};

export default AboutUs;