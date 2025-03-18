import React from "react";
import MovieCard from "./moviecard"; // Import your movie card component

const DefaultMovies = () => {

    console.log("here in default movies")
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-4">Welcome to the Movies Section</h1>
            <p className="text-center mb-6">Explore the latest movies here!</p>

            <div 
                // chatgpt suggested to use grid instead of flex ( but geneerally not preffere  if any one found the way with flex le us use it )
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 overflow-y-auto"
                style={{ maxHeight: "80vh", scrollbarWidth: "thin", scrollbarColor: "#888 #222" }}
            >
                {/* Render 20 movie cards */}
                {Array.from({ length: 40 }).map((current, index) => (
                    <MovieCard key={index} link="https://www.youtube.com/watch?v=-UbZQzeQvFw"/>
                ))}
            </div>
        </div>
    );
};

export default DefaultMovies;
