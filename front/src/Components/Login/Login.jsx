import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Opcional, para estilos personalizados 
import { useContext } from 'react';
import { AuthContext } from '../../authcontext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para manejar errores
  const navigate = useNavigate(); // Hook para redirección
  const {loggedIn,logIn} = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    logIn(username,password,navigate)
    
    
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
