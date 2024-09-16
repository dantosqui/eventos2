import React, { useEffect, useState } from 'react';
import axios from 'axios';
import urlBack from '../../config'; // Ensure this points to your backend URL
import './HomePage.css'; // Optional, for custom styling

function HomePage() {
  const [events, setEvents] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Manage current page state

  useEffect(() => {
    const fetchEvents = async (page = 1) => {
      try {
        setLoading(true);
        const response = await axios.get(`${urlBack}event`, {
          params: {
            page: page,
            limit: 10 // Adjust limit if needed
          }
        });
        console.log(response)
        setEvents(response.data.collection[0].events);
        setPagination(response.data.pagination);
        setCurrentPage(page); // Update current page
        setLoading(false);
      } catch (err) {
        setError('Error fetching events');
        setLoading(false);
        console.error('Error:', err);
      }
    };

    fetchEvents();
  }, []);

  const handleLoadMore = () => {
    if (pagination.nextPage) {
      const nextPage = pagination.nextPage; // Adjust if necessary
      fetchEvents(nextPage);
    }
  };

  const fetchEvents = async (page) => {
    try {
      const response = await axios.get(`${urlBack}event`, {
        params: {
          page: page,
          limit: 10 // Adjust limit if needed
        }
      });

      setEvents(prevEvents => [...prevEvents, ...response.data.collection]);
      setPagination(response.data.pagination);
      setCurrentPage(page);
    } catch (err) {
      setError('Error fetching more events');
      console.error('Error:', err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="home-page">
      <h1>Event List</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h2>{event.name}</h2>
            <p>{event.description}</p>
            {/* Display other event details as needed */}
          </li>
        ))}
      </ul>
      {pagination.nextPage && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
    </div>
  );
}

export default HomePage;
