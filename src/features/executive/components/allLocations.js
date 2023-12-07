import axios from "axios";
import { useEffect, useState } from "react";
import {  Card, Col,  ListGroup } from 'react-bootstrap';
function AllLocations(){
    const[locations,setLocations]=useState([]);
    useEffect(() => {
        axios.get('http://localhost:8181/executive/desiLocations')
          .then(response => setLocations(response.data))
          .catch(error => {
            // Handle error here
            console.error("Error fetching orders:", error);
          });
      }, []); 
    
    return(
        <div>
      <Col md={{ span: 6, offset: 3 }}>
            <Card bg="secondary" text="white">
                <Card.Header style={{ backgroundColor: 'gray', color: '#fff',fontSize:'140%'}}>All Designated Locations</Card.Header>
                <Card.Body>
                    <ListGroup>
                        {locations.map((location, index) => (
                            <ListGroup.Item key={index}>{location}</ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card.Body>
            </Card>
            </Col>
        </div>
    )
}
export default AllLocations;