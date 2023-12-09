import axios from 'axios';
import { useState } from 'react';
import {  Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';

function LoginDemo() {
  const [param] = useSearchParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(param.get("msg"));

  const navigate =useNavigate();

  const doLogin = (e) => {
    e.preventDefault();
    let token = window.btoa(username + ":" + password);
    axios.get(
      "http://localhost:8181/user/login",
        {
          headers: {
            Authorization: "Basic " + token,
          },
        }
    )
    .then(function (response) {
      //handle success
      localStorage.setItem("username", username);
      localStorage.setItem("token", token);
      localStorage.setItem("id", response.data.id+1);
      localStorage.setItem("isLoggedIn", true);
      let role = response.data.role;

      switch (role) {
        case "CUSTOMER":
          navigate("/customer/dashboard?page=track_order");
          break;
        case "CARRIER":
          navigate("/carrier/dashboard?page=orders");
          break;
        case "EXECUTIVE":
          navigate("/executive/dashboard?page=orders");
          break;
        default:
      }
    })
    .catch(function (error) {
      //handle error
      setMsg("Invalid Credentials");
    });
  }

  return (
    <div>
           
      <Container fluid style={{ backgroundImage: 'url(/images/truck.jpg)', backgroundSize: 'cover', height: '140vh', padding: '20px' }}>
 
         <Row>
           <Col>
           <h1 style={{ fontSize: '3rem', color: 'white', fontWeight: 'bold' }}>TRANSFORMATIVES &nbsp; <i className="bi bi-truck"></i></h1>
     
           </Col>
         </Row>
 
         {/* Navbar with 2 tabs */}
         <Row>
           <Col>
             
           </Col>
         </Row>
         <br />
         <br />
         <Row>
           <Col> </Col>
 
           {/* Right Content */}
           <Col>
             {/* Login Card */}
             <Card >
             <Card.Body>
               <Card.Title>Login</Card.Title>
               {msg && <p style={{ color: 'red', marginTop: '10px' }}>{msg}</p>}
               <form onSubmit={(e)=>doLogin(e)}>
                 <div style={{ marginBottom: '15px' }}>
                   <label style={{ display: 'block', marginBottom: '5px', textAlign: 'left'}}>Username:</label>
                   <input required type="text" style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} placeholder="Enter your username"
                   onChange={(e) => setUsername(e.target.value)} />
                 </div>
 
                 <div style={{ marginBottom: '15px' }}>
                   <label style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Password:</label>
                   <input required type="password" style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} placeholder="Enter your password" 
                   onChange={(e) => setPassword(e.target.value)}/>
                 </div>
 
                 <input type="submit" style={{backgroundColor:'green', color:'white', border:'none', borderRadius:'7px', padding:'8px 10px'}} value={"Login"}></input>
               </form>
 
               <p style={{ marginTop: '10px' }}>Don't have an account? <button
                className="btn btn-primary"
                onClick={() => navigate("/auth/signup")}
              >
                Sign up
              </button></p>
             </Card.Body>
           </Card>
        
           </Col>
         </Row>
       </Container>
          </div>
    
  );
}

export default LoginDemo;
