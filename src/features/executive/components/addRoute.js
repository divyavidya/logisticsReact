import { Card, Col, Row } from "react-bootstrap";
import axios from 'axios';
import { useState ,useEffect} from 'react';
function AddRoute() {
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [location, setLocation] = useState('');
    const [vehicle, setVehicle] = useState('');
    const [distance, setDistance] = useState('');
    const [noOfDays, setNoOfDays] = useState('');
    const [route, setRoute] = useState({});
    const [msg, setMsg] = useState('');
    const [cities, setCities] = useState([]);
    const [locations, setLocations] = useState([]);
  
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
      } else {
        setLocations([]);
      }
    }, [source]);
    const handleLocationChange = (e) => {
        const selectedLocation = e.target.value;
    
        // Check if the selected location is in the list of locations
        if (locations.includes(selectedLocation)) {
          // If it's in the list, update the location state
          setLocation(selectedLocation);
        } else {
          // If it's not in the list, treat it as a typed location
          setLocation('');
        }
      };

    const doSignUp = (e) => {
      e.preventDefault();
      if (distance <= 0 || isNaN(distance) || noOfDays <= 0 || isNaN(noOfDays)) {
        setMsg('Distance and Number of Days must be positive numbers');
        return;
    }
  
      let routeObj = {
        "source": source,
        "destination": destination,
        "distance": distance,
        "noOfDays": noOfDays,
        "location": location,
        "vehicle": vehicle
      };
  
      axios.post('http://localhost:8181/executive/addRoute', routeObj)
        .then(response => {
          setRoute(response.data);
          setMsg('Route added successfully');
        })
        .catch(function (error) {
          setMsg('Issue in processing sign up');
        });
    };
  
    return (
      <div>
        <Row>
        <Col> </Col>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>Onboard Carrier</Card.Title>
            {msg && (
    <div style={{ textAlign: 'center', color: msg.includes('success') ? 'green' : 'red' }}>
      {msg}
    </div>
  )}
            <form onSubmit={(e)=>doSignUp(e)}>
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    textAlign: "left",
                  }}
                >
                  Enter source:
                </label>
                <input required
                  type="text"
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                  placeholder="Enter source city"
                  onChange={(e) => setSource(e.target.value)}/>
              </div>
              <div style={{ marginBottom: "15px" }}>
                  <label
                      style={{
                        display: "block",
                        marginBottom: "5px",
                        textAlign: "left",
                      }}
                    >
                      Destination City
                    </label>
                  <select aria-label="Select residing city" style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                  onChange={(e) => setDestination(e.target.value)} defaultValue="">
                    <option value="" disabled hidden>
                        select the city
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
                  Enter distance:
                </label>
                <input required
                  type="number"
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                  placeholder="Enter distance"
                  onChange={(e) => setDistance(e.target.value)}/>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    textAlign: "left",
                  }}
                >
                  Enter Number Of Days:
                </label>
                <input required 
                  type="number"
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                  placeholder="Enter number of Days"
                  onChange={(e) => setNoOfDays(e.target.value)}/>
              </div>
          <div style={{ marginBottom: "15px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "5px",
            textAlign: "left",
          }}
        >
          Enter or Select location:
        </label>
        <select
          aria-label="Select source location"
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          onChange={handleLocationChange}
          // Remove value={location}
        >
          <option value="" disabled hidden>
            Select or type location
          </option>
          {locations.map((locationOption, index) => (
            <option key={index} value={locationOption}>
              {locationOption}
            </option>
          ))}
        </select>
        {/* Add an input for typing location */}
        <input
          type="text"
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginTop: "5px",
          }}
          placeholder="Type location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
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
                  Enter vehicle:
                </label>
                <input required
                  type="text"
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                  placeholder="Enter Vehicle"
                  onChange={(e) => setVehicle(e.target.value)}/>
              </div>

              <input type="submit"style={{backgroundColor:'green', color:'white', border:'none', borderRadius:'7px', padding:'8px 10px'}} value={"Add Route"}></input>
            </form>
          </Card.Body>
        </Card>
      </Col>
      <Col> </Col>
    </Row>
    </div>
    )
}
export default AddRoute;