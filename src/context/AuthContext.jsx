import React from "react";
import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import axiosInstance from "../axios/axios";

const AuthContext = createContext();

export default AuthContext;

// Authprovider
export const AuthProvider = ({ children }) => {
  const [userdetails, setUserdetails] = useState();
  // const [userProfile, setUserProfile] = useState("");

  const [partner, SetPartner] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );

  // Function to update user.partnername
  const updateUserPartnername = (newPartnername) => {
    setUser((prevUser) => ({
      ...prevUser,
      partnername: newPartnername,
    }));
  };

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

  const handleUserLogin = () => {
    console.log("handlepartnerlogin");
    setItspartner("False");
  };

  console.log("authToken in AuthProvider:", authToken);

  const loginWithGoogle = async (googleResponse) => {
  console.log("Google Response:", googleResponse);
  try {
    const user = jwtDecode(googleResponse.credential);
    console.log("Decoded User:", user.email);

    const axiosRes = await axiosInstance.post("/api/user/google-login/", {
      email: user.email,
    });

    console.log("Backend Response:", axiosRes);

    if (axiosRes.status === 201) {

      console.log("only:___",axiosRes?.data )
      console.log("only:___",axiosRes?.data.access )
      // Update authToken state
      setAuthToken(axiosRes?.data);

      // Update user state with the decoded user from the Google response
      setUser(jwtDecode(axiosRes?.data?.access));


      console.log("stringfy:__", "authToken",JSON.stringify(axiosRes?.data))
      // Store auth token in localStorage
      localStorage.setItem("authToken", JSON.stringify(axiosRes?.data));

      toast.success(`Welcome ${axiosRes?.data?.username}`);
      navigate("/");
    } else {
      console.error("Google login failed. Unexpected response:", axiosRes);
      toast.error("Google login failed. Please try again.");
    }
  } catch (error) {
    console.error("Error during Google login:", error);
    toast.error("Google login failed. Please try again.");
  }
};




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
        toast.error(
          "Invalid email or password. Please check your credentials and try again."
        );
      }

      if (response.status === 404) {
        toast.error(
          "Your account has been blocked. Please contact support for assistance."
        );
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
        console.log("local:____", JSON.stringify(data))
        localStorage.setItem("authTokens", JSON.stringify(data));

        toast.success("Login successful!");

        if (itspartner === "True") {
          navigate("/vendor/dashboard/");
        } else if (superuser === "True") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } else {
        toast.error(
          "Your account has been blocked or Not a member. Please contact support for assistance."
        );
      }
    } catch (error) {
      toast.error("Invalid Credentials. Please try again.");
      console.error("Error during login:", error);
    }
  };

  // logout function
  let logoutUser = () => {
    // Display a confirmation dialog using SweetAlert
    Swal.fire({
      title: "Logout Confirmation",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed logout
        setAuthToken(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        setItspartner("False");
        setSuperuser("False");
        navigate("/login");
        Swal.fire({
          title: "Logout Successful",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        // User canceled logout
        Swal.fire({
          title: "Logout Canceled",
          icon: "info",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  let contextData = {
    loginUser: loginUser,
    user: user,
    partner: partner,
    logoutUser: logoutUser,
    handlePartnerLogin: handlePartnerLogin,
    handleUserLogin: handleUserLogin,
    itspartner: itspartner,
    superuser: superuser,
    setSuperuser: setSuperuser,
    setUser: setUser,
    setPartner: SetPartner,
    setItspartner: setItspartner,
    userdetails: userdetails,
    updateUserPartnername: updateUserPartnername,
    loginWithGoogle: loginWithGoogle,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
