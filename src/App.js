import { Route, Routes } from 'react-router';
import './App.css';
//import LoginDemo from './features/auth/login';
import CustomerDashboard from './features/customer/dasboard';
import LoginDemo from './features/auth/login';
import SignUp from './features/auth/signup';
import Logout from './features/auth/logout';
import ExecutiveDashboard from './features/executive/dashboard';
import CarrierDashbaord from './features/carrier/dashbaord';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginDemo/>}></Route>
        <Route path="/customer/dashboard" element={<CustomerDashboard/>}></Route>
        <Route path="/executive/dashboard" element={<ExecutiveDashboard/>}></Route>
        <Route path="/carrier/dashboard" element={<CarrierDashbaord/>}></Route>
        <Route path="/auth/login" element={<LoginDemo/>}></Route>
          <Route path="/auth/signup" element={<SignUp/>}></Route>
          <Route path="/auth/logout" element={<Logout/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
