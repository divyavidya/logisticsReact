import { Col, Container, Row } from "react-bootstrap";
import LoginDemo from "../auth/login";
import NavBarCustomer from "./components/navbar";
import { useSearchParams } from "react-router-dom";
import TrackOrder from "./components/trackOrder";
import HistoryComponent from "./components/history";
import PlaceOrder from "./components/placeorder";

function CustomerDashboard(){
  const [param] = useSearchParams();

  const process =()=>{
    if(!param.get('page')){
        return <div>
            <LoginDemo/>
        </div>
    }
   
    if(param.get('page')=== 'track_order'){
       if(localStorage.getItem('isLoggedIn')===null){
        localStorage.setItem('url','/customer/dashboard?page=track_order')
        return<div>
            <LoginDemo/>
        </div>
       }
       return <div>
            <TrackOrder/>
        </div>
    }
    if(param.get('page')=== 'previous_orders'){
      if(localStorage.getItem('isLoggedIn')===null){
       localStorage.setItem('url','/customer/dashboard?page=previous_orders')
       return<div>
           <LoginDemo/>
       </div>
      }
      return <div>
           <HistoryComponent/>
       </div>
   }
   if(param.get('page')=== 'place_order'){
    if(localStorage.getItem('isLoggedIn')===null){
     localStorage.setItem('url','/customer/dashboard?page=place_order')
     return<div>
         <LoginDemo/>
     </div>
    }
    return <div>
         <PlaceOrder/>
     </div>
 }
}
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
        {process()}
        </Col>
      </Row>
      <br />
      <br />
    </Container>
    )
}

export default CustomerDashboard;