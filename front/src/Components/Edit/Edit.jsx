import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import urlBack from "../../config";
import "./Edit.css";
import { AuthContext } from "../../authcontext";

function Edit() {
  const { checkAuth, isLoggedIn, token } = useContext(AuthContext);
const [categories, setCategories] = useState([])
  const [eventLocationData, setEventLocationData] = useState({
    id: "",
    id_location: "",
    name: "",
    full_address: "",
    max_capacity: "",
    latitude: "",
    longitude: "",
  });
  
  const [activeCategoryTab, setActiveCategoryTab] = useState('edit-category');
  const [categoryData, setCategoryData] = useState({
    id: "",
    name: "",
    display_order: "",
  });

  const [locations, setLocations] = useState([]);
  const [eventLocations, setEventLocations] = useState([]);
  
  const [activeTab, setActiveTab] = useState('edit'); // Nueva variable para manejar la pestaña activa

  useEffect(() => {
    if (token) {
      fetchLocations();
      fetchEventLocations();
      fetchEventCategories();
    } else {
      console.error("Token no disponible, verifica la autenticación.");
    }
  }, [token]);
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
                id: response.data.collection[i].id, 
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
          limit: 10,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      for (let i = 0; i < response.data.collection.length; i++) {
        fetchedLocations.push({
          id: response.data.collection[i].id,
          name: response.data.collection[i].name,
        });
      }
      setEventLocations(fetchedLocations);
    } catch (err) {
      console.error("Error al hacer la solicitud:", err);
    }
  };

  const fetchLocations = async (page = 1) => {
    const fetchedLocations = [];
    
    try {
      const response = await axios.get(`${urlBack}location/`, {
        params: {
          page: page,
          limit: 10,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      for (let i = 0; i < response.data.collection.length; i++) {
        fetchedLocations.push({
          id: response.data.collection[i].id,
          name: response.data.collection[i].name,
        });
      }
      setLocations(fetchedLocations);
    } catch (err) {
      console.error("Error al hacer la solicitud:", err);
    }
  };

  const handleEventLocationChange = (e) => {
    setEventLocationData({
      ...eventLocationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEventLocationSelect = (e) => {
    setEventLocationData({
      ...eventLocationData,
      id: e.target.value,
    });
  };
  const handleCategorySelect = (e) => {
    setCategoryData({
      ...categoryData,
      id: e.target.value,
    });
  };
  const handleLocationSelect = (e) => {
    setEventLocationData({
      ...eventLocationData,
      id_location: e.target.value,
    });
  };
  const handleEventLocationSubmitEdit= async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${urlBack}event-location/`,{
    
        eventLocationData ,
        
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data);
      
    } catch (error) {
      alert("Error al crear/editar la ubicación del evento");
    }
  };
  const handleEventLocationSubmitCreate= async (e) => {
    
    e.preventDefault();
    try {
      console.log("TOKEN",token)
      const response = await axios.post(
        `${urlBack}event-location/`,{
    
        eventLocationData ,
        
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data);
      
    } catch (error) {
      alert("Error al crear/editar la ubicación del evento");
    }
  };
  const handleEventLocationSubmitDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `${urlBack}event-location/`,{
       params:{
        id: eventLocationData.id} ,
        
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data);
      
    } catch (error) {
      alert("Error al crear/editar la ubicación del evento");
    }
  };

  const handleCategoryChange = (e) => {
    setCategoryData({
      ...categoryData,
      [e.target.name]: e.target.value,
    });
  };

 
  const handleCategorySubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${urlBack}event-category/`, {
        categoryData,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      alert(response.data);
    } catch (error) {
      alert("Error al editar la categoría");
    }
  };

  const handleCategorySubmitCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${urlBack}event-category/`, {
        name: categoryData.name,
        display_order: categoryData.display_order,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      alert(response.data);
    } catch (error) {
      alert("Error al crear la categoría");
    }
  };

  const handleCategorySubmitDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`${urlBack}event-category/`, {
        params: {
          id: categoryData.id
        },
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      alert(response.data);
    } catch (error) {
      alert("Error al borrar la categoría");
    }
  };
  return (
    <>
    <div className="wrapper-dos-forms">
      {/* Sub-tabs para cambiar entre las secciones */}
      <div className="tabs">
        <button 
          onClick={() => setActiveTab('edit')} 
          className={activeTab === 'edit' ? 'active-tab' : ''}
        >
          Modificar Estadio
        </button>
        <button 
          onClick={() => setActiveTab('create')} 
          className={activeTab === 'create' ? 'active-tab' : ''}
        >
          Crear Estadio
        </button>
        <button 
          onClick={() => setActiveTab('delete')} 
          className={activeTab === 'delete' ? 'active-tab' : ''}
        >
          Borrar Estadio
        </button>
      </div>

      {/* Formulario dependiendo de la pestaña activa */}
      {activeTab === 'edit' && (
        <div className="form-wrapper">
          <h2>Editar Ubicación del Evento</h2>
          <form onSubmit={handleEventLocationSubmitEdit}>
            <label>
              Seleccionar Estadio:
              <select
                value={eventLocationData.id}
                onChange={handleEventLocationSelect}
                required
              >
                <option value="">-- Selecciona una ubicación --</option>
                {eventLocations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Seleccionar Ubicación:
              <select
                value={eventLocationData.id_location}
                onChange={handleLocationSelect}
                required
              >
                <option value="">-- Selecciona una ubicación --</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
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
      )}

      {activeTab === 'create' && (
        <div className="form-wrapper">
          <h2>Crear Ubicación del Evento</h2>
          <form onSubmit={handleEventLocationSubmitCreate}>
            <label>
              Seleccionar Ubicación:
              <select
                value={eventLocationData.id_location}
                onChange={handleLocationSelect}
                required
              >
                <option value="">-- Selecciona una ubicación --</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
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
            <button type="submit">Crear Ubicación</button>
          </form>
        </div>
      )}

      {activeTab === 'delete' && (
        <div className="form-wrapper">
          <h2>Borrar Ubicación del Evento</h2>
          <form onSubmit={handleEventLocationSubmitDelete}>
            <label>
              Seleccionar Estadio:
              <select
                value={eventLocationData.id}
                onChange={handleEventLocationSelect}
                required
              >
                <option value="">-- Selecciona una ubicación --</option>
                {eventLocations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <button type="submit">Borrar Ubicación</button>
          </form>
        </div>
      )}

<div className="tabs">
        <button 
          onClick={() => setActiveCategoryTab('edit-category')} 
          className={activeCategoryTab === 'edit-category' ? 'active-tab' : ''}
        >
          Modificar Categoría
        </button>
        <button 
          onClick={() => setActiveCategoryTab('create-category')} 
          className={activeCategoryTab === 'create-category' ? 'active-tab' : ''}
        >
          Crear Categoría
        </button>
        <button 
          onClick={() => setActiveCategoryTab('delete-category')} 
          className={activeCategoryTab === 'delete-category' ? 'active-tab' : ''}
        >
          Borrar Categoría
        </button>
      </div>

      {activeCategoryTab === 'edit-category' && (
        <div className="form-wrapper">
          <h2>Editar Categoría</h2>
          <form onSubmit={handleCategorySubmitEdit}>
            <label>
              Seleccionar Categoría:
              <select
                value={categoryData.id}
                onChange={handleCategorySelect}
                required
              >
                <option value="">-- Selecciona una categoría --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </label>
            <br />
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
            <button className="boton-submit" type="submit">
              Guardar Categoría
            </button>
          </form>
        </div>
      )}

      {activeCategoryTab === 'create-category' && (
        <div className="form-wrapper">
          <h2>Crear Categoría</h2>
          <form onSubmit={handleCategorySubmitCreate}>
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
            <button className="boton-submit" type="submit">
              Crear Categoría
            </button>
          </form>
        </div>
      )}

      {activeCategoryTab === 'delete-category' && (
        <div className="form-wrapper">
          <h2>Borrar Categoría</h2>
          <form onSubmit={handleCategorySubmitDelete}>
            <label>
              Seleccionar Categoría:
              <select
                value={categoryData.id}
                onChange={handleCategorySelect}
                required
              >
                <option value="">-- Selecciona una categoría --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <button type="submit">Borrar Categoría</button>
          </form>
        </div>
      )}
      
    </div>
    <div className="margen"></div>
    </>
  );
}


export default Edit;
