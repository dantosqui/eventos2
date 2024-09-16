// Navbar.js
import React from 'react';
import './Navbar.css'; // Opcional, para estilos personalizados
import {Link} from 'react-router-dom'
import logo from '../../logo.jpg'

function Navbar() {

  const username=localStorage.getItem("loggedUsername")
  const isLoggedIn=localStorage.getItem("token").length<23

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <img src={logo} width="100px" height="auto" alt="" />
        <a href="/" className="navbar-logo">MyApp</a>
        <ul className="navbar-menu">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
