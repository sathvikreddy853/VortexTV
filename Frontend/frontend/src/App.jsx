// App.jsx

import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import BlankPage from './components/BlankPage';
import SecurityLayer from './components/Extralayer';
import Login from './components/Login';

// let isAllowed = localStorage.getItem("token") !== null; // Check if token exists



function App() {

  const [isAllowed, setIsAllowed] = useState(localStorage.getItem("Token") !== null);




  return (
    <Router>
      <Routes>
          <Route path="/" element={<Login  />} />
          <Route path="/signup" element={<SignUp  />} />
          <Route element={<SecurityLayer  />}>
            <Route path="/page" element={<BlankPage />} />
          </Route>

      </Routes>
    </Router>
  );
}

export default App;


/* 

security layer is very useful cause u from any place if u are refering to a nested child it first should pass through the parent



*/