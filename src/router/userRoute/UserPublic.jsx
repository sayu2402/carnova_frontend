import { Navigate } from "react-router-dom";

const UserPublic = (props) => {
  try {
    const token = localStorage.getItem('authTokens');
    if (token) {
      return <Navigate to="/user/dashboard" />;
    } else {
      return <Navigate to="/user/login" />;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default UserPublic;
