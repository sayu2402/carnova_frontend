import React, { useContext } from "react";
import { useFormik } from "formik";
import CarValidation from "./CarValidation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../axios/axios";
import AuthContext from "../../context/AuthContext";

function AddCar() {
  const navigate = useNavigate();
  const {user} = useContext(AuthContext)
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

    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      if (key === "document" || key === "car_photo") {
        formData.append(key, values[key]);
      } else {
        formData.append(key, values[key]);
      }
    });

    console.log("formData:", formData);

    try {
      const response = await axiosInstance.post(
        `/api/vendor/add-car/${user.user_id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Make sure to set the content type
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

  return (
    <>
      <section class="bg-slate-200 dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Add a new Car
          </h2>
          <form onSubmit={handleSubmit}>
            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div class="sm:col-span-2">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Car Name
                </label>
                <input
                  type="text"
                  name="car_name"
                  id="name"
                  {...getFieldProps("car_name")}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name"
                  required=""
                />
                {errors.car_name && touched.car_name && (
                  <p className="text-red-600">{errors.car_name}</p>
                )}
              </div>
              <div class="w-full">
                <label
                  for="brand"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  {...getFieldProps("brand")}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Car brand"
                  required=""
                />
                {errors.brand && touched.brand && (
                  <p className="text-red-600">{errors.brand}</p>
                )}
              </div>
              <div class="w-full">
                <label
                  for="price"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  {...getFieldProps("price")}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="₹2999"
                  required=""
                />
                {errors.price && touched.price && (
                  <p className="text-red-600">{errors.price}</p>
                )}
              </div>
              <div>
                <label
                  for="category"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <select
                  id="transmission"
                  {...getFieldProps("transmission")}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Select transmission</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
              <div>
                <label
                  for="fuel"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Fuel Type
                </label>
                <select
                  id="fuel"
                  {...getFieldProps("fuel_type")}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Select Fuel Type</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>
              <div class="w-full">
                <label
                  for="brand"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  {...getFieldProps("location")}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Car brand"
                  required=""
                />
                {errors.location && touched.location && (
                  <p className="text-red-600">{errors.location}</p>
                )}
              </div>
              <div>
                <label
                  for="model"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Model
                </label>
                <select
                  id="model"
                  {...getFieldProps("model")}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Select Model</option>
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
              <div class="sm:col-span-2">
                <label
                  for="description"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows="8"
                  {...getFieldProps("description")}
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your description here"
                ></textarea>
                {errors.description && touched.description && (
                  <p className="text-red-600">{errors.description}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              // onClick={() => onSubmit()}
              class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
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
