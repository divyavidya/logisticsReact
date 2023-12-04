import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap'; // Assuming you are using Bootstrap

function RoutesComponent() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8181/executive/getallRoutes')
      .then(response => setRoutes(response.data))
      .catch(error => {
        // Handle error here
        console.error("Error fetching orders:", error);
      });
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div>
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
