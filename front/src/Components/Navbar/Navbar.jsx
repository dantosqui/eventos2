import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.jpg';
import './Navbar.css';

function Navbar() {
  const username = localStorage.getItem("loggedUsername");
  const isLoggedIn = localStorage.getItem("token") ? true : false;

  const handleCerrarSesion = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className='site-title'>
          <a href="/" className="navbar-title">Eventos</a>
        </div>


        <div className='links'>
          {!isLoggedIn ? (
            <>
              <Link className='navbar-menu-item' to="/login">Login</Link>
              <Link className='navbar-menu-item' to="/register">Register</Link>
            </>
          ) : (
            <div className="navbar-logged-in">
              <Link className='navbar-menu-item' to="/edit">Editar</Link>
              <div className="navbar-profile">
                <span>{username}</span>
              </div>
              
              <button onClick={handleCerrarSesion} className="logout-button">
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;