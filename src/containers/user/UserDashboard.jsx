import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../../axios/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../common/Loading";

function UserDashboard() {
  const [formname, setFormname] = useState("");
  const [formphno, setFormphno] = useState("");
  const [formmail, setFormEmail] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setChangePasswordModalOpen] =
    useState(false);
  const [userProfile, setUserProfile] = useState("");

  const { user, setUser, setItspartner } = useContext(AuthContext);
  const [loading, setLoading] = useState(true)

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setFormname(value);
    } else if (name === "contact") {
      setFormphno(value);
    } else if (name === "email") {
      setFormEmail(value);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/user/userprofile/${user.user_id}`
        );
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }finally{
        setLoading(false)
      }
    };

    fetchUserProfile();
  }, []);

  // function for change the password
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    const currentPassword = e.target.elements.currentPassword.value;
    const newPassword = e.target.elements.newPassword.value;
    const newPassword2 = e.target.elements.newPassword2.value;

    const formData = {
      current_password: currentPassword,
      new_password: newPassword,
      confirm_password: newPassword2,
    };

    if (newPassword !== newPassword2) {
      Swal.fire({
        title: "Error",
        text: "New passwords do not match",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      // API endpoint for changing the password
      const response = await axiosInstance.post(
        `/api/user/change-password/${user.user_id}/`,
        formData,
        {
          current_password: currentPassword,
          new_password: newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        toast.success("Password changed successfully!");
        closeChangePasswordModal();
      } else {
        if (response.status <= 400) {
          toast.error("Current password is incorrect.");
        } else {
          toast.error(response.data.error || "Something went wrong!");
        }
      }
    } catch (error) {
      const serverMessage = error.response.data.message;

      toast.error(serverMessage || "Current password is incorrect.");
    }
  };


  // for handling the submit for edit profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (formname.trim() !== "") {
      formData.append("username", formname);
    }

    if (formmail.trim() !== "") {
      formData.append("email", formmail);
    }

    if (formphno.trim() !== "") {
      formData.append("phone_no", formphno);
    }

    try {
      let response = await fetch(
        `https://car.gotashoess.online/api/user/user-edit/${user.user_id}/`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        // Update the state only if the API call is successful
        setUserProfile((prevProfile) => ({
          ...prevProfile,
          username: formname.trim() !== "" ? formname : prevProfile.username,
          email: formmail.trim() !== "" ? formmail : prevProfile.email,
          phone_no: formphno.trim() !== "" ? formphno : prevProfile.phone_no,
        }));

        // Update the user object in AuthContext
        setUser((prevUser) => ({
          ...prevUser,
          username: formname.trim() !== "" ? formname : prevUser.username,
          email: formmail.trim() !== "" ? formmail : prevUser.email,
          phone_no: formphno.trim() !== "" ? formphno : prevUser.phone_no,
        }));


        toast.success("Account Updated successfully!");
        closeModal();
      } else {
        // Handle error
        const errorData = await response.json();
        toast.error(errorData.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const openChangePasswordModal = () => {
    setChangePasswordModalOpen(true);
  };

  const closeChangePasswordModal = () => {
    setChangePasswordModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
    {loading && <Loading />}
      <div
        className="bg-cover h-screen flex items-center"
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/248747/pexels-photo-248747.jpeg")',
        }}
      >
        <div className="text-white text-6xl font-bold p-20">
          <div className="font-serif text-stone-50">MY ACCOUNT</div>
          <div>
            <Link
              to="/"
              className="text-green-400 font-family: ui-serif text-2xl"
            >
              Home |
            </Link>
            <Link
              to="/"
              className="text-green-400 font-family: ui-serif text-2xl"
            >
              {" "}
              Browse{" "}
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-slate-200 flex items-center flex-col pt-12">
        <p className="font-sans text-6xl text-black text-center font-bold mb-2">
          {" "}
          {userProfile.username?.toUpperCase()}{" "}
        </p>
        <p className="text-center">
          Mail: {userProfile.email} <span className="mr-4"></span> Phone:{" "}
          {userProfile.phone_no}
        </p>
      </div>

      <div className="bg-slate-200 flex items-center justify-end py-5">
        <div className="py-0">
          <Link to={`/dashboard/${user.username}/booking-details`}
            type="button"
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Order History
          </Link>

          <Link to={`/dashboard/${user.username}/id-card-upload`}
            type="button"
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            ID Card
          </Link>

          <button
            type="button"
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={openModal}
          >
            Edit Profile
          </button>

          <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={openChangePasswordModal}
          >
            Change Password
          </button>
        </div>
      </div>

      {/* --------------------------------------------Edit Profile Modal Start------------------------------------------- */}

      {isModalOpen && (
        <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-8 sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-5 dark:bg-gray-800 dark:border-gray-700">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Change Username
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="eg : sayooj"
                    // required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Change Email
                  </label>
                  <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                    // required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Change Phone
                  </label>
                  <input
                    onChange={handleChange}
                    type="tel"
                    name="contact"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="1234567890"
                    // required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Save
                </button>
              </form>
            </div>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------Edit Profile Modal End ----------------------------------------------- */}

      {/* -----------------------------------------Reset Password Modal Start-------------------------------------------- */}

      {/* Change Password Modal */}
      {isChangePasswordModalOpen && (
        <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-8 sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Change Password</h2>
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-5 dark:bg-gray-800 dark:border-gray-700">
              <form className="space-y-4" onSubmit={handlePasswordChange}>
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    id="currentPassword"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Enter current password"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Enter new password"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="newPassword2"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="newPassword2"
                    id="newPassword2"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Confirm Password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Save
                </button>
              </form>
            </div>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              onClick={closeChangePasswordModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* ---------------------------------------Reset Password Modal End----------------------------------------------- */}
    </>
  );
}

export default UserDashboard;
