import React, { useContext, useState } from "react";
import axiosInstance from "../../axios/axios";
import AuthContext from "../../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Loading from "../common/Loading";

const IDCardUpload = () => {
  const [frontPhoto, setFrontPhoto] = useState(null);
  const [backPhoto, setBackPhoto] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePhotoChange = (event, setter) => {
    setter(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("user_id", user.user_id);
    formData.append("front_photo", frontPhoto);
    formData.append("back_photo", backPhoto);

    try {
      await axiosInstance.post("/api/user/id-card/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        title: "Success!",
        text: "ID card uploaded successfully.",
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      });
      navigate(`/dashboard/${user.username}`);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Error uploading ID card. Please try again.",
        icon: "error",
        timer: 3000,
        showConfirmButton: false,
      });

      console.error("Error uploading ID card:", error);
    } finally {
    }
  };

  return (
    <>
      <div className="bg-slate-200 py-12">
        <h1 className="text-xl font-bold font-serif mb-4 text-center text-gray-900">
          Upload Driving License Here
        </h1>
        <h4 className="text-lg font-semibold text-center text-gray-800 mb-8">
          To ensure the safety and compliance of our rent-a-car service, we
          kindly request you to upload a picture of your valid driver's license.
          Rest assured, we prioritize the confidentiality of your personal
          information and do not share your profile details.
        </h4>

        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Front Photo
            </label>
            <input
              className="w-full text-lg border rounded-lg cursor-pointer py-2"
              type="file"
              accept="image/*"
              onChange={(e) => handlePhotoChange(e, setFrontPhoto)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Back Photo
            </label>
            <input
              className="w-full text-lg border rounded-lg cursor-pointer py-2"
              type="file"
              accept="image/*"
              onChange={(e) => handlePhotoChange(e, setBackPhoto)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Upload ID Card
          </button>
        </form>
      </div>
    </>
  );
};

export default IDCardUpload;
