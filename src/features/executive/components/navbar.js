import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router";

function NavBarExecutive(){
    const navigate=useNavigate();
    return(
        <div className="mb-4">
        <Navbar className='nav nav-pills' bg="transparent" variant="dark">
        <Nav className="mr-auto">
        <Nav.Link style={{color:'white'}} onClick={() => navigate("/executive/dashboard?page=orders")}>All Orders </Nav.Link>
        <Nav.Link style={{color:'white'}} onClick={() => navigate("/executive/dashboard?page=carriers")} > Carriers</Nav.Link>
        <Nav.Link style={{color:'white'}} onClick={() => navigate("/executive/dashboard?page=routes")} > Routes</Nav.Link>
          {/* Add more Nav.Link components for additional tabs */}
        </Nav>
        <Navbar.Collapse className="justify-content-end">
            {
            localStorage.getItem('isLoggedIn')?
            <React.Fragment>
            <Navbar.Text >
            <span style={{color: "black"}}>Welcome  </span> <span style={{color: "black"}}> 
            {localStorage.getItem('username')} 
            </span>
          </Navbar.Text>
          &nbsp;&nbsp;&nbsp;
          <button style={{backgroundColor:'blue', color:'whitesmoke'}} className="btn btn-light btn-sm ml-4" onClick={()=>{
            localStorage.clear();
            navigate('/auth/login')}}>Logout</button>
          </React.Fragment>: 
          
          <></>
         
         }
          </Navbar.Collapse>
      </Navbar>
    </div>
    )
}

export default NavBarExecutive;