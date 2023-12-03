import axios from "axios";
import { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState([]);
  const [msg, setMsg] = useState('');

  const doTrack = () => {
    axios.get(`http://localhost:8181/customer/getOrder/'`+orderId)
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
                            width: "50rem",
                            height: "26rem",}}>
              <Card.Body>
                <h3>Order Details</h3>
                
                    <Row>
                <Col style={{ display: 'flex', justifyContent: 'space-between' }}>
                  
                <div >
                  <p><strong>Order ID</strong></p>
                  <p><strong>Total Cost</strong></p>
                  <p><strong>Pickup Address</strong></p>
                  <p><strong>Pickup Date</strong></p>
                  <p><strong>Status</strong></p><hr/>
                  <p><strong>Carrier Name</strong></p>
                  <p><strong>Carrier Contact</strong></p>
                  {/* Add more rows for other order details headings */}
                </div>

                <div >
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                  <p>:</p><hr/>
                  <p>:</p>
                  <p>:</p>
                  {/* Add more colons for other order details */}
                </div>

                <div >
                  <p>{order.id}</p>
                  <p>(Rs. ){order.cost}</p>
                  <p>{order.pickUpAddress}</p>
                  <p>{order.pickUpDate}</p>
                  <p style={{color:'red'}}>{order.status}</p><hr/>
                  <p>{order.carrier.name}</p>
                  <p>{order.carrier.contact}</p>
                  {/* Add more paragraphs for other order details */}
                </div>
              </Col><Col style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div >
                <p></p>
                  <p><strong>Receiver Name</strong></p>
                  <p><strong>Destination Address</strong></p>
                  <p><strong>Contact</strong></p><hr/>
                  <p><strong>Product Type</strong></p>
                  <p><strong>Product Name</strong></p>
                  <p><strong>Product Decription</strong></p>
                  
            
                </div>

                <div >
                <p></p>
                  <p>:</p>
                  <p>:</p>
                  <p>:</p><hr/>
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                
                </div>

                <div >
                  <p></p>
                  <p>{order.receiver.name}</p>
                  <p>{order.receiver.destinationAddress}</p>
                  <p>{order.receiver.contact}</p><hr/>
                  <p>{order.product.type}</p>
                  <p>{order.product.name}</p>
                  <p>{order.product.description}</p>
                  
                  
                </div>
              </Col>
              </Row>
              </Card.Body>
              <Card.Footer>
            <small className="text-muted">
              Route: {order.route.source} to {order.route.destination} | Vehicle: {order.route.vehicle}
            </small>
          </Card.Footer>
            </Card>
          )}
          <Col></Col>
      </Row>
    </Container>
  );
}

export default TrackOrder;
