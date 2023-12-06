import axios from 'axios';
import { useEffect, useState } from 'react';
import {  Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';
function SignUp() {
    const [name,setName] = useState('');
    const [address,setAddress] = useState(''); 
    const [email,setEmail] = useState(''); 
    const [contact,setContact] = useState('');    
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const[customer,setCustomer]=useState({});
    const [msg,setMsg] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
    const navigate =useNavigate();

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

    const validatePassword = (value) => {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
      return passwordRegex.test(value);
    };

    const doSignUp=(e)=>{
        e.preventDefault();
        if (!validatePassword(password)) {
          setPasswordError(
            'Password must be at least 6 characters and include one capital letter, one number, and one symbol.'
          );
          return;
        }
        let customerObj={
            "name":name,
            "address":address,
            "email":email,
            "contact":contact,
            "user":{
               "username":username,
               "password":password
            }
        }
        console.log(customerObj)
        //console.log(JSON.stringify(customerObj))
        axios.post('http://localhost:8181/customer/signup',customerObj)
        .then(response=>{
            setCustomer(response.data)
            navigate('/auth/login?msg=signup success')
        })
        .catch(function(error){
            setMsg('Issue in processing sign up')
        })
    }
  return (
    <div>
      <Container fluid style={{ backgroundImage: 'url(/images/truck.jpg)', backgroundSize: 'cover', height: '150vh', padding: '20px' }}>
        <Row>
          <Col>
          <h1 style={{ fontSize: '3rem', color: 'white', fontWeight: 'bold' }}>TRANSFORMATIVES</h1>
          </Col>
        </Row>

        {/* Navbar with 2 tabs */}
        <Row>
          <Col></Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col> </Col>

          {/* Right Content */}
          <Col>
            {/* Login Card */}
            <Card>
              <Card.Body>
                <Card.Title>SignUp</Card.Title>
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
                      placeholder="Enter your name"
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
                      placeholder="Enter your email"
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
                      placeholder="Enter your address"
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
                      placeholder="Enter your contact number"
                      onChange={(e) => setContact(e.target.value)}/>
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "5px",
                        textAlign: "left",
                      }}
                    >
                      Username:
                    </label>
                    <input required
                      type="text"
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                      }}
                      placeholder="Enter your username"
                      onChange={(e) => setUsername(e.target.value)}/>
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
                      placeholder="Enter your password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError('');
                      }}
                    />
                    {passwordError && (
                      <p style={{ color: 'red', marginTop: '5px' }}>{passwordError}</p>
                    )}
                  </div>

                  <input type="submit"style={{backgroundColor:'green', color:'white', border:'none', borderRadius:'7px', padding:'8px 10px'}} value={"Sign Up"}></input>
                </form>

                <p style={{ marginTop: "10px" }}>
                  Already have an account?{" "}
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/auth/login")}
                  >
                    Login
                  </button>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default SignUp;