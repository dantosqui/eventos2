import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css'
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Login/Login'
import HomePage from './Components/HomePage/HomePage';
import Register from './Components/Register/Register';
import Formulario from './Components/Formulario/Formulario';
import { AuthProvider } from './authcontext';
import DetalleEventos from './Components/DetalleEventos/DetalleEvento';

function App() {
  return (
<AuthProvider>
    <Router>
            <Navbar/>
            <Routes>
                <Route exact path ="/register" element={<Register/>}></Route>
                <Route exact path="/" element={<HomePage/>}></Route>
                <Route exact path ="/login" element={<Login/>}/>
                <Route exact path ="/formulario" element={<Formulario/>}/>
                <Route exact path="/DetalleEventos/:id" element={<DetalleEventos/>}></Route>
            </Routes>   
        </Router>
</AuthProvider>
  );
}

export default App;
