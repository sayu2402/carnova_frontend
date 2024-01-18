import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import CarValidation from "./CarValidation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axiosInstance from "../../axios/axios";
import AuthContext from "../../context/AuthContext";
import { Autocomplete } from "@react-google-maps/api";
import useGoogleMapApi from "../../CustomeHook/useGoogleMapAPI";

function AddCar() {
  const { isLoaded } = useGoogleMapApi();
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [errorLocation, setErrorLocation] = useState("");
  const { user } = useContext(AuthContext);
  const {
    values,
    errors,
    touched,
    getFieldProps,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: {
      car_name: "",
      location: "",
      brand: "",
      price: "",
      fuel_type: "",
      transmission: "",
      model: "",
      description: "",
      car_photo: null,
      document: null,
      is_available: false,
      verification_status: "Pending",
    },
    validationSchema: CarValidation,
    onSubmit,
  });

  const imagedocument = (e) => {
    const file = e.target.files[0];
    setFieldValue("document", file);
  };

  const carimage = (e) => {
    const file = e.target.files[0];
    setFieldValue("car_photo", file);
  };

  async function onSubmit() {
    console.log("onSubmit called");
    console.log("is_blocked", values)

    if (values.is_blocked) {
      // Show SweetAlert for blocked vendor
      Swal.fire({
        icon: "error",
        title: "Blocked Vendor",
        text: "Blocked vendor can't add cars",
      });
      return;
    }

    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      if (
        key === "document" ||
        key === "car_photo" ||
        key === "verification_status"
      ) {
        formData.append(key, values[key]);
      } else {
        formData.append(key, values[key]);
      }
    });

    formData.append("is_available", String(values.is_available));

    try {
      const response = await axiosInstance.post(
        `/api/vendor/add-car/${user.user_id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        toast.success("updated successfully", { theme: "dark" });
        navigate(`/vendor/profile/${user.partnername}`);
      } else {
        toast.error("server error", { theme: "dark" });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred", { theme: "dark" });
    }
  }

  const handlePlaceSelect = () => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById("location"),
      {
        componentRestrictions: { country: "IN" },
        types: ["(cities)"],
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place && place.formatted_address) {
        setLocation(place.formatted_address);
        setErrorLocation("");
        setFieldValue("location", place.formatted_address);
      } else {
        setErrorLocation("Invalid location");
      }
    });
  };

  useEffect(() => {
    if (isLoaded) {
      handlePlaceSelect();
    }
  }, [isLoaded]);


  return (
    <>
      <section className="bg-slate-200 dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Add a new Car
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Car Name
                </label>
                <input
                  type="text"
                  name="car_name"
                  id="name"
                  {...getFieldProps("car_name")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name"
                  required=""
                />
                {errors.car_name && touched.car_name && (
                  <p className="text-red-600">{errors.car_name}</p>
                )}
              </div>
              <div className="w-full">
                <label
                  htmlFor="brand"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  {...getFieldProps("brand")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Car brand"
                  required=""
                />
                {errors.brand && touched.brand && (
                  <p className="text-red-600">{errors.brand}</p>
                )}
              </div>
              <div className="w-full">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  {...getFieldProps("price")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="₹2999"
                  required=""
                />
                {errors.price && touched.price && (
                  <p className="text-red-600">{errors.price}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <select
                  id="transmission"
                  {...getFieldProps("transmission")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option defaultValue="">Select transmission</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="fuel"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Fuel Type
                </label>
                <select
                  id="fuel"
                  {...getFieldProps("fuel_type")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option defaultValue="">Select Fuel Type</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>
              <div className="w-full">
                <label
                  htmlFor="brand"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Location
                </label>
                {isLoaded && (
                  <Autocomplete onLoad={handlePlaceSelect}>
                    <input
                      type="text"
                      name="location"
                      id="location"
                      value={values.location}
                      {...getFieldProps("location")}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Search Loaction"
                      required=""
                    />
                  </Autocomplete>
                )}
                {errors.location && touched.location && (
                  <p className="text-red-600">{errors.location}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="model"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Model
                </label>
                <select
                  id="model"
                  {...getFieldProps("model")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option defaultValue="">Select Model</option>
                  <option value="Premium">Premium</option>
                  <option value="Medium">Medium</option>
                  <option value="Normal">Normal</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="photos"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Car Photos
                </label>
                <input
                  type="file"
                  name="car_photo"
                  onChange={carimage}
                  id="photos"
                  accept="image/*"
                  multiple
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              {errors.carimage && touched.carimage && (
                <p className="text-red-600">{errors.carimage}</p>
              )}
              <div className="sm:col-span-2">
                <label
                  htmlFor="documents"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Car Documents
                </label>
                <input
                  type="file"
                  name="document"
                  id="documents"
                  onChange={imagedocument}
                  accept="image"
                  multiple
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
                {errors.document && touched.document && (
                  <p className="text-red-600">{errors.document}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="isAvailable"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Is Available
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="is-availableYes"
                      name="is_available"
                      onChange={() => setFieldValue("is_available", true)}
                      checked={values.is_available === true}
                      className="form-radio text-primary-600"
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="isAvailableNo"
                      name="is_available"
                      onChange={() => setFieldValue("is_available", false)}
                      checked={values.is_available === false}
                      className="form-radio text-primary-600"
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows="8"
                  {...getFieldProps("description")}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your description here"
                ></textarea>
                {errors.description && touched.description && (
                  <p className="text-red-600">{errors.description}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Add product
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default AddCar;
