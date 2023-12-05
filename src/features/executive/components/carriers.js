import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CarriersComponent() {
  const [carriers, setCarriers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8181/executive/getallCarriers')
      .then(response => setCarriers(response.data))
      .catch(error => {
        console.error("Error fetching orders:", error);
      });
  }, []); 

  const handleAddCarrierClick = () => {
    navigate('/executive/dashboard?page=addCarrier');
  };

  return (
    <div>
      <Button
        variant="primary"
        style={{ float: 'right', margin: '10px' }}
        onClick={handleAddCarrierClick}
      >
        Add Carrier
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Carrier ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Contact</th>
            <th>City</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {carriers.map((c, index) => (
            <tr key={index}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.user.username}</td>
              <td>{c.email}</td>
              <td>{c.contact}</td>
              <td>{c.city}</td>
              <td>{c.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default CarriersComponent;
