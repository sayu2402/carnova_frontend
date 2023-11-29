import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";


function Login() {
  

  let { user, loginUser,itspartner } = useContext(AuthContext);
  console.log("itspartner",itspartner)
  console.log("itsuser:___", loginUser)
  console.log("user:____________________________________", user)


  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg')",
      }}>
      <form  className="bg-Black dark:bg-gray-800 bg-opacity-20 p-8 rounded-md shadow-md max-w-xl w-full"
            onSubmit={loginUser}>
        <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
          Login Here
        </h1>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="input-field h-10 input-field w-full text-base px-4"
            placeholder="Enter Your Email"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-800 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="input-field h-10 w-full placeholder-opacity-50 text-base px-4"
            placeholder="Enter Your Password"
            required
          />
        </div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <a
              href="#forgot-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot Password?
            </a>
          </div>
          <div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Don't have an account?
            </span>{" "}
            {itspartner === "True" ? ( 
              <Link to="/vendor/signup">Sign Up Here</Link>
            ) : (
              <Link to="/Signup">Sign Up Here</Link>
            )}
          </div>
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};


export default Login;
