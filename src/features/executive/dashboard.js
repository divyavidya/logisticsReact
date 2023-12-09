import { Col, Container, Row } from "react-bootstrap";
import NavBarExecutive from "./components/navbar";
import {  useSearchParams } from "react-router-dom";
import OrdersComponent from "./components/orders";
import CarriersComponent from "./components/carriers";
import RoutesComponent from "./components/routes";
import LoginDemo from "../auth/login";
import AddCarrier from "./components/addCarrier";
import AddRoute from "./components/addRoute";
import AllLocations from "./components/allLocations";
import Customers from "./components/customers";

function ExecutiveDashboard(){
    const [param] = useSearchParams();
    const process =()=>{
        if(!param.get('page')){
              return <div>
                <LoginDemo/>
              </div>
          }
          if(param.get('page')=== 'orders'){
            if(localStorage.getItem('isLoggedIn')===null){
             localStorage.setItem('url','/executive/dashboard?page=orders')
             return<div>
                 <LoginDemo/>
             </div>
            }
            return <div>
                 <OrdersComponent/>
             </div>
         }
         if(param.get('page')=== 'addCarrier'){
          if(localStorage.getItem('isLoggedIn')===null){
           localStorage.setItem('url','/executive/dashboard?page=addCarrier')
           return<div>
               <LoginDemo/>
           </div>
          }
          return <div>
               <AddCarrier/>
           </div>
       }
       if(param.get('page')=== 'addRoute'){
        if(localStorage.getItem('isLoggedIn')===null){
         localStorage.setItem('url','/executive/dashboard?page=addRoute')
         return<div>
             <LoginDemo/>
         </div>
        }
        return <div>
             <AddRoute/>
         </div>
     }

         if(param.get('page')=== 'carriers'){
            if(localStorage.getItem('isLoggedIn')===null){
             localStorage.setItem('url','/executive/dashboard?page=carriers')
             return<div>
                 <LoginDemo/>
             </div>
            }
            return <div>
                 <CarriersComponent/>
             </div>
         }
         if(param.get('page')=== 'routes'){
            if(localStorage.getItem('isLoggedIn')===null){
             localStorage.setItem('url','/executive/dashboard?page=routes')
             return<div>
                 <LoginDemo/>
             </div>
            }
            return <div>
                 <RoutesComponent/>
             </div>
         }
         if(param.get('page')=== 'allLocations'){
            if(localStorage.getItem('isLoggedIn')===null){
             localStorage.setItem('url','/executive/dashboard?page=allLocations')
             return<div>
                 <LoginDemo/>
             </div>
            }
            return <div>
                 <AllLocations/>
             </div>
         }
         if(param.get('page')=== 'customers'){
            if(localStorage.getItem('isLoggedIn')===null){
             localStorage.setItem('url','/executive/dashboard?page=customers')
             return<div>
                 <LoginDemo/>
             </div>
            }
            return <div>
                 <Customers/>
             </div>
         }
    }


    return(
       <Container fluid style={{ backgroundImage: 'url(/images/truck.jpg)', backgroundSize: 'cover', height: '160vh', backgroundRepeat: 'repeat',padding: '20px' }}>
        <Row>
        <Col>
          <h1 style={{ fontSize: '3rem', color: 'white', fontWeight: 'bold' }}>TRANSFORMATIVES &nbsp; <i className="bi bi-truck"></i></h1>
        </Col>
      </Row>
      <Row>
        <Col>
        <NavBarExecutive/>
        {process()}
        </Col>
      </Row>
       </Container>
    )
}

export default ExecutiveDashboard;