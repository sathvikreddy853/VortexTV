import React from 'react';
import Navbar1 from './Navbar1';

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white">
            <div className="container mx-auto px-6 py-12 text-center">
                <h1 className="text-4xl font-extrabold mb-6">About VortexTV</h1>
                <p className="max-w-3xl mx-auto text-lg text-gray-300 leading-relaxed">
                    Welcome to <span className="text-blue-400 font-semibold">VortexTV</span>, your premier source for high-quality entertainment. 
                    We are dedicated to providing a diverse range of content to satisfy all your viewing needs. 
                    Our mission is to deliver exceptional experiences through innovative technology and creative storytelling.
                </p>
                <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-300 leading-relaxed">
                    Our team is composed of passionate professionals who strive to bring you the best in entertainment. 
                    We value your feedback and continuously work to improve our services. Thank you for choosing VortexTV.
                </p>
            </div>
        </div>
    );
};

export default AboutUs;
