import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OrdersComponent() {
  const [orders, setOrders] = useState([]);
  const [carrierData, setCarrierData] = useState({});
  const [selectedCarriers, setSelectedCarriers] = useState({});

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8181/executive/allOrders');
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [selectedCarriers]); // Fetch orders when selectedCarriers change

  useEffect(() => {
    const fetchCarrierData = async () => {
      for (const order of orders) {
        const source = order.route.source;
        try {
          const response = await axios.get(`http://localhost:8181/executive/getCarriersbySource/${source}`);
          setCarrierData(prevData => ({
            ...prevData,
            [order.id]: response.data
          }));
        } catch (error) {
          console.error(`Error fetching carrier data for order ${order.id}:`, error);
        }
      }
    };

    fetchCarrierData();
  }, [orders]);

  const handleAssignCarrier = async (orderId, selectedCarrierId) => {
    console.log("Assigning carrier for order ID:", orderId, "with selected carrier ID:", selectedCarrierId);

    try {
      await axios.put(`http://localhost:8181/executive/putCarrier/${orderId}/${selectedCarrierId}`, {});
      console.log("Carrier assigned successfully");
      // After successful assignment, refetch orders to update the table
      fetchOrders();
    } catch (error) {
      console.error("Error assigning carrier:", error);
    }
  };
  
  const handleDropdownChange = (orderId, e) => {
    const newSelectedCarrierId = e.target.value;
    console.log("Selected carrier for order ID", orderId, "is now:", newSelectedCarrierId);
  
    setSelectedCarriers(prevSelected => ({
      ...prevSelected,
      [orderId]: newSelectedCarrierId,
    }));
  };
  

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'space-between' }}>
      <table className="table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Status</th>
      <th>Product Name</th>
      <th>Pickup Address</th>
      <th>Pickup Date</th>
      <th>Cost</th>
      <th>Destination Address</th>
      <th>Receiver Contact</th>
      <th>Carrier ID</th>
      <th>Carrier Name</th>
      <th>Carrier Contact</th>
      <th>Route</th>
      <th>Vehicle</th>
            <th>Assign Carrier</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.id}</td>
              <td style={{ color: 'red' }}>{order.status}</td>
        <td>{order.product.name}</td>
        <td>{order.pickUpAddress}</td>
        <td>{order.pickUpDate}</td>
        <td>{order.cost}</td>
        <td>{order.receiver.destinationAddress}</td>
        <td>{order.receiver.contact}</td>
        <td>{order.carrier.id}</td>
        <td>{order.carrier.name}</td>
        <td>{order.carrier.contact}</td>
        <td>{order.route.source} to {order.route.destination}</td>
        <td>{order.route.vehicle}</td>

              <td>
                        <select
            value={selectedCarriers[order.id]}
            onChange={(e) => handleDropdownChange(order.id, e)}
          >
            <option value="">Select Carrier</option>
            {carrierData[order.id]?.map((carrier, index) => (
              <option key={index} value={carrier.id}>
                {carrier.id}---{carrier.name}
              </option>
            ))}
          </select>

                <button onClick={() => handleAssignCarrier(order.id, selectedCarriers[order.id])}>
  Assign
</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersComponent;