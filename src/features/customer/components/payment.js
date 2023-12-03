import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

function PaymentComponent(){
  const[order,setOrder]=useState([])
  const[msg,setMsg]=useState('')
    const navigate =useNavigate();
    useEffect(()=>{
      axios.get(`http://localhost:8181/customer/getOrder/`+localStorage.getItem("oid"))
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
    },[])
    return(
        <div>
                <Row className="justify-content-center mt-5">
      <Col md={6}>
        <Card>
          <Card.Body>
            
            <Card.Title><i style={{color:'green'}}>Order Placed Successfully</i></Card.Title>
            <Row>
          <Col xs={2}></Col>
          <Col xs={4}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p ><strong style={{fontSize:'110%'}}>Order ID</strong></p>
            <p ><strong style={{fontSize:'110%'}}>Pickup Date</strong> </p>
            <p ><strong style={{fontSize:'110%'}}>Cost</strong> </p>
            
          </div>
          </Col>
          <Col xs={4}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p>{order.id}</p>
              <p>{order.pickUpDate}</p>
              <p>{order.cost}</p>
              {/* Add more content as needed */}
            </div>
          </Col>
          <Col xs={2}></Col>
        </Row>
            
          </Card.Body>
        </Card>
      </Col>
    </Row>
        </div>
    )
}

export default PaymentComponent;