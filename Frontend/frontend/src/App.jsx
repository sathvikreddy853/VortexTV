// App.jsx

import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import BlankPage from './components/BlankPage';
import SecurityLayer from './components/Extralayer';
import Login from './components/Login';
import ForgotPassword from './components/forgotpassword';
import SetPassword from './components/setpasword';
import NotFound from './components/NotFound';
import Intro from './components/Intro'; 
import AboutUs from './components/AboutUs'; 
import ContactUs from './components/ContactUs';


// let isAllowed = localStorage.getItem("token") !== null; // Check if token exists


 {/* helps in gradient picking */}

{/* https://gradienty.codes/tailwind-gradient-background */}


{/* https://webcode.tools/html-generator */} 
 {/* used for html buttons and html structure */}



function App() {

  const [isAllowed, setIsAllowed] = useState(localStorage.getItem("Token") !== null);




  return (
    <Router>
      <Routes>
          <Route path='/' element={<Intro />} />
          <Route path="/login" element={<Login  />} />  
          {/* dont forget u need to change / to h0me and login to /login dont forget to change / to /login wherever u used */}
          <Route path="/signup" element={<SignUp  />} />
          <Route path="/forgot-password" element={<ForgotPassword  />} />
          <Route path="/set-password/:email" element={<SetPassword  />} />
              <Route element={<SecurityLayer  />}>
                <Route path="/page" element={<BlankPage />} />
              </Route>
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />


          <Route path="*" element={<NotFound />} /> 
          {/* Catch-all route */}
      </Routes>
    </Router>
  );
}

export default App;


/* 

security layer is very useful cause u from any place if u are refering to a nested child it first should pass through the parent



*/