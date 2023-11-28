import { Navigate } from "react-router-dom";

const VendorPublic = (props) => {
  try {
    const token = localStorage.getItem('authTokens');
    if (token) {
      return <Navigate to="/vendor/dashboard" />;
    } else {
      return <Navigate to="/vendor/login" />;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default VendorPublic;
