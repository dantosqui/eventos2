import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Formulario.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../authcontext';
import urlBack from '../../config';

export default function Formulario(){

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        eventCategory: '',
        eventLocation: '',
        startDate: '',
        duration: '',
        price: '',
        enabledForEnrollment: false,
        maxAssistance: '',
        creatorUser: ''
      });
    
      const [categories, setCategories] = useState([]);
      const [locations, setLocations] = useState([]);
      const [users, setUsers] = useState([]);

      const {checkAuth,isLoggedIn,token} = useContext(AuthContext)
      const navigate=useNavigate();

      useEffect(() => {
        console.log(isLoggedIn)
        checkAuth(navigate)
        
    }, []); 

    const fetchEventCategories = async (page = 1) => {
      const fetchedCategories = [];
      try {
          const response = await axios.get(`${urlBack}event-category/`, {
              params: {
                  page: page,
                  limit: 10
              }
          });
  
          for (let i = 0; i < response.data.collection.length; i++) {
              fetchedCategories.push({
                  id: response.data.collection[i].id, // assuming id is the identifier
                  name: response.data.collection[i].name
              });
          }
      } catch (err) {
          console.error('Error al hacer la solicitud:', err);
      }
      
      setCategories(fetchedCategories);
  };
  
  const fetchEventLocations = async (page = 1) => {
      const fetchedLocations = [];
      try {
          const response = await axios.get(`${urlBack}event-location/`, {
              params: {
                  page: page,
                  limit: 10
              },
              headers:{
                Authorization:`Bearer ${token}`
              }
          });
  
          for (let i = 0; i < response.data.collection.length; i++) {
              fetchedLocations.push({
                  id: response.data.collection[i].id, // assuming id is the identifier
                  name: response.data.collection[i].name
              });
          }
      } catch (err) {
          console.error('Error al hacer la solicitud:', err);
      }
  
      setLocations(fetchedLocations);
  };
    
      useEffect(() => {
        fetchEventCategories();
        fetchEventLocations();
      }, []);
    
      const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
          ...formData,
          [name]: type === 'checkbox' ? checked : value
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        crearEvento();
        navigate("/")
      };
    const  crearEvento = async () =>{

      
      
      try {
        const response = await axios.post(`${urlBack}event/`, {
         name: formData.name,
         description: formData.description,
         max_assistance: formData.maxAssistance,
         id_event_location: formData.eventLocation,
         id_event_category: formData.eventCategory,
         enabled_for_enrollment: formData.enabledForEnrollment,
         start_date: formData.startDate,
        duration_in_minutes: formData.duration,
        price: formData.price
      },{headers:{Authorization:`Bearer ${token}`}});
         
        } catch (err) {
          console.error('Error al hacer la solicitud:', err);
        }
        

    }
      return (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre del evento:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
    
          <div>
            <label>Descripción:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
    
          <div>
            <label>Categoría del evento:</label>
            <select
    name="eventCategory"
    value={formData.eventCategory}
    onChange={handleInputChange}
    required
>
    <option value="">Selecciona una categoría</option>
    {categories.map((category) => (
        <option key={category.id} value={category.id}>
            {category.name}
        </option>
    ))}
</select>
          </div>
    
          <div>
            <label>Ubicación del evento:</label>
            <select
    name="eventLocation"
    value={formData.eventLocation}
    onChange={handleInputChange}
    required
>
    <option value="">Selecciona una ubicación</option>
    {locations.map((location) => (
        <option key={location.id} value={location.id}>
            {location.name}
        </option>
    ))}
</select>
          </div>
    
          <div>
            <label>Fecha de inicio:</label>
            <input
              type="datetime-local"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              required
            />
          </div>
    
          <div>
            <label>Duración (minutos):</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              required
            />
          </div>
    
          <div>
            <label>Precio (en moneda local):</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>
    
          <div>
            <label>¿Habilitado para inscripción?</label>
            <input
              type="checkbox"
              name="enabledForEnrollment"
              checked={formData.enabledForEnrollment}
              onChange={handleInputChange}
            />
          </div>
    
          <div>
            <label>Capacidad máxima de asistencia:</label>
            <input
              type="number"
              name="maxAssistance"
              value={formData.maxAssistance}
              onChange={handleInputChange}
              required
            />
          </div>
    
         
    
          <button type="submit">Crear evento</button>
        </form>
      );


}