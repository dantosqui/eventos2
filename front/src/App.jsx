import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Login/Login'
import HomePage from './Components/HomePage/HomePage';
import Register from './Components/Register/Register';

function App() {
  return (
    <Router>
            <Navbar/>
            <Routes>
                <Route exact path ="/register" element={<Register/>}></Route>
                <Route exact path="/" element={<HomePage/>}></Route>
                <Route exact path ="/login" element={<Login/>}/>
            </Routes>   
        </Router>
  );
}

export default App;
