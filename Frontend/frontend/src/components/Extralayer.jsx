import { Navigate, Outlet } from "react-router-dom";

const SecurityLayer = () => {
    // / is signup
    return localStorage.getItem("token")!==null ? <Outlet /> : <Navigate to="/" />;
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