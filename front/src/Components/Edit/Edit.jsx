import React, { useState } from "react";
import axios from "axios";
import urlBack from '../../config';
import './Edit.css'

function Edit() {
  const [eventLocationData, setEventLocationData] = useState({
    id_location: "",
    name: "",
    full_address: "",
    max_capacity: "",
    latitude: "",
    longitude: "",
  });

  const [categoryData, setCategoryData] = useState({
    name: "",
    display_order: "",
  });


  const handleEventLocationChange = (e) => {
    setEventLocationData({
      ...eventLocationData,
      [e.target.name]: e.target.value,
    });
  };


  const handleCategoryChange = (e) => {
    setCategoryData({
      ...categoryData,
      [e.target.name]: e.target.value,
    });
  };


  const handleEventLocationSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${urlBack}event-location/`, eventLocationData);
      alert(response.data);
    } catch (error) {
      alert("Error al crear/editar la ubicación del evento");
    }
  };

  // Función para enviar datos de categoría
  const handleCategorySubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${urlBack}categories/`, categoryData);
      alert(response.data);
    } catch (error) {
      alert("Error al crear/editar la categoría");
    }
  };

  return (//NO ESTA PARA NADA TERMINADO ESTO
    <div className="wrapper-dos-forms">
        <div className="form-wrapper">
      <h2>Editar Ubicación del Evento</h2>
      <form onSubmit={handleEventLocationSubmit}>
        <label>
          ID de Ubicación:
          <input
            type="number"
            name="id_location"
            value={eventLocationData.id_location}
            onChange={handleEventLocationChange}
            required
          />
        </label>
        <br />
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={eventLocationData.name}
            onChange={handleEventLocationChange}
            required
          />
        </label>
        <br />
        <label>
          Dirección Completa:
          <input
            type="text"
            name="full_address"
            value={eventLocationData.full_address}
            onChange={handleEventLocationChange}
            required
          />
        </label>
        <br />
        <label>
          Capacidad Máxima:
          <input
            type="number"
            name="max_capacity"
            value={eventLocationData.max_capacity}
            onChange={handleEventLocationChange}
            required
          />
        </label>
        <br />
        <label>
          Latitud:
          <input
            type="number"
            name="latitude"
            value={eventLocationData.latitude}
            onChange={handleEventLocationChange}
            required
          />
        </label>
        <br />
        <label>
          Longitud:
          <input
            type="number"
            name="longitude"
            value={eventLocationData.longitude}
            onChange={handleEventLocationChange}
            required
          />
        </label>
        <br />
        <button type="submit">Guardar Ubicación</button>
      </form>
      </div>

      <div className="form-wrapper">
      <h2>Editar Categoría</h2>
      <form onSubmit={handleCategorySubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={categoryData.name}
            onChange={handleCategoryChange}
            required
          />
        </label>
        <br />
        <label>
          Orden de Visualización:
          <input
            type="number"
            name="display_order"
            value={categoryData.display_order}
            onChange={handleCategoryChange}
            required
          />
        </label>
        <br />
        <button className="boton-submit" type="submit">Guardar Categoría</button>
      </form>
      </div>
    </div>
  );
}

export default Edit;
