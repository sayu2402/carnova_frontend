import { Navigate } from "react-router-dom";

const AdminPublic = (props) => {
  try {
    const token = localStorage.getItem('authTokens');
    if (token) {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/admin/admin-login" />;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default AdminPublic;
