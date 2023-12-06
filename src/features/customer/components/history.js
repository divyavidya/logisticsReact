import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, ListGroup } from 'react-bootstrap'; // Assuming you are using Bootstrap

function HistoryComponent() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8181/customer/getAllOrdersHistory/'+localStorage.getItem("id"))
      .then(response => setOrders(response.data))
      .catch(error => {
        // Handle error here
        console.error("Error fetching orders:", error);
      });
  }, []); // Empty dependency array to run the effect only once on moun

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'space-between' }}>
      {orders.map(order => (
        <Card key={order.id} className="mb-3" style={{  marginTop: '20px',
        width: "29rem",
        height: "28rem",}}>
          <Card.Header>
            Order ID : <strong>{order.id}</strong>  - Status: <i style={{color:'red'}}>{order.status}</i>
          </Card.Header>
          <Card.Body>
            <ListGroup>
            <ListGroup.Item>Product Name: {order.product.name}</ListGroup.Item>
              <ListGroup.Item>Pickup Address: {order.pickUpAddress}</ListGroup.Item>
              <ListGroup.Item>Pickup Date: {order.pickUpDate}</ListGroup.Item>
              <ListGroup.Item>Cost: {order.cost}</ListGroup.Item>
              <ListGroup.Item>Receiver: {order.receiver.name}</ListGroup.Item>
              <ListGroup.Item>Destination Address: {order.receiver.destinationAddress}</ListGroup.Item>
              <ListGroup.Item>Receiver Contact: {order.receiver.contact}</ListGroup.Item>
              
            </ListGroup>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              Route: {order.route.source} to {order.route.destination} | Vehicle: {order.route.vehicle}
            </small>
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
}

export default HistoryComponent;
