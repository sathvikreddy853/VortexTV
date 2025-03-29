import React from 'react';
import '../CSS/recommendationcard.css'; // Import the CSS file
import GenreTag from './genreTag';
import { useNavigate } from 'react-router-dom';
import { useEffect ,useState} from 'react';
function RecommendationCard(props) {
    const { movie } = props;
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const clickHandler = async (e) => {
        // Handle the click event, e.g., navigate to the movie's source
        e.preventDefault();

        const response = await fetch
            (
                `http://localhost:3000/movieaccess/checkAcess`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({ user_id: JSON.parse(localStorage.getItem("user"))?.user_id, movie_id: props?.movieInfo.movie_id }),
                }
            );


        const data = await response.json();
        
        


        if (response.ok) 
        {
            if (data.access) 
            {
                sessionStorage.setItem('videoLink', props?.link);
                sessionStorage.setItem('thisMovie', JSON.stringify(props?.movieInfo));
                navigate('/dashboard/frame');
            } else {
                setShowPopup(true);
            }
        }
    };



    return (
        <>
            <div className="recommendation-card" onClick={clickHandler}>
                <h2 className="movie-title">{props.movieInfo.title}</h2>
                <p className="movie-year">Year: {props.movieInfo.release_year}</p>
                <p className="movie-duration">Duration: {props.movieInfo.duration}</p>
                <p className="movie-rating">Rating: {props.movieInfo.rating}</p>
                <div className="movie-genres">
                    {props.movieInfo.genreArray && props.movieInfo.genreArray.map((genre, index) => (
                        <GenreTag key={index} genreName={genre} />
                    ))}
                </div>
            </div>

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg text-center max-w-sm">
                        <h3 className="text-md font-semibold text-gray-800">
                            Access Denied
                        </h3>
                        <p className="text-gray-600 mt-2 text-sm">
                            You need to upgrade your plan to watch this movie.
                        </p>
                        <div className="flex justify-center gap-3 mt-4">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm"
                                onClick={() => navigate("/dashboard/planspage")}>
                                Renew Plan
                            </button>
                            <button
                                className="bg-gray-300 px-4 py-2 rounded-md text-sm"
                                onClick={() => setShowPopup(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>

    );
}

export default RecommendationCard;