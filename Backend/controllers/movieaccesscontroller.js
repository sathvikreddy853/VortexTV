import MovieAccess from "../models/movieaccess.js";
import Subscription from "../models/subscription.js";
import Genres from "../models/Genres.js";


const MovieAccessController = {

    // over the network u get user_id and plan_id and now u should send wether its ok for user to access that movie or not based on his plan

    accessibilty: async (req, res) => {
        try {
            const { user_id, movie_id } = req.body;
            const [minRequiredPlan] = await MovieAccess.getMovieAccess(movie_id); //  rows from Movie_Access is returned is given 
            //so now minRequiredPlan is a rowobject



            
            //SHOULD NEVERHAPPEN!!!!!!! IF HAPPENS THEN THERE IS SOME BUG IN BACKEND OR FRONTEND    
            if (!minRequiredPlan) 
            {
                return res.status(404).json({ message: "Movie not found" });
            }

            // from Subscriptions table we need to find user's plan_id

            const userSubscription = await Subscription.findSubscriptionByUserId(user_id);  // finding user subscription object base don user_id


            if(!userSubscription)
            {
                return res.status(200).json({ access : false ,ReasonMessage:"Not subscriped to the any Plan" });
            }

            let planValue =1;


            // wantedly hardcoded it
            if(userSubscription.plan_id === "Plan_1")
            {
                planValue = 1;
            }
            else if(userSubscription.plan_id === "Plan_2")
            {
                planValue = 2;
            }
            else if(userSubscription.plan_id === "Plan_3")
            {
                planValue = 3;
            }

            console.log(`planValue : ${planValue} and plan required is ${minRequiredPlan.plan_id} `)


            if(planValue >= Number(minRequiredPlan.plan_id.slice(-1)))
            {
                return res.status(200).json({ access : true ,ReasonMessage:"Access Granted" });
            }
            else
            {
                return res.status(200).json({ access : false ,ReasonMessage:`Access Denied because of Plan reuirement subscribe to ${minRequiredPlan.plan_id} to watch this movie` });
            }
            

        } 
        catch (error) 
        {
            console.error('Error checking accessibility:', error);
            return res.status(500).json({ access:false ,ReasonMessage: "Internal server error" });
        }
    },

    //based on getMovies function retrieve all movies based on movie_present in req.body


    getList : async(req,res)=> {
        try {
            const {movie_id} = req.body;
            const rows = await MovieAccess.getMovies(movie_id);
            return res.status(200).json(rows || []);  // Return empty array if no results
        } 
        catch (error) 
        {
            console.error('Error finding movie by movie_id from getList of movieaccesscontroller:', error);
            return res.status(500).json({ message: 'Internal server error from getList of movieaccesscontroller' });
        }
    },


    getMoviesByGenres: async (req, res) => 
    {
        try 
        {
            const { genreList } = req.body // Expecting genres as query parameter (e.g., ?genres=Action,Drama)

            if (!genreList) 
            {
                return res.status(400).json({ error: "Genres parameter is required" });
            }

            console.log("Received genre list:", genreList);

            const movies = await Genres.getMoviesByGenres(genreList);

            res.status(200).json({ success: true, movies: movies });
        } 
        catch (error) {
            console.error("Error in fetching movies:", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    getRecommendedMovies: async (req, res) => 
    {
        try 
        {
                const recommendedMovies = await MovieAccess.getRecommendedMovies();
                res.status(200).json({ success: true, recommendedMovies });
        }
        catch (error) 
        {
                console.error("Error in fetching recommended movies:", error.message);
                res.status(500).json({ error: "Internal Server Error" });
        }
    },


    addToWatchHistory: async (req, res) =>
    {
        try 
        {
            const { user_id, movie_id } = req.body;
            const result = await MovieAccess.addToWatchHistory(user_id, movie_id);
            return res.status(200).json({ success: true, message: "Added to watch history", result: result});
        } 
        catch (error) 
        {
            console.error("Error adding to watch history:", error);
            return res.status(500).json({ success: false, message: error.message });
            
        }
    },

    fetchwatchHistory: async (req, res) =>
    {
        try 
        {
            const { user_id } = req.body;
            const result = await MovieAccess.fetchWatchHistory(user_id);// u get rows from watch_history
            
            const rows = await Promise.all
            (
                result.map
                (
                    async (row) => {
                    row["genreArray"] = await Genres.getMovieGenresStrings(row.movie_id);
                    return row; // Return the modified row
                        }
                )
            );


            return res.status(200).json({ success: true, watchHistory: result });
        } 
        catch (error) 
        {
            console.error("Error fetching watch history:", error);
            return res.status(500).json({ success: false, message: error.message });
        }
    },


    // recomendations

}


export default MovieAccessController