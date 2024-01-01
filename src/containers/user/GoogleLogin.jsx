import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";

function Google() {
    const navigate = useNavigate();
    const { loginUser , loginWithGoogle } = useContext(AuthContext);
    
  
    const handleLogin = async (response) => {
      loginWithGoogle(response);
    };
  
    return (
      <GoogleLogin
        onSuccess={handleLogin}
        onError={(error) => {
          console.error("Login Failed:", error);
        }}
      />
    );
  }
  
  export default Google;