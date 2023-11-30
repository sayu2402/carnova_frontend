import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";


function VendorOtp() {
  const [otp, setOtp] = useState("");
  //find who partner or user

  const navigate = useNavigate();
  const location = useLocation();
  const formData1 = location.state && location.state.formData1;

  const otpverification = async (e) => {  
    e.preventDefault(); // Prevent the default form submission behavior

    
    if (otp === formData1.otp) {
      try {

        const response = await fetch(
          formData1.itsuser === "True"
            ? "http://127.0.0.1:8000/api/signup/"
            : "http://127.0.0.1:8000/api/Partnersignup/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData1),
          }
        );

        if (response.status === 201) {
          console.log("data", response);
          Swal.fire({
            title: "Success",
            text: "Account created successfully!",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/vendor/login");
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "Email or User Already Exist",
            icon: "error",
            confirmButtonText: "OK",
          });
          navigate("/vendor/signup");
        }
      } catch (error) {
        return "";
      }
    }
  };

  return (
    
    <div className="flex items-center justify-center min-h-screen bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg')",
      }}>
      <form
        className="bg-white dark:bg-gray-800 p-8 rounded-md shadow-md max-w-xl w-full"
        onSubmit={(e) => {
          otpverification(e);
        }}
      >
        <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
          Enter OTP
        </h1>
        <div className="mb-6">
          <label
            htmlFor="otp"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >
            OTP
          </label>
          <input
            type="text"
            id="otp"
            name="otp"
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            className="input-field h-10 w-full placeholder-opacity-50"
            placeholder="Enter OTP"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default VendorOtp;
