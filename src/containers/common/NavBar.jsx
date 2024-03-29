import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function NavBar() {
  const { user, logoutUser, handlePartnerLogin, handleUserLogin, itspartner } =
    useContext(AuthContext);
  // console.log("user:", user);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const inboxLink = itspartner
    ? `/vendor/chat/inbox`
    : `/chat/inbox/${user?.username}`;

  return (
    <div className="navbar bg-black text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/browse-cars">Browse</Link>
            </li>

            <li>
              <Link>About Us</Link>
            </li>

            <li>
              <Link>Contact US</Link>
            </li>
            <li>
              <Link to={inboxLink}>Inbox</Link>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          Carnova.
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/browse-cars">Browse</Link>
          </li>

          <li>
            <Link>About US</Link>
          </li>
          <li>
            <Link>Contact US</Link>
          </li>
          <div className="indicator">
            {/* <span className="indicator-item badge badge-secondary">1</span> */}
            <Link
              to={inboxLink}
              className="text-white hover:text-gray-300 px-2 py-2"
            >
              Inbox
            </Link>
          </div>
        </ul>
      </div>
      <div className="navbar-end flex items-center space-x-4 ml-1">
        {user && user.role === "user" && (
          <Link to={`/dashboard/${user.username}`} className="mr-4">
            {user.username}
          </Link>
        )}

        {itspartner &&
          user &&
          user.partnername &&
          user.partnername.trim() !== "" && (
            <Link to={`/vendor/profile/${user.partnername}`} className="mr-4">
              {user.partnername}
            </Link>
          )}

        {user ? (
          <p>
            <Link to="#" onClick={logoutUser}>
              Logout
            </Link>
          </p>
        ) : (
          <>
            <div
              className="dropdown dropdown-bottom dropdown-end"
              onClick={toggleDropdown}
            >
              <div tabIndex={0} role="button" className="btn m-1">
                Login
              </div>
              {showDropdown && (
                <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  {" "}
                  <li>
                    <Link to="/login" onClick={handleUserLogin}>
                      User Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/vendor/login" onClick={handlePartnerLogin}>
                      Vendor Login
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;
