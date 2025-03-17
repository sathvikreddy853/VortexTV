import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const YouTubeEmbed = () => {
    const [videoLink, setVideoLink] = useState(null);
    const navigate = useNavigate();

    useEffect(() => 
    {
        const storedLink = sessionStorage.getItem('videoLink');
        if (storedLink) 
        {
            setVideoLink(storedLink);
        } 

        
    }, []);


    useEffect(() => 
    {
        return () => 
        {
            //navigation APi  https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming/type
            const navigationType = performance.getEntriesByType("navigation")[0]?.type;
            if (navigationType !== "reload") 
            {
                sessionStorage.removeItem("videoLink");
            }
        };
    }, [location.pathname]); 



    const getVideoId = (url) => 
    {
        const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url?.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
    };

    const videoId = videoLink ? getVideoId(videoLink) : null;

    if (!videoId) 
    {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <p>Invalid YouTube link or access denied.</p>
            </div>
        );
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
            <div style={{ width: '80%', maxWidth: '800px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                <iframe
                    width="100%"
                    height="450"
                    src={embedUrl}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default YouTubeEmbed;