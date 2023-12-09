import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Button, Card, Form, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router';

function RoutesComponent() {
  const [routes, setRoutes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    source: '',
    destination: '',
    distance: null,
    noOfDays: null,
    location: '',
    vehicle: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8181/executive/getallRoutes')
      .then(response => setRoutes(response.data))
      .catch(error => {
        console.error("Error fetching routes:", error);
      });
  }, []); 

  const handleAddCarrierClick = () => {
    navigate('/executive/dashboard?page=addRoute');
  };

  const handleShowAllLocations = () => {
    navigate('/executive/dashboard?page=allLocations');
  };

  const handleDeleteRoute = (routeId) => {
    axios.delete(`http://localhost:8181/executive/route/delete/${routeId}`)
      .then(() => {
        // Remove the deleted route from the local state
        setRoutes(prevRoutes => prevRoutes.filter(route => route.id !== routeId));
      })
      .catch(error => {
        console.error("Error deleting route:", error);
      });
  };

  const handleUpdateClick = (routeId) => {
    const selectedRoute = routes.find(route => route.id === routeId);
    setFormData(selectedRoute);
    setShowForm(true);
    setSuccessMessage('');
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleUpdateRoute = () => {
    axios.put(`http://localhost:8181/executive/putRoute/${formData.id}`, formData)
      .then(response => {
        setSuccessMessage('Route updated successfully');
        setShowForm(false);
  
        // Fetch the updated data after successful update
        axios.get('http://localhost:8181/executive/getallRoutes')
          .then(response => setRoutes(response.data))
          .catch(error => {
            console.error("Error fetching routes:", error);
          });
      })
      .catch(error => {
        console.error("Error updating route:", error);
      });
  };
  

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRoutes = routes.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Button
        variant="primary"
        style={{ float: 'right', margin: '10px' }}
        onClick={handleAddCarrierClick}>
        Add Route
      </Button>
      <Button
        variant="primary"
        style={{ float: 'right', margin: '10px' }}
        onClick={handleShowAllLocations}>
        All Locations
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Route ID</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Distance</th>
            <th>Number Of Days</th>
            <th>Vehicle</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {currentRoutes.map((route, index) => (
            <tr key={index}>
              <td>{route.id}</td>
              <td>{route.source}</td>
              <td>{route.destination}</td>
              <td>{route.distance}</td>
              <td>{route.noOfDays}</td>
              <td>{route.vehicle}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteRoute(route.id)}>
                  Delete
                </Button>
              </td>
              <td>
          <Button variant="info" onClick={() => handleUpdateClick(route.id)}>
            Update
          </Button>
        </td>
            </tr>
          ))}
        </tbody>
      </Table>
     {/* Display form in a card */}
     {showForm && (
        <Card style={{ width: '30rem', margin: '10px' }}>
          <Card.Body>
            <Form>
              {/* Form fields go here */}
              <Form.Group controlId="formRouteId">
                <Form.Label>Route ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Route ID"
                  value={formData.id}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formSource">
                <Form.Label>Source</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Source"
                  name="source"
                  value={formData.source}
                  onChange={handleFormChange}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formDestination">
                <Form.Label>Destination</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleFormChange}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formDistance">
                <Form.Label>Distance</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Distance"
                  name="distance"
                  value={formData.distance}
                  onChange={handleFormChange}
                />
              </Form.Group>
              <Form.Group controlId="formNoOfDays">
                <Form.Label>Number Of Days</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Number Of Days"
                  name="noOfDays"
                  value={formData.noOfDays}
                  onChange={handleFormChange}
                />
              </Form.Group>
              <Form.Group controlId="formVehicle">
                <Form.Label>Vehicle</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Vehicle"
                  name="vehicle"
                  value={formData.vehicle}
                  onChange={handleFormChange}
                />
              </Form.Group>

              <Button variant="primary" onClick={handleUpdateRoute}>
                Update Route
              </Button>
            </Form>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
          </Card.Body>
        </Card>
      )}
      <ul className="pagination" style={{ justifyContent: 'center' }}>
        {Array.from({ length: Math.ceil(routes.length / itemsPerPage) }).map((_, index) => (
          <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoutesComponent;
