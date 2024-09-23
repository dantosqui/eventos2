// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.jpg';
import {style} from './style.jsx'; // Asegúrate de que la ruta sea correcta

function Navbar() {
  const username = localStorage.getItem("loggedUsername");
  const isLoggedIn = localStorage.getItem("token") ? true : false;

  const handleCerrarSesion = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <nav style={style.navbarStyle}>
      <div style={style.navbarContainerStyle}>
        <img src={logo} width="100px" height="auto" alt="Logo" />
        <a href="/" style={style.navbarLogoStyle}>MyApp</a>
        <ul style={style.navbarMenuStyle}>
          <div style={style.centradorStyle}>
            <li style={style.navbarMenuItemStyle}><Link to="/" style={style.navbarLinkStyle}>Home</Link></li>
          </div>
          <div style={style.centradorStyle}>
            <li style={style.navbarMenuItemStyle}><a href="#about" style={style.navbarLinkStyle}>About</a></li>
          </div>
          <div style={style.centradorStyle}>
            <li style={style.navbarMenuItemStyle}><a href="#services" style={style.navbarLinkStyle}>Services</a></li>
          </div>
          {!isLoggedIn ? (
            <div>
              <li style={style.navbarMenuItemStyle}><Link to="/login" style={style.navbarLinkStyle}>Login</Link></li>
              <li style={style.navbarMenuItemStyle}><Link to="/register" style={style.navbarLinkStyle}>Register</Link></li>
            </div>
          ) : (
            <div>
              <div style={style.navbarMenuItemStyle}>
                  <img className='profile' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_SoCj7PRojw5z3XnJ9iJGlSaoqhZ1XmSE9g&s" alt="profile" />
                  <span>{username}</span>
                
              </div>
              <li style={style.navbarMenuItemStyle}><button onClick={handleCerrarSesion}>Cerrar sesión</button></li>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;