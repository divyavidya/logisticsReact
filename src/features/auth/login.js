import { Navbar, Nav, Card, Button, Container, Row, Col } from 'react-bootstrap';

function LoginDemo() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <h1 style={{ fontSize: '3rem', color: 'white', fontWeight: 'bold' }}>TRANSFORMATIVES</h1>
        </Col>
      </Row>

      {/* Navbar with 2 tabs */}
      <Row>
        <Col>
          <Navbar className='nav nav-pills' bg="transparent" variant="dark">
            <Nav className="mr-auto">
              <Nav.Link href="#trackOrder" style={{color:'white'}}>Track Order</Nav.Link>
              <Nav.Link href="#otherLogin" style={{color:'white'}}>Other Login</Nav.Link>
              {/* Add more Nav.Link components for additional tabs */}
            </Nav>
          </Navbar>
        </Col>
      </Row>
      <br />
      <br />
      <Row> 
        <Col> </Col>

        {/* Right Content */}
        <Col>
          {/* Login Card */}
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
        </Col>
      </Row>
    </Container>
  );
}

export default LoginDemo;