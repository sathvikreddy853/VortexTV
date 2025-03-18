import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

// const SecurityLayer = () => {
//     // / is signup
//     return localStorage.getItem("token")!==null ? <Outlet /> : <Navigate to="/" />;
// };


const SecurityLayer = ({ children }) => 
{
    const [isValid, setIsValid] = useState(null); 


    useEffect(
        () =>
    {

        const check= async ()=>
        {
            const token = localStorage.getItem("token"); 
            // console.log("Token being sent:", localStorage.getItem("token"));

            if(!token)
            {
                setIsValid(false)
                return
            }

            try
            {
                const response = await fetch("http://localhost:3000/auth/validate", {
                    method: "POST",
                    headers: 
                    {
                        "Authorization" : `Bearer ${token}`,
                    }


                })

                const data = await response.json()

                if(data.valid)
                {
                    setIsValid(true)
                }
                else
                {
                    setIsValid(false)
                    localStorage.removeItem("token")

                }
            }
            catch(err)
            {
                setIsValid(false)
            }

        }

        check()
    },[]
)


        if (isValid === null) return <div>Loading...</div>; 


    return isValid ? children : <Navigate to="/login" />;
};

export default SecurityLayer




// this is explanation given by chatgpt

// import { Outlet } from "react-router-dom";

// const DashboardLayout = () => {
//     return (
//         <div>
//             <h1>Dashboard</h1>
//             <Outlet /> {/* This is where child routes will be rendered */}
//         </div>
//     );
// };

// <Route path="/dashboard" element={<DashboardLayout />}>
//     <Route path="stats" element={<Stats />} />
//     <Route path="settings" element={<Settings />} />
// </Route>



// When you visit /dashboard:

// DashboardLayout renders.
// Since no child route is matched, nothing appears inside <Outlet />.
// When you visit /dashboard/stats:

// DashboardLayout renders.
// <Outlet /> is replaced with <Stats />, rendering inside DashboardLayout.
// When you visit /dashboard/settings:

// DashboardLayout renders.
// <Outlet /> is replaced with <Settings />.