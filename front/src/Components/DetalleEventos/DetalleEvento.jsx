import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import urlBack from '../../config';
import { AuthContext } from '../../authcontext';

const DetalleEventos = () => {
    const { id } = useParams(); // Get the event ID from the URL
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [subscribeError, setSubscribeError] = useState(null);
    const [subscribeSuccess, setSubscribeSuccess] = useState(null);
    const {token,checkAuth} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`${urlBack}event/${id}`);
                setEvent(response.data[0]);
            } catch (err) {
                setError(err.response?.data || 'Error fetching event');
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    const handleSubscribe = async () => {

        if (checkAuth(navigate)){

        try {
            const response = await axios.post(`${urlBack}event/${id}/enrollment`,{
                
                description: "Interested in this event" 
            },
            {
                headers: {
                    Authorization: `Bearer ${token}` // Include the token in the headers
                }
            });
            setSubscribeSuccess(response.data);
            setSubscribeError(null); // Reset any previous errors
        } catch (err) {
            setSubscribeError(err.response?.data || 'Error subscribing to event');
            setSubscribeSuccess(null); // Reset any previous success messages
        }
    }
    
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {event ? (
                <div>
                    <h1>{event.name}</h1>
                    <p>{event.description}</p>
                    <h2>Detalles</h2>
                    <p><strong>Comienzo:</strong> {new Date(event.start_date).toLocaleString()}</p>
                    <p><strong>Duracion:</strong> {event.duration_in_minutes} minutes</p>
                    <p><strong>Precio:</strong> ${event.price}</p>
                    <p><strong>Lugar:</strong> {event.event_location.name}</p>
                    <h3>Creador:</h3>
                    <p>{event.creator_user.first_name} {event.creator_user.last_name}</p>
                 
                    
                    <h3>Categoria:</h3>
                    <p>{event.event_category.name}</p>
                    <button onClick={handleSubscribe}>suscribirse</button>

                    {subscribeSuccess && <div style={{ color: 'green' }}>{subscribeSuccess}</div>}
                    {subscribeError && <div style={{ color: 'red' }}>{subscribeError}</div>}
                </div>
            ) : (
                <p>No event found.</p>
            )}
        </div>
    );
};

export default DetalleEventos;
