import { Col, Container, Row } from "react-bootstrap";
import CarrierNavbar from "./components/navbar";
import {  useSearchParams } from "react-router-dom";
import CarrierOrders from "./components/carrierorders";
import LoginDemo from "../auth/login";

function CarrierDashbaord(){
    const [param] = useSearchParams();
    const message="Orders";
    const process =()=>{
        if(!param.get('page')){
              return <div>
                <LoginDemo/>
              </div>
          }
          if(param.get('page')=== 'orders'){
            if(localStorage.getItem('isLoggedIn')===null){
             localStorage.setItem('url','/carrier/dashboard?page=orders')
             return<div>
                 <LoginDemo/>
             </div>
            }
            return <div>
                 <CarrierOrders message={message}/>
             </div>
         }
        
    }
    return(<div>
 <Container fluid style={{ backgroundImage: 'url(/images/truck.jpg)', backgroundSize: 'cover', height: '140vh', padding: '20px' }}>
        <Row>
        <Col>
          <h1 style={{ fontSize: '3rem', color: 'white', fontWeight: 'bold' }}>TRANSFORMATIVES &nbsp; <i className="bi bi-truck"></i></h1>
        </Col>
      </Row>
      <Row>
        <Col>
        <CarrierNavbar/>
        {process()}
        </Col>
      </Row>
       </Container>
    </div>)
}
export default CarrierDashbaord;