import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import image from "./img.jpg";
import { useNavigate } from "react-router-dom";

function MovieCard(props) {
    const navigate = useNavigate();

    const clickHandler = async (e) => {
        e.preventDefault();
        sessionStorage.setItem('videoLink', props?.link);
        navigate('/dashboard/frame');
    };

    return (
        <Card 
            onClick={clickHandler}
            style={{ 
                width: '14rem',  // Reduced width
                borderRadius: '10px', 
                overflow: 'hidden', 
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.3s ease-in-out',
                backgroundColor: '#222', 
                color: 'white',
                margin: "8px" // Reduced margin for tighter spacing
            }} 
            className="hover:scale-105">
            <Card.Img 
                variant="top" 
                src={image} 
                alt="Movie Poster" 
                style={{ 
                    width: '100%',  
                    height: '200px',  // Reduced height
                    objectFit: 'cover',
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                }}
            />

            <Card.Body className="text-center" style={{ padding: '10px' }}>
                <Card.Title style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                    Movie Title
                </Card.Title>
                <Card.Text style={{ fontSize: "0.9rem", color: "#ddd" }}>
                    Short description of the movie.
                </Card.Text>
                <Button 
                    variant="danger" 
                    style={{ 
                        fontSize: "0.9rem", 
                        padding: "6px 14px", 
                        borderRadius: "50px",
                        fontWeight: "bold",
                        transition: "all 0.3s ease-in-out"
                    }}
                    onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                    onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                >
                    🎬 Watch Now
                </Button>
            </Card.Body>
        </Card>
    );
}
export default MovieCard;
