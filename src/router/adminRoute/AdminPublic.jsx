import { Navigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

 const AdminPublic = (props) => {

  const authToken = useContext(AuthContext)
  try {
    const token =  localStorage.getItem('authToken')
    if(token){
      return <Navigate to="/admin/dashboard"/>
    }else{
      <Navigate to="/admin/login"/>
      return props.children
    }
  } catch (error) {
    console.log(error.message)
  }
}
export default AdminPublic;
