import React, { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../../axios/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditProfileModal from "./EditProfileModal";
import ChangePasswordModal from "./EditPasswordModal";
import Loading from "../common/Loading";

const VendorProfile = React.memo(() => {
  const [formname, setFormname] = useState("");
  const [formphno, setFormphno] = useState("");
  const [formmail, setFormEmail] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setChangePasswordModalOpen] =
    useState(false);
  const [vendorProfile, setVendorProfile] = useState("");
  const [loading, setLoading] = useState(true);
  const { user, setUser, updateUserPartnername } =
    useContext(AuthContext);
  const navigate = useNavigate();

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

  const handlePasswordChange = useCallback(
    async (e) => {
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
        // console.log("Before API call");
        // API endpoint for changing the password
        const response = await axiosInstance.post(
          `/api/vendor/change-password/${user.user_id}/`,
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
      } finally {
        setLoading(false);
      }
    },
    [axiosInstance, user.user_id]
  );

  // for updating data of vendor
  useEffect(() => {
    const fetchVendorProfile = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/vendor/vendor-profile/${user.user_id}`
        );
        setVendorProfile(response.data);
      } catch (error) {
        console.error("Error fetching vendor profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVendorProfile();
  }, []);


  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // console.log("Form Values:", formname, formmail, formphno);

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

      // console.log("FormData:", formData);

      try {
        let response = await fetch(
          `http://127.0.0.1:8000/api/vendor/vendor-edit/${user.user_id}/`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          // Update the state only if the API call is successful
          setVendorProfile((prevProfile) => ({
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

          if (user.partnername !== formname.trim()) {
            updateUserPartnername(formname.trim());
          }

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
    },
    [
      axiosInstance,
      formmail,
      formname,
      formphno,
      navigate,
      setUser,
      updateUserPartnername,
      user,
      closeModal,
      toast,
    ]
  );

  // console.log("user", user);

  return (
    <>
      {loading ? (
        <Loading /> // Render the Loading component while data is being fetched
      ) : (
        <>
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
            {vendorProfile.username ? (
              <>
                <p className="font-sans text-6xl text-black text-center font-bold mb-2">
                  {vendorProfile.username.toUpperCase()}
                </p>
                <p className="text-center">
                  Mail: {vendorProfile.email} <span className="mr-4"></span>{" "}
                  Phone: {vendorProfile.phone_no}
                </p>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>

          <div className="bg-slate-200 flex items-center justify-end py-5">
            <div className="py-0">
              <Link
                to={`/vendor/profile/${user.partnername}`}
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Dashboard
              </Link>

              <Link
                to={`/vendor/profile/${user.partnername}/car-details`}
                type="button"
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                My Cars
              </Link>

              <Link
                to={`/vendor/profile/${user.partnername}/add-car`}
                type="button"
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Add New Car
              </Link>

              <Link
                to={`/vendor/profile/${user.partnername}/booking-list`}
                type="button"
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Booking History
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
              <EditProfileModal
                closeModal={closeModal}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                formname={formname}
                formmail={formmail}
                formphno={formphno}
              />
            </div>
          )}

          {/* ------------------------------------------Edit Profile Modal End ----------------------------------------------- */}

          {/* -----------------------------------------Reset Password Modal Start-------------------------------------------- */}

          {/* Change Password Modal */}
          {isChangePasswordModalOpen && (
            <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black bg-opacity-75">
              <ChangePasswordModal
                closeChangePasswordModal={closeChangePasswordModal}
                handlePasswordChange={handlePasswordChange}
              />
            </div>
          )}
          {/* ---------------------------------------Reset Password Modal End----------------------------------------------- */}
        </>
      )}
    </>
  );
});

export default VendorProfile;
