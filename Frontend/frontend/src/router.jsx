import React from "react";
import Navbar1 from "./components/Navbar1";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/forgotpassword";
import SetPassword from "./components/setpasword";
import NotFound from "./components/NotFound";
import Home from "./components/DashBoard/Home";
import Intro from "./components/Intro";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import SecurityLayer from "./components/Extralayer";
import { createBrowserRouter,  Outlet} from "react-router-dom";
import Watchlist from "./components/DashBoard/watchlist"
import  Profile  from "./components/DashBoard/Profile";
import DefaultMovies from "./components/DashBoard/DefaultMovies";
import PasswordChangeForm from "./components/DashBoard/changePassword";
import ChangeUsernameForm from "./components/DashBoard/changeusernameform";
import PlansPage from "./components/DashBoard/planandsunscription";
import YouTubeEmbed from "./components/DashBoard/frame";
import Searchbar from "./components/DashBoard/searchbar";
import UpgradePage from "./components/DashBoard/upgrade";
import ReviewPage from "./components/DashBoard/reviewpage";
import MyReviews from "./components/DashBoard/myratings";
import GenreFilter from "./components/DashBoard/gnerefilter";
import WatchHistory from "./components/DashBoard/watchHistory";
const UnrestrictedLayout = () => {
    return (
        <div>
            <Navbar1 />
            <Outlet />
        </div>
    );
};

// const SecuredLayer =() => {
   
//     return(<SecurityLayer>
//         <Outlet/>
//     </SecurityLayer>)
// }



// children are what outlet can take

const router = createBrowserRouter([
    {
        path: "/",
        element: <UnrestrictedLayout />,
        children: [


            { index: true, element: <Intro /> },
            { path: "login", element: <Login /> },
            { path: "signup", element: <SignUp /> },
            { path: "aboutus", element: <AboutUs /> },
            { path: "contactus", element: <ContactUs /> },
            { path: "forgot-password", element: <ForgotPassword /> },
            { path: "set-password/:email", element: <SetPassword /> },
            { path: "*", element: <NotFound /> },

        ],
    },
    {
        path: "/dashboard",
        element: (
            <SecurityLayer>
                <Home/>
            </SecurityLayer>
        ),
        children: [
            { index: true, element: <DefaultMovies /> }, 
            { path: "watchlist", element: <Watchlist /> },
            { path: "profile", element: <Profile />   },
            {path: "profile/changepassword",element:<PasswordChangeForm/>},
            {path:"profile/changeusername",element:<ChangeUsernameForm/>},
            {path:"planspage",element:<PlansPage/>},
            {path: "frame",element:<YouTubeEmbed/>},
            {path:"searchbar",element:<Searchbar/>},
            {path:"upgrade",element:<UpgradePage/>},
            {path :"moviereviews/:movie_id",element:<ReviewPage/>}
            
        ],
    },

    {
        path: "/usr",
        element: (
            <SecurityLayer>
                <Outlet />
            </SecurityLayer>
        ),
        children: 
        [
            { index: true, element: <MyReviews /> 
            
            },
            {
                path: "genrefilterpage",
                element: <GenreFilter />,
            }
            ,{
                path: "watchhistory",
                element: <WatchHistory/>,
            }
        ],
    }
    
    
]);

export default router