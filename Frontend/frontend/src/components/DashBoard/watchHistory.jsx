import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WatchHistoryMovieCard from "./smallcomponents/watchhistorymoviecard";
import { ArrowLeft } from "lucide-react";

const WatchHistory = () => {
    const [watchHistory, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [titleHover, setTitleHover] = useState(false);

    useEffect(() => {
        const fetchWatchlist = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3000/movieaccess/fetchwatchhistory",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify({ user_id: JSON.parse(localStorage.getItem("user"))?.user_id }),
                    }
                );
                const data = await response.json();

                if (data.success) {
                    setWatchlist(data.watchHistory);
                } else {
                    console.error("Failed to fetch watchHistory");
                }
            } catch (error) {
                console.error("Error fetching watchHistory:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWatchlist();
    }, []);

    const titleStyle = {
        transition: 'transform 0.4s ease-in-out, filter 0.4s ease-in-out',
        transform: titleHover ? 'translateY(-10px) scale(1.1)' : 'translateY(0) scale(1)',
        filter: titleHover ? 'drop-shadow(0 10px 10px rgba(0, 0, 0, 0.5))' : 'drop-shadow(0 5px 5px rgba(0, 0, 0, 0.3))',
        textShadow: titleHover ? '2px 2px 4px rgba(0, 0, 0, 0.8)' : '1px 1px 2px rgba(0, 0, 0, 0.5)'
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-16">
            <div className="max-w-6xl mx-auto px-6">
                <button 
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white px-5 py-2 rounded-full shadow-md transition duration-300 hover:scale-105"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft size={20} /> <span className="font-semibold">Back</span>
                </button>
                
                <h1
                    className="text-5xl font-extrabold text-center mt-8 mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 drop-shadow-lg"
                    style={titleStyle}
                    onMouseEnter={() => setTitleHover(true)}
                    onMouseLeave={() => setTitleHover(false)}
                >
                    Your <span className="text-white">Watch History</span>
                </h1>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array(6).fill(0).map((_, index) => (
                            <div 
                                key={index} 
                                className="h-64 bg-gradient-to-br from-gray-800 to-gray-950 animate-pulse rounded-3xl shadow-lg border border-gray-800"
                            ></div>
                        ))}
                    </div>
                ) : watchHistory.length === 0 ? (
                    <div className="flex flex-col items-center justify-center mt-16">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500 mb-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <p className="text-center text-lg text-gray-400">
                            Your watch history is empty. Start watching movies now!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {watchHistory.map((movie) => (
                            <WatchHistoryMovieCard key={movie.movie_id} movieInfo={movie} link={movie.source_link} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WatchHistory;