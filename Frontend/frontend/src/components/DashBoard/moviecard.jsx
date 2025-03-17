import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import image from "./img.jpg";
import {  useNavigate } from "react-router-dom";

// movie card is available on reactbootstrap website directly just changed some css and added some props




//the props need to have link inthem so that taht can be passed again to frame.jsx
function MovieCard(props) 
{
        const navigate = useNavigate()

        const clickHandler=async (e)=>
        {
            e.preventDefault();
            sessionStorage.setItem('videoLink', props?.link);
            navigate('/dashboard/frame');
        }
        



    return (
        //put on handel click and in that function use navigate to send props through state prop to other route
        <Card 
            onClick={clickHandler}
            style={{ 
                width: '18rem', 
                borderRadius: '12px', 
                overflow: 'hidden', 
                boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.3s ease-in-out',
                backgroundColor: '#222', 
                color: 'white',
                margin: "10px"
            }} 
            className="hover:scale-105">
            <Card.Img 
                variant="top" 
                src={image} 
                alt="Movie Poster" 
                style={{ 
                    width: '100%',  
                    height: '250px',  
                    objectFit: 'cover',
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                }}
            />

            {/* Movie Content */}
            <Card.Body className="text-center">
                <Card.Title style={{ fontSize: "1.4rem", fontWeight: "bold" }}>
                    Movie Title
                </Card.Title>
                <Card.Text style={{ fontSize: "1rem", padding: "10px", color: "#ddd" }}>
                    This is a short description of the movie. Explore now!
                </Card.Text>
                <Button 
                    variant="danger" 
                    href="https://www.youtube.com/" 
                    target="_blank"
                    style={{ 
                        fontSize: "1rem", 
                        padding: "8px 18px", 
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