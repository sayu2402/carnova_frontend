import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
const baseURL = process.env.REACT_APP_BASE_URL



function OtpPage() {
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
            ? `${baseURL}/api/signup/`
            : `${baseURL}/api/Partnersignup/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData1),
          }
        );

        if (response.status === 201) {
          Swal.fire({
            title: "Success",
            text: "Account created successfully!",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/login");
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "Email or User Already Exist",
            icon: "error",
            confirmButtonText: "OK",
          });
          navigate("/signup");
        }
      } catch (error) {
        return "";
      }
    }
  };

  return (
    
    <div
    className="flex items-center justify-center h-screen bg-cover bg-no-repeat bg-center"
    style={{
      backgroundImage:
        "url('https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg')",
    }}
  >
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form className="space-y-6"
      onSubmit={(e) => {
        otpverification(e);
      }}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Check Your Email For OTP
        </h5>
        
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            OTP 
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            placeholder="••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
         Submit OTP
        </button>
       
      </form>
    </div>
  </div>
  );
}

export default OtpPage;
