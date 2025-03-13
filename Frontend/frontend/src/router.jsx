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
const UnrestrictedLayout = () => {
    return (
        <div>
            <Navbar1 />
            <Outlet />
        </div>
    );
};

const SecuredLayer =() => {
   
    return(<SecurityLayer>
        <Outlet/>
    </SecurityLayer>)
}



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
            {path: "profile/settings",element:<PasswordChangeForm/>}
        ],
    },
   
    
]);

export default router