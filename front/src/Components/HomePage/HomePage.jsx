import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import urlBack from '../../config'; // Asegúrate de que apunta correctamente a tu backend
import './HomePage.css'; // Para estilos personalizados
import { AuthContext } from '../../authcontext';
import { useContext } from 'react';
import EventCard from '../EventCard/EventCard.jsx';

function HomePage() {
  const [events, setEvents] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Maneja el estado de la página actual
  const {checkAuth} = useContext(AuthContext)
  const navigate=useNavigate();


  useEffect(() => {
    
    const fetchEvents = async (page = 1) => {
      try {
        setLoading(true);
        const response = await axios.get(`${urlBack}event`, {
          params: {
            page: page,
            limit: 10 // Ajusta el límite si es necesario
          }
        });
        console.log(response);
        setEvents(response.data.collection[0].events);
        setPagination(response.data.pagination);
        setCurrentPage(page); // Actualiza la página actual
        setLoading(false);
      } catch (err) {
        setError('Error al obtener eventos');
        setLoading(false);
        console.error('Error:', err);
      }
    };
    fetchEvents();

  }, []);

  const handleLoadMore = () => {
    if (pagination.nextPage) {
      const nextPage = pagination.nextPage; // Ajusta si es necesario
      fetchEvents(nextPage);
    }
  };

  const fetchEvents = async (page) => {
    try {
      const response = await axios.get(`${urlBack}event`, {
        params: {
          page: page,
          limit: 10 // Ajusta el límite si es necesario
        }
      });

      setEvents((prevEvents) => [...prevEvents, ...response.data.collection]);
      setPagination(response.data.pagination);
      setCurrentPage(page);
    } catch (err) {
      setError('Error al obtener más eventos');
      console.error('Error:', err);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="home-page">
      <h1>Lista de Eventos</h1>
        
        <div className='events-contain'>
        {events.map((event) => (
          
          
            <EventCard 
              redirectTo={`/DetalleEventos/${event.id}`} 
              title={event.name} 
              subtitle={event.event_category.name} 
              subsubtitle={event.price}
            />
            
          
        ))}
      
      {pagination.nextPage && (
        <button onClick={handleLoadMore}>Cargar más</button>
        )}
      
        <Link className='boton' to="/Formulario" >
          + AÑADIR EVENTO
        </Link>
        
      </div>
    </div>
  );
}

export default HomePage;
