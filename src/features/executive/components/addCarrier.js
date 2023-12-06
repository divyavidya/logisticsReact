import axios from 'axios';
import { useState ,useEffect} from 'react';
import {  Card,  Row, Col } from 'react-bootstrap';


function AddCarrier(){
    const [name,setName] = useState('');
    const [address,setAddress] = useState(''); 
    const [email,setEmail] = useState(''); 
    const [contact,setContact] = useState('');  
    const [city,setCity] = useState('');   
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const[carrier,setCarrier]=useState({});
    const [cities, setCities] = useState([]);
    const [msg,setMsg] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8181/executive/getAllCities')
          .then(response => {
            setCities(response.data);
          })
          .catch(error => {
            console.error("Error fetching cities:", error);
          });
      }, []);
      const validatePassword = (value) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return passwordRegex.test(value);
      };

      useEffect(() => {
        const checkUsernameAvailability = async () => {
          try {
            const response = await axios.get(`http://localhost:8181/checkUsername/${username}`);
            setIsUsernameAvailable(response.data);
          } catch (error) {
            console.error('Error checking username availability:', error);
          }
        };
    
        // Check username availability only if the username is not empty
        if (username) {
          checkUsernameAvailability();
        }
      }, [username]);

    const doSignUp=(e)=>{
        e.preventDefault();
        if (!validatePassword(password)) {
          setPasswordError(
            'Password must be at least 6 characters and include one capital letter, one number, and one symbol.'
          );
          return;
        }
        let carrierObj={
            "name":name,
            "address":address,
            "email":email,
            "contact":contact,
            "city":city,
            "user":{
               "username":username,
               "password":password
            }
        }
        console.log(carrierObj)
        axios.post('http://localhost:8181/executive/carrierOnboard',carrierObj)
        .then(response=>{
            setCarrier(response.data)
            setMsg('Carrier added successfully')
        })
        .catch(function(error){
            setMsg('Issue in processing sign up')
        })
    }
    return(
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
                      Enter name:
                    </label>
                    <input required
                      type="text"
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                      }}
                      placeholder="Enter carrier's name"
                      onChange={(e) => setName(e.target.value)}/>
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "5px",
                        textAlign: "left",
                      }}
                    >
                      Enter email:
                    </label>
                    <input required
                      type="email"
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                      }}
                      placeholder="Enter carrier's email"
                      onChange={(e) => setEmail(e.target.value)}/>
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "5px",
                        textAlign: "left",
                      }}
                    >
                      Enter address:
                    </label>
                    <input required
                      type="text"
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                      }}
                      placeholder="Enter carrier's address"
                      onChange={(e) => setAddress(e.target.value)}/>
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                  <label
                      style={{
                        display: "block",
                        marginBottom: "5px",
                        textAlign: "left",
                      }}
                    >
                      City
                    </label>
                  <select aria-label="Select residing city" style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                  onChange={(e) => setCity(e.target.value)} defaultValue="">
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
                      Enter Contact Number:
                    </label>
                    <input required 
                      type="number"
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                      }}
                      placeholder="Enter carrier's contact number"
                      onChange={(e) => setContact(e.target.value)}/>
                  </div>
                  <div style={{ marginBottom: '15px' }}>
        <label
          style={{
            display: 'block',
            marginBottom: '5px',
            textAlign: 'left',
          }}
        >
          Username:
        </label>
        <input
          required
          type="text"
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
          placeholder="Set carrier's username"
          onChange={(e) => setUsername(e.target.value)}
        />
        {!isUsernameAvailable && (
          <p style={{ color: 'red', marginTop: '5px' }}>Username is not available.</p>
        )}
      </div>

                  <div style={{ marginBottom: "15px" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "5px",
                        textAlign: "left",
                      }}
                    >
                      Password:
                    </label>
                    <input required
                      type="password"
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                      }}
                      placeholder="Set carrier's password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError('');
                      }}/>
                       {passwordError && (
                      <p style={{ color: 'red', marginTop: '5px' }}>{passwordError}</p>
                    )}
                  </div>

                  <input type="submit"style={{backgroundColor:'green', color:'white', border:'none', borderRadius:'7px', padding:'8px 10px'}} value={"Add Carrier"}></input>
                </form>
              </Card.Body>
            </Card>
          </Col>
          <Col> </Col>
        </Row>
        </div>
    )
}

export default AddCarrier;