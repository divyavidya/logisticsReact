import axios from "axios";
import { useEffect, useState } from "react";
import {  Card, Col,  ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { getLocations } from "../../../store/actions/locations";
function AllLocations(){
    const[locations,setLocations]=useState([]); 
    const dispatch=useDispatch();
    let {list}=useSelector((state)=>state.location)
    // const[products,setProducts]=useState([]);
    useEffect(()=>{
        dispatch(getLocations())
    },[dispatch])
    return(
        <div>
      <Col md={{ span: 6, offset: 3 }}>
            <Card bg="secondary" text="white">
                <Card.Header style={{ backgroundColor: 'gray', color: '#fff',fontSize:'140%'}}>All Designated Locations</Card.Header>
                <Card.Body>
                    <ListGroup>
                        {list.map((location, index) => (
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