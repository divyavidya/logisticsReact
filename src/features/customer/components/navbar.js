import { Nav, Navbar } from "react-bootstrap";

function NavBarCustomer(){
    return(
        <div>
            <Navbar className='nav nav-pills' bg="transparent" variant="dark">
            <Nav className="mr-auto">
              <Nav.Link href="#trackOrder" style={{color:'white'}}>Track Order</Nav.Link>
              <Nav.Link href="#otherLogin" style={{color:'white'}}>Other Login</Nav.Link>
              {/* Add more Nav.Link components for additional tabs */}
            </Nav>
          </Navbar>
        </div>
    )
}

export default NavBarCustomer;