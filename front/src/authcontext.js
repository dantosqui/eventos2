// MyContext.js
import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';
import urlBack from './config';
import { useNavigate } from 'react-router-dom';

// Create a Context
export const AuthContext = createContext();

// Create a Provider Component
export const AuthProvider = ({ children }) => {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token,setToken]=useState('')

    useEffect(()=>{
        const tokenExists = localStorage.getItem('token') ? true : false
        setIsLoggedIn(tokenExists)
        if (tokenExists) setToken(localStorage.getItem('token'))
    },[])

    const logIn = async (username,password,navigate) => {
        try {
            const response = await axios.post(`${urlBack}user/login`, {
              username,
              password
            });
            console.log("res",response)
            if (response.data.success==true) {
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('loggedUsername',username)
              setIsLoggedIn(true)
              setToken(response.data.token)
              navigate('/'); 
              window.location.reload()
            } else {
              return 'Contraseña incorrecta o usuario no encontrado'
            }
          } catch (err) {
            console.error('Error al hacer la solicitud:', err);
            return'Revise la contraseña e intente de nuevo.'
        }
    };

    const checkAuth = async (navigate) =>{
        
        if (!isLoggedIn){
            navigate('/login')
        }
        return isLoggedIn
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn,token,logIn,checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
