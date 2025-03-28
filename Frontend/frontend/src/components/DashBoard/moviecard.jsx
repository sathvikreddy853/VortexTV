import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import image from "./img.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function MovieCard(props) {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);

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

        if (response.ok) {
            if (data.access) 
            {
                sessionStorage.setItem('videoLink', props?.link);
                sessionStorage.setItem('thisMovie', JSON.stringify(props?.movieInfo));
                navigate('/dashboard/frame');
            } else 
            {
                setShowPopup(true);
            }
        }
    };

    return (
        <>
            <Card
                onClick={clickHandler}
                style={{
                    width: "180px",
                    height: "280px",
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                    transition: 'transform 0.3s ease-in-out',
                    backgroundColor: '#222',
                    color: 'white',
                    margin: "5px",
                    cursor: "pointer",
                    display: 'flex',
                    flexDirection: 'column'
                }}
                className="hover:scale-105"
            >
                <Card.Img
                    variant="top"
                    src={image}
                    alt="Movie Poster"
                    style={{
                        width: '100%',
                        height: '70%',
                        objectFit: 'cover',
                        borderTopLeftRadius: "8px",
                        borderTopRightRadius: "8px",
                    }}
                />

                <Card.Body className="text-center" style={{ padding: '8px', flexGrow: 1 }}>
                    <Card.Title style={{ fontSize: "0.95rem", fontWeight: "bold", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {props?.movieInfo?.title}
                    </Card.Title>
                    <Card.Text style={{ fontSize: "0.75rem", color: "#ddd" }}>
                        {`${props?.movieInfo?.duration} mins`}
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

export default MovieCard;
