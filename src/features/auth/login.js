import {  Card, Button } from 'react-bootstrap';

function LoginDemo() {
  return (
    <div>
          <Card style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
            <Card.Body>
              <Card.Title>Login</Card.Title>
              <form>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', textAlign: 'left'}}>Username:</label>
                  <input type="text" style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} placeholder="Enter your username" />
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Password:</label>
                  <input type="password" style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} placeholder="Enter your password" />
                </div>

                <Button variant="primary" type="submit">
                  Login
                </Button>
              </form>

              <p style={{ marginTop: '10px' }}>Don't have an account? <a href="#">Signup</a></p>
            </Card.Body>
          </Card>
       
          </div>
    
  );
}

export default LoginDemo;
