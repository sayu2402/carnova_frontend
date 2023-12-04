import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [itsuser, setUser] = useState("True");
  const [formname, setFormname] = useState("");
  const [formpassword1, setFormpassword1] = useState("");
  const [formpassword2, setFormpassword2] = useState("");
  const [formphno, setFormphno] = useState("");
  const [formemail, Setformemail] = useState("");

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

    if (isNaN(formphno) || formphno.toString().trim() === "") {
      return Swal.fire({
        title: "Error",
        text: isNaN(formphno)
          ? "Enter a valid Mobile no!"
          : "Enter a Mobile no!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    if (formpassword1.length < 6) {
      return Swal.fire({
        title: "Error",
        text: "Password must be at least 6 characters long!",
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
      className="flex items-center justify-center h-screen bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg')",
      }}
    >
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-2">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign in to our platform
          </h5>

          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Username
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="eg: sayooj"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="number"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone Number
            </label>
            <input
              type="tel"
              name="number"
              id="number"
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="eg: 1234567890"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password1"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              password
            </label>
            <input
              type="password"
              name="password1"
              id="password1"
              onChange={handleChange}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password2"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm password
            </label>
            <input
              type="password"
              name="password2"
              id="password2"
              onChange={handleChange}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleSubmit}
          >
            Login to your account
          </button>

          {/* <button
            onClick={handleGoogleLogin}
            className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Login with Google
          </button> */}

          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Have Account?{" "}
            <Link
              to="/login"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Login Here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
