import React, { useState, useEffect } from "react";
import MovieCard from "./moviecard";

const SearchBar = () => {
    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [errorMessage, setErrorMessage] = useState(""); // Separate state for error messages

    const onChangeHandler = (e) => {
        setSearchValue(e.target.value);
    };

    useEffect(() => {
        const fetchMovies = async () => {
            if (searchValue.trim() === "") {
                setSearchResult([]); // Clear results when input is empty
                setErrorMessage(""); // Clear error messages
                return;
            }

            try {
                console.log("hi")
                const response = await fetch(`http://localhost:3000/movies/moviesearch?moviename=${searchValue}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    console.log(data);
                    if (data.length === 0) 
                    {
                        setSearchResult([]); // Keep empty, just show a message
                        setErrorMessage("No movies found.");
                    } else {
                        setSearchResult(data);
                        setErrorMessage(""); // Clear any previous error message
                    }
                } else {
                    setSearchResult([]);
                    setErrorMessage("An error occurred. Please try again later.");
                }
            } catch (err) {
                console.error("Error fetching movies:", err);
                setSearchResult([]);
                setErrorMessage("Failed to connect to server. Check your internet connection.");
            }
        };

        fetchMovies();
    }, [searchValue]);

    const btnClckHandler = () => {
        setSearchValue("");
        setSearchResult([]);
        setErrorMessage(""); // Reset everything
    };

    return (
        <div className="flex flex-col items-center mt-10 w-full">
            {/* Search Bar */}
            <div className="relative w-full max-w-md">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    className="w-full py-3 px-5 text-lg rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md hover:shadow-lg transition duration-300 ease-in-out backdrop-blur-md bg-white/30"
                    value={searchValue}
                    onChange={onChangeHandler}
                />
                <button onClick={btnClckHandler} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 transition-all hover:shadow-lg">
                    {searchValue ? "X" : "🔍"}
                </button>
            </div>

            {/* Search Result Area */}
            <div className="w-full max-w-2xl mt-5">
                <h2 className="text-xl font-semibold mb-2 text-white">Search Results:</h2>
                <div className="grid gap-4 w-full">
                    {errorMessage ? (
                        <p className="text-gray-300 text-center">{errorMessage}</p>
                    ) : searchResult.length === 0 ? (
                        <p className="text-gray-300 text-center">Start typing to search...</p>
                    ) : (
                        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                            {searchResult.map((movie, index) => (
                                <MovieCard key={index} link={movie.source_link} className="shadow-lg rounded-lg overflow-hidden backdrop-blur-md bg-white/30" />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
