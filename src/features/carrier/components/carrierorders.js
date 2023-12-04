import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap'; // Assuming you are using Bootstrap

function CarrierOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []); // Empty dependency array to run the effect only once on mount

  const fetchOrders = () => {
    axios.get('http://localhost:8181/carrier/getAllOrders/' + localStorage.getItem('id'))
      .then(response => setOrders(response.data))
      .catch(error => {
        // Handle error here
        console.error("Error fetching orders:", error);
      });
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleUpdateStatus = (orderId) => {
    axios.put(`http://localhost:8181/carrier/putCarrier/${orderId}`, {
      status: selectedStatus
    })
      .then(response => {
        console.log('Order status updated successfully:', response.data);
        // After updating, fetch orders again to refresh the table
        fetchOrders();
      })
      .catch(error => {
        // Handle error
        console.error("Error updating order status:", error);
      });
  };

  return (
    <div>
      <Table striped bordered hover>
      <thead>
          <tr>
            <th>Order ID</th>
            <th>Status</th>
            <th>Pickup Address</th>
            <th>Pickup Date</th>
            <th>Cost</th>
            <th>Receiver</th>
            <th>Destination Address</th>
            <th>Receiver Contact</th>
            <th>Route</th>
            <th>Vehicle</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.id}</td>
              <td>{order.status}</td>
              <td>{order.pickUpAddress}</td>
              <td>{order.pickUpDate}</td>
              <td>{order.cost}</td>
              <td>{order.receiver.name}</td>
              <td>{order.receiver.destinationAddress}</td>
              <td>{order.receiver.contact}</td>
              <td>{`${order.route.source} to ${order.route.destination}`}</td>
              <td>{order.route.vehicle}</td>
              <td>
                <select onChange={handleStatusChange}>
                <option value="">Select Status</option>
                  <option value="SHIPPED">SHIPPED</option>
                  <option value="DELIVERED">DELIVERED</option>
                </select>
                <button onClick={() => handleUpdateStatus(order.id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default CarrierOrders;
