import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";

function VendorProfile() {
    const {user} = useContext(AuthContext)
    console.log("username___________: ", user.partnername)
  return (
    <div
      className="bg-cover h-screen flex items-center"
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/404190/pexels-photo-404190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
      }}
    >
      <div className="text-white text-4xl font-bold p-8">
        <div>Welcome</div>
        <div>{user.partnername}</div>
      </div>
    </div>
  );
}

export default VendorProfile;
