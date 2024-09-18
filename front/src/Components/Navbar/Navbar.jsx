// Navbar.js
import React from 'react';
import './Navbar.css'; // Opcional, para estilos personalizados
import {Link} from 'react-router-dom'
import logo from '../../logo.jpg'

function Navbar() {

  const username=localStorage.getItem("loggedUsername")
  const isLoggedIn=localStorage.getItem("token") ? true : false
  console.log(isLoggedIn,localStorage.getItem("token"))

  const handleCerrarSesion = () => {
    localStorage.clear()
    window.location.reload();
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <img src={logo} width="100px" height="auto" alt="" />
        <a href="/" className="navbar-logo">MyApp</a>
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          {!isLoggedIn ? (
            <div>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            </div>
          ) : (
            <div>
              <li><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_SoCj7PRojw5z3XnJ9iJGlSaoqhZ1XmSE9g&s" alt="profile"/> <span>{username}</span></li>
              <li><button onClick={handleCerrarSesion}>cerrar sesion</button></li>
            </div>
          )
          }
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
