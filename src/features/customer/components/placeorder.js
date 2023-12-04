import axios from 'axios';
import { useState } from 'react';
import {  Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';
function PlaceOrder(){
    const [source,setSource] = useState('');
    const [destination,setDestination] = useState(''); 
    const [pickUpAddress,setPickUpAddress] = useState(''); 
    const [pickUpDate,setPickUpDate] = useState('');    
    const [receiverName,setReceiverName] = useState('');
    const [receiverAddress,setReceiverAddress] = useState('');
    const[receiverContact,setReceiverContact]=useState('');
    const[productType,setProductType]=useState('');
    const[productName,setProductName]=useState('');
    const[productDescription,setProductDescription]=useState('');
    const[order,setOrder]=useState({});
    const [msg,setMsg] = useState('');
    const navigate =useNavigate();
    const palceOrder=(e)=>{
        e.preventDefault();
        let orderObject={
            "source":source,
            "destination":destination,
            "pickUpAddress":pickUpAddress,
            "pickUpDate":pickUpDate,
            "receiver":{
                "name":receiverName,
                "destinationAddress":receiverAddress,
                "contact":receiverContact
            },
        "product":{
            "type":productType,
            "name":productName,
            "description":productDescription
        }
        
        } 
        console.log(orderObject)
        //console.log(JSON.stringify(customerObj))
        axios.post('http://localhost:8181/customer/'+localStorage.getItem("id"),orderObject)
        .then(response=>{
            setOrder(response.data)
            localStorage.setItem("oid", response.data.id);
            navigate('/customer/dashboard?page=payment')
        })
        .catch(function(error){
            setMsg('Issue in placing order')
        })
    }
return(
    <div>
    <Container>
    <Row>
      <Col md={6}> 
      <Card>
          <Card.Body>
            <Card.Title>Place Order</Card.Title>
            {msg && <p style={{ color: 'red', marginTop: '10px' }}>{msg}</p>}
            <form onSubmit={(e)=>palceOrder(e)}>
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    textAlign: "left",
                  }}
                >
                  Enter Source:
                </label>
                {/* <input
                  type="text"
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                  placeholder="Enter your source"
                  onChange={(e) => setSource(e.target.value)}/> */}
                  <select aria-label="Select" style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                  onChange={(e) => setSource(e.target.value)} defaultValue="">
                    <option value="" disabled hidden>
                        select your source city
                    </option>
          <option value="chennai">chennai</option>
          <option value="mumbai">mumbai</option>
          <option value="pune">pune</option>
          <option value="delhi">delhi</option>
          {/* Add more options as needed */}
        </select>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    textAlign: "left",
                  }}
                >
                  Enter Destination:
                </label>
                {/* <input
                  type="text"
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                  placeholder="Enter your destination"
                  onChange={(e) => setDestination(e.target.value)}/> */}
                  <select aria-label="Select" style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                  onChange={(e) => setDestination(e.target.value)} defaultValue="">
                    <option value="" disabled hidden>
                           select your destination city
                      </option>
          <option value="chennai">chennai</option>
          <option value="mumbai">mumbai</option>
          <option value="pune">pune</option>
          <option value="delhi">delhi</option>
          {/* Add more options as needed */}
        </select>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    textAlign: "left",
                  }}
                >
                  Enter PickUp Address:
                </label>
                <input required
                  type="text"
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                  placeholder="Enter your pickup address"
                  onChange={(e) => setPickUpAddress(e.target.value)}/>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    textAlign: "left",
                  }}
                >
                  Enter PickUp Date:
                </label>
                <input required
                  type="date"
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                  placeholder="Enter your pickup date"
                  onChange={(e) => setPickUpDate(e.target.value)}/>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    textAlign: "left",
                  }}
                >
                  Enter Receiver Name:
                </label>
                <input required
                  type="text"
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                  placeholder="Enter your receiver name"
                  onChange={(e) => setReceiverName(e.target.value)}/>
              </div>
              </form>
          </Card.Body>
        </Card>
        
      </Col>
      {/* Right Content */}
      <Col md={6}>
        {/* Login Card */}
        <Card>
          <Card.Body>
            {/* <Card.Title>Place Order</Card.Title> */}
            <form onSubmit={(e)=>palceOrder(e)}>
              
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    textAlign: "left",
                  }}
                >
                  Enter Receiver Address:
                </label>
                <input required
                  type="text"
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                  placeholder="Enter your receiver address"
                  onChange={(e) => setReceiverAddress(e.target.value)}/>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    textAlign: "left",
                  }}
                >
                  Enter Receiver Contact Number:
                </label>
                <input required
                  type="number"
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                  placeholder="Enter your receiver contact number"
                  onChange={(e) => setReceiverContact(e.target.value)}/>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    textAlign: "left",
                  }}
                >
                  Enter Product Type:
                </label>
                <input required
                  type="text"
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                  placeholder="Enter your product type"
                  onChange={(e) => setProductType(e.target.value)}/>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    textAlign: "left",
                  }}
                >
                  Enter Product Name:
                </label>
                <input required
                  type="text"
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                  placeholder="Enter your product Name"
                  onChange={(e) => setProductName(e.target.value)}/>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    textAlign: "left",
                  }}
                >
                  Enter Product Description:
                </label>
                <input required
                  type="text"
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                  placeholder="Enter your product description"
                  onChange={(e) => setProductDescription(e.target.value)}/>
              </div>

              <input type="submit" style={{backgroundColor:'green', color:'white', border:'none', borderRadius:'7px', padding:'8px 10px'}} value={"Place Order"}></input>
            </form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
</div>
)
}
export default PlaceOrder;