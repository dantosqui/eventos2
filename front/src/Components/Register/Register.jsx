import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import urlBack from '../../config';
import './Register.css'; // Opcional, para estilos personalizados

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState(''); // Estado para manejar errores
  const navigate = useNavigate(); // Hook para redirección

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${urlBack}user/register`, {
        first_name: firstName,
        last_name: lastName,
        username: username,
        password: password
      });
      console.log("res",response)
      if (response.data.success==true) {
        localStorage.setItem('token', response.data.token);
        navigate('/'); // Redirige a la página principal en caso de éxito
        window.location.reload()
      } else {
        setError('Contraseña incorrecta o usuario no encontrado'); // Mensaje de error
      }
    } catch (err) {
      setError('Hubo un problema al registrarse'); // Manejo de errores en la solicitud
      console.error('Error al hacer la solicitud:', err);
    }
  };

  return (
    <div className="login-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="login-form">
      <div className="form-group">
          <label htmlFor="username">First name</label>
          <input
            type="text"
            id="first_name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Last name</label>
          <input
            type="text"
            id="last_name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">Register</button>
        {error && <div className="error-message">{error}</div>} {/* Mostrar el mensaje de error */}
        <Link to="/login">Ya tienes una cuenta? Inicia sesion</Link>
      </form>
    </div>
  );
}

export default Register;
