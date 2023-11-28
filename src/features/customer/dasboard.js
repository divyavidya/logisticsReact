import { Col, Container, Row } from "react-bootstrap";
import LoginDemo from "../auth/login";
import NavBarCustomer from "./components/navbar";

function CustomerDashboard(){
    return(
        <Container fluid style={{ backgroundImage: 'url(/images/truck.jpg)', backgroundSize: 'cover', height: '100vh', padding: '20px' }}>
      <Row>
        <Col>
          <h1 style={{ fontSize: '3rem', color: 'white', fontWeight: 'bold' }}>TRANSFORMATIVES</h1>
        </Col>
      </Row>

      {/* Navbar with 2 tabs */}
      <Row>
        <Col>
        <NavBarCustomer/>
        </Col>
      </Row>
      <br />
      <br />
      <Row> 
        <Col> </Col>

        {/* Right Content */}
        <Col>
          {/* Login Card */}
          <LoginDemo/>
        </Col>
      </Row>
    </Container>
    )
}

export default CustomerDashboard;