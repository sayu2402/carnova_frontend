import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./containers/userPage/userHome";
import Login from "./containers/userPage/userLogin";
import SignUp from "./containers/userPage/userSignUp";
import OtpPage from "./containers/userPage/OtpPage";
import AuthContext from "./context/AuthContext";
import { AuthProvider } from "./context/AuthContext";
import SignupPartner from "./containers/vendorPage/VendorSignup";
import VendorDashboard from "./containers/vendorPage/VendorDashboard";
import AdminDashboard from "./containers/adminPage/AdminDashboard";
import Adminlogin from "./containers/adminPage/AdminLogin";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import UserList from "./containers/adminPage/UserList";
import VendorList from "./containers/adminPage/VendorList";

// import UserRouter from "./router/userRoute/UserRouter";
// import AdminRouter from "./router/adminRoute/AdminRouter";
// import VendorRouter from "./router/VendorRoute/VendorRouter";

function PrivateRouteuser({ element }) {
  const { userdetails } = useContext(AuthContext);
  return userdetails && userdetails.role === "user" ? (
    element
  ) : (
    <Navigate to="/login" />
  );
}

function PrivateRoutepartner({ element }) {
  const { userdetails } = useContext(AuthContext);
  return userdetails && userdetails.role === "partner" ? (
    element
  ) : (
    <Navigate to="/login" />
  );
}

function PrivateRouteadmin({ element }) {
  const { userdetails } = useContext(AuthContext);
  return userdetails && userdetails.role === "admin" ? (
    element
  ) : (
    <Navigate to="/login" />
  );
}

function App() {

  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signuppartner" element={<SignupPartner />} />
          <Route path="/otp" element={<OtpPage />} />
          <Route path="/partnerdashboard" element={<VendorDashboard />} />
          <Route path="/admindashboard" element={<AdminDashboard />}/>
          <Route path="/Adminlogin" element={<Adminlogin />} />
          <Route path="/userlist" element={ <UserList/> }/>
          <Route path="/vendorlist" element={ <VendorList/> }/>

          {/* <Route path="/vendor/*" element={<VendorRouter/>}/>
          <Route path="/*" element={<UserRouter/>}/>
          <Route path="/admin/*" element={<AdminRouter/>}/> */}
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
