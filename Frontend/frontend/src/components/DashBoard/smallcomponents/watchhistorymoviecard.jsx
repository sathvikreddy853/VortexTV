import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import GenreTag from "./genreTag";

export default function WatchHistoryMovieCard({ movieInfo, link }) {
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    const handlePlayClick = async (e) => {
        setLoading(true);
        e.preventDefault();

        const response = await fetch(
            `http://localhost:3000/movieaccess/checkAcess`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ 
                    user_id: JSON.parse(localStorage.getItem("user"))?.user_id, 
                    movie_id: movieInfo.movie_id 
                }),
            }
        );

        const data = await response.json();

        if (response.ok) {
            if (data.access) {
                setLoading(false);
                sessionStorage.setItem('videoLink', link);
                sessionStorage.setItem('thisMovie', JSON.stringify(movieInfo));
                navigate('/dashboard/frame');
            } else {
                setLoading(false);
                setShowPopup(true);
            }
        }
    };

    return (
        <div className="relative p-5 bg-gradient-to-br from-gray-900 to-gray-700 text-white rounded-2xl shadow-lg w-full overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            {/* Movie Thumbnail */}
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url(${movieInfo.thumbnail})` }}
            ></div>

            <div className="relative flex items-center">
                {/* Movie Details */}
                <div className="flex-1">
                    <h2 className="text-2xl font-bold drop-shadow-md">{movieInfo.title}</h2>
                    <p className="text-gray-300 mt-1">Release Date: <span className="font-semibold">{movieInfo.release_date}</span></p>
                    <p className="text-gray-300">Rating: <span className="font-semibold">{movieInfo.rating}</span></p>

                    {/* Genre Tags */}
                    <div className="flex flex-wrap mt-3">
                        {movieInfo.genreArray.map((genreName, index) => (
                            <GenreTag key={index} genreName={genreName} />
                        ))}
                    </div>
                </div>

                {/* Play Button */}
                <button
                    className="ml-4 p-4 bg-blue-500 rounded-full relative transition-all duration-200 hover:bg-blue-400 focus:ring-4 focus:ring-blue-300"
                    onClick={handlePlayClick}
                    disabled={loading}
                >
                    {loading ? (
                        <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <FaPlay className="text-white text-lg" />
                    )}
                </button>
            </div>
        </div>
    );
}
