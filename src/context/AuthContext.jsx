import React from "react";
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const AuthContext = createContext();

export default AuthContext;

// Authprovider
export const AuthProvider = ({ children }) => {
  const [userdetails, setUserdetails] = useState();
  
  const [partner, SetPartner] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );

  let navigate = useNavigate();

  let [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );

  let [is_superuser, setIsSuperuser] = useState(false);
  const [itspartner, setItspartner] = useState("False");
  let [superuser, setSuperuser] = useState("False");

  const handlePartnerLogin = () => {
    console.log("handlepartnerlogin");
    setItspartner("True");
  };

  console.log("authToken in AuthProvider:", authToken);

  // login user function
  let loginUser = async (e) => {
    e.preventDefault();
    const email1 = e.target.email.value;
    const password1 = e.target.password.value;
    let url;

    if (superuser === "True") {
      // If superuser is 'True', use this URL
      url = "http://127.0.0.1:8000/api/adminlogin/";
    } else {
      // If not a superuser, check itspartner and choose the URL
      url =
        itspartner === "False"
          ? "http://127.0.0.1:8000/api/token/"
          : "http://127.0.0.1:8000/api/partnerlogin/";
    }

    try {
      const response = await axios.post(url, {
        email: email1,
        password: password1,
      });

      let data = response.data;

      if (response.status === 400) {
        Swal.fire({
          title: "Login Failed",
          text: "Invalid email or password. Please check your credentials and try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }

      if (response.status === 404) {
        Swal.fire({
          title: "Login Failed",
          text: "Your account has been blocked. Please contact support for assistance.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }

      if (response.status === 200) {
        setUserdetails(response.data);
        const decodedToken = jwtDecode(data.access);
        setIsSuperuser(decodedToken.is_superuser);

        if (decodedToken.is_superuser) {
          // The user is a superuser
          console.log("User is a superuser");
        } else {
          // The user is not a superuser
          console.log("User is not a superuser");
        }

        setAuthToken(data);
        setUser(jwtDecode(data.access));

        console.log(
          "data:.....username......partnername..",
          jwtDecode(data.access)
        );
        localStorage.setItem("authTokens", JSON.stringify(data));

        if (itspartner === "True") {
          navigate("/vendor/dashboard");
          // navigate("/vendor/dashboard");
        } else if (superuser === "True") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } else {
        Swal.fire({
          title: "Invalid Credentials",
          text: "Your account has been blocked or Not a member . Please contact support for assistance.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Invalid Credentials",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  // logout function
  let logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    setItspartner("False");
    setSuperuser("False");
    navigate("/");
  };


  let contextData = {
    loginUser: loginUser,
    user: user,
    partner: partner,
    logoutUser: logoutUser,
    handlePartnerLogin: handlePartnerLogin,
    itspartner: itspartner,
    superuser: superuser,
    setSuperuser: setSuperuser,
    setUser: setUser,
    userdetails: userdetails,
  };

  //   console.log("AuthProvider - Context Data:", contextData);
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
