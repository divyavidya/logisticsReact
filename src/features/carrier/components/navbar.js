import axios from "axios";
import React, { useEffect, useState } from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

function CarrierNavbar() {
  const navigate = useNavigate();
  const [carrier, setCarrier] = useState([]);
  
  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = () => {
    axios.get('http://localhost:8181/carrier/details/' + localStorage.getItem('id'))
      .then(response => setCarrier(response.data))
      .catch(error => {
        console.log("Error fetching orders:", error);
      });
  };

  const updateStatus = () => {
    const newStatus = carrier.status === "AVAILABLE" ? "NOTAVAILABLE" : "AVAILABLE";
    axios.put('http://localhost:8181/carrier/updateCarrier/' + localStorage.getItem('id'), { status: newStatus })
      .then(() => {
        // Update the local state after a successful update
        setCarrier(prevCarrier => ({ ...prevCarrier, status: newStatus }));
      })
      .catch(error => {
        console.log("Error updating carrier status:", error);
      });
  };

  return (
    <div className="mb-4">
      <Navbar className='nav nav-pills' bg="transparent" variant="dark">
        <Nav className="mr-auto">
          <Nav.Link style={{ color: 'white' }} onClick={() => navigate("/carrier/dashboard?page=orders")}>All Orders </Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          {localStorage.getItem('isLoggedIn') ?
            <React.Fragment>
              <Navbar.Text>
                <label className="switch">
                  <input type="checkbox" checked={carrier.status === "AVAILABLE"} onChange={updateStatus} />
                  <span className="slider"></span>
                </label>
                {carrier.status && <span style={{ color: 'black' }}>{carrier.status}</span>}&nbsp;&nbsp;
                <span style={{ color: "black" }}>Welcome  </span> <span style={{ color: "black" }}>
                  <i className="bi bi-person-circle" style={{ color: 'black' }}></i>&nbsp;
                  {localStorage.getItem('username')}
                </span>
              </Navbar.Text>
              &nbsp;&nbsp;&nbsp;
              <button style={{ backgroundColor: 'blue', color: 'whitesmoke' }} className="btn btn-light btn-sm ml-4" onClick={() => {
                localStorage.clear();
                navigate('/auth/login')
              }}>Logout</button>
            </React.Fragment> :
            <></>
          }
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default CarrierNavbar;
