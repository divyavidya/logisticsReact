import axios from 'axios';
import { useEffect, useState } from 'react';
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
    const [cities, setCities] = useState([]);
    const [locations, setLocations] = useState([]);
    const [receiverAddresses, setReceiverAddresses] = useState([]);
    const navigate =useNavigate();

    useEffect(() => {
      axios.get('http://localhost:8181/executive/getAllCities')
        .then(response => {
          setCities(response.data);
        })
        .catch(error => {
          console.error("Error fetching cities:", error);
        });
    }, []);

    useEffect(() => {
      if (source) {
        axios.get(`http://localhost:8181/carrier/getLocations/${source}`)
          .then(response => {
            setLocations(response.data);
          })
          .catch(error => {
            console.error("Error fetching locations:", error);
          });
      }
    }, [source]);

    useEffect(() => {
      if (destination) {
        axios.get(`http://localhost:8181/getLocations/${destination}`)
          .then(response => {
            setReceiverAddresses(response.data);
          })
          .catch(error => {
            console.error("Error fetching receiver addresses:", error);
          });
      }
    }, [destination]);
  

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
            setMsg('Please fill out all the details....issue in placing order')
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
                  Source City:
                </label>
                  <select aria-label="Select" style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                  onChange={(e) => setSource(e.target.value)} defaultValue="" required>
                    <option value="" disabled hidden>
                        select your source city
                    </option>
                    {cities.map((cityOption, index) => (
                        <option key={index} value={cityOption}>
                          {cityOption}
                        </option>
                      ))}
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
                  Destination City:
                </label>
                  <select aria-label="Select" style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                  onChange={(e) => setDestination(e.target.value)} defaultValue="" required>
                    <option value="" disabled hidden>
                           select your destination city
                      </option>
                      {cities.map((cityOption, index) => (
                        <option key={index} value={cityOption}>
                          {cityOption}
                        </option>
                      ))}
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
                  PickUp Location:
                </label>
                <select
          aria-label="Select"
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          onChange={(e) => setPickUpAddress(e.target.value)}
          defaultValue="" required
        >
          <option value="" disabled hidden>
            Select your pickup location
          </option>
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
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
                  Select PickUp Date:
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
                  onChange={(e) => setPickUpDate(e.target.value)}  min={new Date().toISOString().split("T")[0]}/>
              </div>
              <div style={{ marginBottom: "15px" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "5px",
                        textAlign: "left",
                      }}
                    >
                      Upload Product Image:
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                      }}
                    />
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
                  placeholder="Enter your receiver's name"
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
                  Dropping location:
                </label>
                <select
          aria-label="Select"
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          onChange={(e) => setReceiverAddress(e.target.value)}
          defaultValue="" required
        >
          <option value="" disabled hidden>
            Select dropping location
          </option>
          {receiverAddresses.map((address, index) => (
            <option key={index} value={address}>
              {address}
            </option>
          ))}
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