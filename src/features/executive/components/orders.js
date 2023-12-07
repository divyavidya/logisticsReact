import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OrdersComponent() {
  const [orders, setOrders] = useState([]);
  const [carrierData, setCarrierData] = useState({});
  const [selectedCarriers, setSelectedCarriers] = useState({});
  const [statusFilter, setStatusFilter] = useState('');

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
  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'space-between' }}>
      <div>
        <label>
          <input
            type="radio"
            name="statusFilter"
            value=""
            checked={statusFilter === ''}
            onChange={() => handleStatusFilterChange('')}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            name="statusFilter"
            value="PENDING"
            checked={statusFilter === 'PENDING'}
            onChange={() => handleStatusFilterChange('PENDING')}
          />
          Pending
        </label>
        <label>
          <input
            type="radio"
            name="statusFilter"
            value="IN_TRANSIT"
            checked={statusFilter === 'IN_TRANSIT'}
            onChange={() => handleStatusFilterChange('IN_TRANSIT')}
          />
          In Transit
        </label>
        <label>
          <input
            type="radio"
            name="statusFilter"
            value="DELIVERED"
            checked={statusFilter === 'DELIVERED'}
            onChange={() => handleStatusFilterChange('DELIVERED')}
          />
          Delivered
        </label>
      </div>
      <table className="table table-bordered" >
        <thead>
          <tr>
            <th style={{ width: '5%' }}>Order ID</th>
            <th style={{ width: '8%' }}>Product</th>
            <th style={{ width: '11%' }}>Pick - Up Address</th>
            <th style={{ width: '8%' }}>Pickup Date</th>
            <th style={{ width: '3%' }}>Cost</th>
            <th style={{ width: '11%' }}>Destination Address</th>
            <th style={{ width: '10%' }}>Receiver Contact</th>
            <th style={{ width: '5%' }}>Carrier</th>
            <th style={{ width: '10%' }}>Carrier Contact</th>
            <th style={{ width: '6%' }}>Route</th>
            <th style={{ width: '8%' }}>Vehicle</th>
            <th style={{ width: '5%' }}>Status</th>
            <th style={{ width: '10%' }}>Change Carrier</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
             const displayStatus = order.status === 'SHIPPED' ? 'IN_TRANSIT' : order.status;
             

            // Filter rows based on status
            if (statusFilter && displayStatus !== statusFilter) {
              return null;
            }
            return(
              <tr key={index} >
              <td>{order.id}</td>
           
        <td>{order.product.name}</td>
        <td>{order.pickUpAddress}</td>
        <td>{order.pickUpDate}</td>
        <td>{order.cost}</td>
        <td>{order.receiver.destinationAddress}</td>
        <td>{order.receiver.contact}</td>
        <td>{order.carrier.name}</td>
        <td>{order.carrier.contact}</td>
        <td>{order.route.source} to {order.route.destination}</td>
        <td>{order.route.vehicle}</td>
        <td style={{ color: displayStatus === 'PENDING' ? 'red' : displayStatus === 'IN_TRANSIT' ? '#F7C310 ' : 'green' }}>
  {displayStatus}
            </td>

        <td>
                {displayStatus === 'DELIVERED' ? (
                  'Delivered'
                ) : (
                  <>
                    <select
                      value={selectedCarriers[order.id]}
                      onChange={(e) => handleDropdownChange(order.id, e)}
                      style={{ width: '100%' }}
                    >
                      <option value="">Select Carrier</option>
                      {carrierData[order.id]?.map((carrier, index) => (
                        <option key={index} value={carrier.id}>
                          {carrier.id}---{carrier.name}
                        </option>
                      ))}
                    </select>
                    <button className="btn btn-primary btn-sm" onClick={() => handleAssignCarrier(order.id, selectedCarriers[order.id])} style={{ width: '60%', height:'40',marginTop: '5px'}}>
                      Assign
                    </button>
                  </>
                )}
              </td>
            </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersComponent;