import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import OtpPage from "../userPage/OtpPage";
import { Link } from "react-router-dom";

function SignupPartner() {
  const navigate = useNavigate();
  const [partner, setpartner] = useState("True");
  const [formname, setFormname] = useState("");
  const [formpassword1, setFormpassword1] = useState("");
  const [formpassword2, setFormpassword2] = useState("");
  const [formphno, setFormphno] = useState("");
  const [formemail, Setformemail] = useState("");
  const [itsuser, setItsuser] = useState("False");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setFormname(value);
    } else if (name === "password1") {
      setFormpassword1(value);
    } else if (name === "password2") {
      setFormpassword2(value);
    } else if (name === "email") {
      Setformemail(value);
    } else if (name === "number") {
      setFormphno(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formname.trim() === "") {
      return Swal.fire({
        title: "Error",
        text: "Enter username!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
    if (formemail.trim() === "") {
      return Swal.fire({
        title: "Error",
        text: "Enter email!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
    if (formphno.trim() === "") {
      return Swal.fire({
        title: "Error",
        text: "Enter phone no!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    if (formpassword1.trim() === "" || formpassword2.trim() === "") {
      return Swal.fire({
        title: "Error",
        text: "Enter a strong password!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    if (formpassword1 !== formpassword2) {
      return Swal.fire({
        title: "Error",
        text: "Passwords do not match",
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    let formData = {
      username: formname,
      email: formemail,
      password: formpassword1,
      phone_no: formphno,
    };

    let response = await fetch("http://127.0.0.1:8000/api/signup/otp/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: formData.email }),
    });

    let data = await response.json();
    console.log("hhhhhh", data);
    if (response.status === 200) {
      console.log("hhhhhh", data);
    }

    let formData1 = {
      username: formname,
      email: formemail,
      password: formpassword1,
      phone_no: formphno,
      otp: data.otp,
      itsuser: itsuser,
    };
    navigate("/otp", { state: { formData1 } });
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg')",
      }}
    >
      <form className="bg-white dark:bg-gray-800 p-8 rounded-md shadow-md max-w-xl w-full">
        <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
          Sign Up
        </h1>
        <div className="mb-6">
          <label
            htmlFor="first_name"
            className="block text-sm font-medium text-gray-900 dark:text-white text-base px-4"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            className="input-field h-10 input-field w-full text-base px-4"
            placeholder="Enter First Name"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            className="input-field h-10 input-field w-full text-base px-4"
            placeholder="Enter Email"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="number"
            name="number"
            onChange={handleChange}
            className="input-field h-10 input-field w-full text-base px-4"
            placeholder="Enter Phone Number"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-800 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password1"
            name="password1"
            onChange={handleChange}
            className="input-field h-10 w-full placeholder-opacity-50 text-base px-4"
            placeholder="Enter Password"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password2"
            className="block text-sm font-medium text-gray-800 dark:text-white"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="password2"
            name="password2"
            onChange={handleChange}
            className="input-field h-10 w-full placeholder-opacity-50 text-base px-4"
            placeholder="Confirm Password"
            required
          />
        </div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Already have an account?
            </span>{" "}
            <Link
              to="/login"
              className="text-blue-500 hover:underline font-medium"
            >
              Log In
            </Link>
          </div>
        </div>
        <button type="submit" className="submit-button" onClick={handleSubmit}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupPartner;
