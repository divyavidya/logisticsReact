import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CarriersComponent() {
  const [carriers, setCarriers] = useState([]);
  const [filterStatus, setFilterStatus] = useState(null);
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

  const handleStatusChange = (status) => {
    setFilterStatus(status === filterStatus ? null : status);
  };

  const displayStatus = (status) => {
    return status === 'NOTAVAILABLE' ? 'NOT AVAILABLE' : status;
  };

  const handleDeleteCarrier = (carrierId) => {
    axios.delete(`http://localhost:8181/executive/carrier/delete/${carrierId}`)
      .then(() => {
        // Remove the deleted carrier from the local state
        setCarriers(prevCarriers => prevCarriers.filter(carrier => carrier.id !== carrierId));
      })
      .catch(error => {
        console.error("Error deleting carrier:", error);
      });
  };

  const filteredCarriers = filterStatus
    ? carriers.filter(carrier => carrier.status === filterStatus)
    : carriers;

  return (
    <div>
      <Button
        variant="primary"
        style={{ float: 'right', margin: '10px' }}
        onClick={handleAddCarrierClick}
      >
        Add Carrier
      </Button>
      
      <Form style={{ margin: '10px' }}>
        <Form.Check style={{color:'white'}}
          inline
          label="All"
          type="radio"
          id="all-radio"
          checked={filterStatus === null}
          onChange={() => handleStatusChange(null)}
        />
        <Form.Check style={{color:'white'}}
          inline
          label="AVAILABLE"
          type="radio"
          id="available-radio"
          checked={filterStatus === 'AVAILABLE'}
          onChange={() => handleStatusChange('AVAILABLE')}
        />
        <Form.Check style={{color:'white'}}
          inline
          label="NOT AVAILABLE"
          type="radio"
          id="not-available-radio"
          checked={filterStatus === 'NOTAVAILABLE'}
          onChange={() => handleStatusChange('NOTAVAILABLE')}
        />
      </Form>

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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCarriers.map((c, index) => (
            <tr key={index}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.user.username}</td>
              <td>{c.email}</td>
              <td>{c.contact}</td>
              <td>{c.city}</td>
              <td>{displayStatus(c.status)}</td>
              <td><Button variant="danger" onClick={() => handleDeleteCarrier(c.id)}>
                  Delete
                </Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default CarriersComponent;
