import { useEffect } from "react";
import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import Loading from "../common/Loading";

function Adminlogin() {
  const { loginUser, superuser, setSuperuser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const handleLoginAdmin = (e) => {
    e.preventDefault();
    if (superuser === "False") {
      setSuperuser("True");
    }
    // console.log("superuser", superuser);
    loginUser(e);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <Loading />}
      <div
        className="flex items-center justify-center h-screen bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg')",
        }}
      >
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleLoginAdmin}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Log in to our platform
            </h5>
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login to your account
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Adminlogin;
