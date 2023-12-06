import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap'; // Assuming you are using Bootstrap
import { useNavigate } from 'react-router';

function RoutesComponent() {
  const [routes, setRoutes] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8181/executive/getallRoutes')
      .then(response => setRoutes(response.data))
      .catch(error => {
        // Handle error here
        console.error("Error fetching orders:", error);
      });
  }, []); 

  const handleAddCarrierClick = () => {
    navigate('/executive/dashboard?page=addRoute');
  };
  const handleShowAllLocations = () => {
    navigate('/executive/dashboard?page=allLocations');
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
          </tr>
        </thead>
        <tbody>
          {routes.map((route, index) => (
            <tr key={index}>
              <td>{route.id}</td>
              <td>{route.source}</td>
              <td>{route.destination}</td>
              <td>{route.distance}</td>
              <td>{route.noOfDays}</td>
              <td>{route.vehicle}</td>
             
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default RoutesComponent;
