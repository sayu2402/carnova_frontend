import { useEffect } from "react";
import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";

function Adminlogin() {
  const { loginUser, superuser, setSuperuser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const handleLoginAdmin = (e) => {
    e.preventDefault();
    if (superuser === "False") {
      setSuperuser("True");
    }
    console.log("superuser", superuser);
    loginUser(e);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg')",
      }}
    >
      <form
        className="bg-Black dark:bg-gray-800 bg-opacity-20 p-8 rounded-md shadow-md max-w-xl w-full"
        onSubmit={handleLoginAdmin}
      >
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

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Adminlogin;
