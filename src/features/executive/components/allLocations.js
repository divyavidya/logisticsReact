import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, ListGroup, Row, Table } from 'react-bootstrap';
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
            {/* <Table striped bordered hover>
        <thead>
        <tr>
            <th>All Locations</th>
            
          </tr>
        </thead>
        <tbody>
          {locations.map((location, index) => (
            
            <tr key={index}>

              <td>{location}</td>
            </tr>
          ))}
        </tbody>
      </Table> */}
      <Col md={{ span: 6, offset: 3 }}>
            <Card bg="secondary" text="white">
                <Card.Header style={{ backgroundColor: 'gray', color: '#fff',fontSize:'140%'}}>All Locations</Card.Header>
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