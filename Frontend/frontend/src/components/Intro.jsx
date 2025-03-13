import React, { useState, useEffect } from 'react';
import Navbar1 from './Navbar1';

const Intro = () => {
    const [displayText, setDisplayText] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const fullText = 'VortexTV';
        let currentIndex = 0;

        const animation = setInterval(() => {
            if (currentIndex <= fullText.length) 
            {
                setDisplayText(fullText.substring(0, currentIndex)); // step by step changing the text 
                //this is actually ineff but easy to implement 
                currentIndex++;
                //as use effect dependencies are nothing only runs upon mounting
                //nwow as useffect runs only ones but not every rerender so therfore current index is not reinitialized everytime 
            } 
            else 
            {
                clearInterval(animation);
                setIsVisible(true); 
            }
        }, 150);

        return () => clearInterval(animation); 

        // before unmounting the component this function is called so that now when i move to other component on navc bar this dosent happen
    }, []);

    return (
        // used colorpicker website for good gradient for a 
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className={`text-6xl font-extrabold transition-all duration-500 ease-in-out ${isVisible ? 'animate-glow' : '' }`}>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                        {displayText}
                    </span>
                </h1>
            </div>
        </div>
    );
};

export default Intro;
