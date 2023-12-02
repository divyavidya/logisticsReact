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
    <div>
      <h3>History</h3>
      {orders.map(order => (
        <Card key={order.id} className="mb-3">
          <Card.Header>
            Order ID: {order.id} - Status: {order.status}
          </Card.Header>
          <Card.Body>
            <ListGroup>
              <ListGroup.Item>Pickup Address: {order.pickUpAddress}</ListGroup.Item>
              <ListGroup.Item>Pickup Date: {order.pickUpDate}</ListGroup.Item>
              <ListGroup.Item>Cost: {order.cost}</ListGroup.Item>
              <ListGroup.Item>Receiver: {order.receiver.name}</ListGroup.Item>
              <ListGroup.Item>Destination Address: {order.receiver.destinationAddress}</ListGroup.Item>
              <ListGroup.Item>Contact: {order.receiver.contact}</ListGroup.Item>
              {/* Add more details as needed */}
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
