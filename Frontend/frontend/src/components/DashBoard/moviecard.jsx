import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import image from "./img.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";



// expects props as movieInfo and link  
function MovieCard(props) {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);

    // this checks wether user can access this movie or not thats it
    const clickHandler = async (e) => {
        e.preventDefault();

        const response = await fetch(
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
                sessionStorage.setItem('thisMovie',JSON.stringify(props?.movieInfo))
                navigate('/dashboard/frame');
            } 
            else 
            {
                setShowPopup(true);
            }
        }
    };

    return (
        <>
            {/* Movie Card */}
            <Card
                onClick={clickHandler}
                
                style={{
                    width: '10rem',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                    transition: 'transform 1s ease-in-out',
                    backgroundColor: '#222',
                    color: 'white',
                    margin: "8px"
                }}
                className="hover:scale-105"
            >
                <Card.Img
                    variant="top"
                    src={image}
                    alt="Movie Poster"
                    style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                    }}
                />

                <Card.Body className="text-center" style={{ padding: '10px' }}>
                    <Card.Title style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                        {props?.movieInfo?.title}
                    </Card.Title>
                    <Card.Text style={{ fontSize: "0.9rem", color: "#ddd" }}>
                        Duration : {`${props?.movieInfo?.duration} mins`}
                    </Card.Text>
                    <Button
                        variant="danger"
                        style={{
                            fontSize: "0.9rem",
                            padding: "6px 14px",
                            borderRadius: "50px",
                            fontWeight: "bold",
                            transition: "all 0.5s ease-in-out"
                        }}
                        onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                        onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                    >
                        🎬 Watch Now
                    </Button>
                </Card.Body>
            </Card>

            {/* Popup Modal */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Access Denied
                        </h3>
                        <p className="text-gray-600 mt-2">
                            You need to upgrade your plan to watch this movie.
                        </p>
                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                onClick={() => navigate("/dashboard/planspage")}>
                                Renew Plan
                            </button>
                            <button
                                className="bg-gray-300 px-4 py-2 rounded-md"
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

export default MovieCard;
