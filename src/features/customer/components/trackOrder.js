import axios from "axios";
import { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState([]);
  const [msg, setMsg] = useState('');

  const doTrack = () => {
    axios.get(`http://localhost:8181/customer/getOrder/${orderId}`)
      .then(function (response) {
        setOrder(response.data);
        setMsg('');
      })
      .catch(function (error) {
        // handle error
        setOrder([]);
        setMsg("Invalid OrderId");
        console.error(error);
      });
  }

  return (
    <Container>
      
      <Row>
        <Col></Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Track Your Order</Card.Title>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Order ID:</label>
                <input type="text" style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} placeholder="Enter your Order Id"
                  onChange={(e) => setOrderId(e.target.value)} />
              </div>
              <button className="btn btn-primary" onClick={() => doTrack()}>
                Track Order
              </button>

              {msg && <p style={{ color: 'red', marginTop: '10px' }}>{msg}</p>}

             
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
       {order.id && (
            <Card style={{  marginTop: '20px',
                            width: "18rem",
                            height: "12rem",}}>
              <Card.Body>
                <h3>Order Details</h3>
                
                    
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div >
                  <p><strong>Order ID:</strong></p>
                  <p><strong>Cost (Rs.):</strong></p>
                  <p><strong>Receiver Name:</strong></p>
                  {/* Add more rows for other order details headings */}
                </div>

                <div >
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                  {/* Add more colons for other order details */}
                </div>

                <div >
                  <p>{order.id}</p>
                  <p>{order.cost}</p>
                  <p>{order.receiver.name}</p>
                  {/* Add more paragraphs for other order details */}
                </div>
              </div>
                  
              </Card.Body>
            </Card>
          )}
          <Col></Col>
      </Row>
    </Container>
  );
}

export default TrackOrder;
