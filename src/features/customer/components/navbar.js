import { Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router";

function NavBarCustomer(){

  const navigate = useNavigate();

    return(
        <div className="mb-4">
            <Navbar className='nav nav-pills' bg="transparent" variant="dark">
            <Nav className="mr-auto">
            <Nav.Link style={{color:'white'}} onClick={() => navigate("/customer/dashboard?page=track_order")}>Track Order </Nav.Link>
            <Nav.Link style={{color:'white'}} onClick={() => navigate("/customer/dashboard?page=previous_orders")} > Previous Orders</Nav.Link>
              {/* Add more Nav.Link components for additional tabs */}
            </Nav>
          </Navbar>
        </div>
    )
}

export default NavBarCustomer;