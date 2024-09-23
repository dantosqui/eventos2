import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import urlBack from '../../config';
import './Login.css'; // Opcional, para estilos personalizados 
import { redirect } from "react-router-dom";


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para manejar errores
  const navigate = useNavigate(); // Hook para redirección

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${urlBack}user/login`, {
        username,
        password
      });
      console.log("res",response)
      if (response.data.success==true) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('loggedUsername',username)
        navigate('/'); // Redirige a la página principal en caso de éxito
        window.location.reload()
      } else {
        setError('Contraseña incorrecta o usuario no encontrado'); // Mensaje de error
      }
    } catch (err) {
      setError('Hubo un problema al iniciar sesión'); // Manejo de errores en la solicitud
      console.error('Error al hacer la solicitud:', err);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">E-mail</label>
          <input
            type="email"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {error && <div className="error-message">{error}</div>} {/* Mostrar el mensaje de error */}
        <Link to="/register">No tienes una cuenta? Regístrate</Link>
      </form>
    </div>
  );
}

export default Login;
