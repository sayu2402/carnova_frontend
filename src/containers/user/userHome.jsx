import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import useGoogleMapApi from "../../CustomeHook/useGoogleMapAPI";
import { useFormik } from "formik";
import { Autocomplete } from "@react-google-maps/api";
import axiosInstance from "../../axios/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchValidation from "./CarSearchValidation";

function Home() {
  const { user, itspartner } = useContext(AuthContext);
  const { isLoaded } = useGoogleMapApi();
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [location, setLocation] = useState("");
  const [latestCars, setLatestCars] = useState([]);
  const [errorLocation, setErrorLocation] = useState("");
  const {
    values,
    errors,
    touched,
    getFieldProps,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: {
      location: "",
    },
    onSubmit: async (values) => {
      try {
        await SearchValidation.validate(values, { abortEarly: false });

        // Additional date-related validations
        const { pickupDate, returnDate } = values;

        const today = new Date();
        const selectedPickupDate = new Date(pickupDate);
        const selectedReturnDate = new Date(returnDate);

        console.log("today", today);

        if (selectedPickupDate <= today) {
          toast.error("Pickup date must be today or in the future");
          return;
        }

        if (selectedReturnDate <= selectedPickupDate) {
          toast.error("Return date must be greater than pickup date");
          return;
        }

        const response = await axiosInstance.post(
          "/api/user/search-location",
          values
        );

        if (response.data.matching_cars.length === 0) {
          // No cars available, show toast
          toast.error("No cars available for the selected criteria");
        } else {
          setCars(response.data.matching_cars);
          navigate("/search-results");
        }
      } catch (error) {
        setCars([]);

        if (error.name === "ValidationError") {
          // Handle Yup validation errors
          const validationErrors = {};
          error.inner.forEach((err) => {
            validationErrors[err.path] = err.message;
          });

          // Display validation errors in toasts
          Object.entries(validationErrors).forEach(([field, errorMessage]) => {
            toast.error(`${field}: ${errorMessage}`);
          });
        } else if (error.response) {
          const { status, data } = error.response;
          if (status === 400) {
            // Handle server validation errors
            toast.error(data.message || "Validation error");
          } else {
            // Handle server errors
            toast.error(data.message || "An error occurred");
          }
        } else if (error.request) {
          toast.error("No response received from the server");
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    },
  });

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
        // Set other form values if needed
        setFieldValue("location", place.formatted_address);
      } else {
        setErrorLocation("Invalid location");
      }
    });
  };

  // prevent loged in user from going back
  useEffect(() => {
    if (user || itspartner) {
      navigate("/");
    }
  }, [user, itspartner, navigate]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axiosInstance.get("api/user/latest-cars");
        console.log("responce in latest", response);
        setLatestCars(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCars();
  }, []);

  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(https://wallpapercave.com/wp/wp8762917.jpg)",
        }}
      >
        <div class="hero-overlay bg-opacity-60"></div>
        <div class="hero-content text-center text-neutral-content">
          <div class="max-w-md mx-auto mt-44">
            <h1 class="mb-5 text-5xl font-bold">Hello there</h1>
            <p class="mb-5">
              Unlock the road to freedom with our hassle-free car rentals, where
              every journey becomes an unforgettable adventure.
            </p>
            <form onSubmit={handleSubmit}>
              <div class="flex space-x-4 text-zinc-950">
                <div class="flex rounded-md overflow-hidden w-full">
                  <input
                    type="text"
                    class="w-full bg-slate-200 rounded-md rounded-r-none px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Search Car"
                  />
                  <button class="btn btn-primary">Search Car</button>
                </div>
              </div>
              <div class="p-8 rounded-md shadow-md pt-10 sm:pt-20 md:pt-40">
                <div class="flex flex-col items-center space-y-4">
                  <div class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <div>
                      <label for="location" class="text-gray-600">
                        Location:
                      </label>
                      {isLoaded && (
                        <Autocomplete onLoad={handlePlaceSelect}>
                          <input
                            type="text"
                            name="location"
                            id="location"
                            placeholder="Search By Location..."
                            value={values.location}
                            className="bg-white text-gray-800 border px-4 py-4 rounded-md w-full sm:w-96 focus:outline-none focus:ring focus:border-blue-500"
                            {...getFieldProps("location")}
                          />
                        </Autocomplete>
                      )}
                      {errors.location && touched.location && (
                        <p className="text-red-500">{errors.location}</p>
                      )}
                    </div>
                    <div>
                      <label for="pickupDate" class="text-gray-600">
                        Pickup Date:
                      </label>
                      <input
                        type="date"
                        id="pickupDate"
                        class="bg-white text-gray-800 border px-4 py-4 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                        {...getFieldProps("pickupDate")}
                      />
                    </div>
                    <div>
                      <label for="returnDate" class="text-gray-600">
                        Return Date:
                      </label>
                      <input
                        type="date"
                        id="returnDate"
                        class="bg-white text-gray-800 border px-4 py-4 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                        {...getFieldProps("returnDate")}
                      />
                    </div>
                    <div className="pt-5">
                      <button
                        type="submit"
                        disabled={!isLoaded || Object.keys(errors).length > 0}
                        className="bg-blue-500 text-white px-6 py-4 rounded-md hover:bg-blue-600 transition duration-300"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </form>
          </div>
        </div>
      </div>

      <div className="bg-white py-8 px-4">
        <h2 className="text-3xl font-bold font-serif mb-6 text-center text-black">
          Only 3 Steps to Become Our Member
        </h2>
        <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
          <li className="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
            <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              Login{" "}
              {/* <span className="hidden sm:inline-flex sm:ms-2">Info</span> */}
            </span>
          </li>
          <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
            <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
              <span className="me-2">2</span>
              Browse <span className="hidden sm:inline-flex sm:ms-2">Cars</span>
            </span>
          </li>
          <li className="flex items-center">
            <span className="me-2">3</span>
            Payment
          </li>
        </ol>
      </div>

      <div className="bg-white py-8 pl-8">
        <ol className="relative border-s border-gray-200 dark:border-gray-700">
          <li className="mb-10 ms-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />
            <time className="mb-1 text-sm font-normal leading-none text-black dark:text-black">
              Features
            </time>
            <h3 className="text-lg font-semibold text-black dark:text-white">
              Introducing Dynamic Car Selection
            </h3>
            <p className="mb-4 text-base font-normal text-black dark:text-black">
              Explore our latest feature – a dynamic car selection system that
              allows you to browse and choose from a diverse fleet of vehicles,
              including sedans, SUVs, and more. Whether you're planning a family
              trip or a solo adventure, our extensive range of vehicles ensures
              there's a perfect match for every journey.
            </p>
            <Link
              to="/browse-cars"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-black bg-blue-500 border border-blue-500 rounded-lg hover:bg-blue-600 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              Browse Our Cars{" "}
              <svg
                className="w-3 h-3 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          </li>
          <li className="mb-10 ms-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />
            <time className="mb-1 text-sm font-normal leading-none text-black dark:text-black">
              Booking System
            </time>
            <h3 className="text-lg font-semibold text-black dark:text-white">
              Seamless Booking Experience
            </h3>
            <p className="text-base font-normal text-black dark:text-black">
              Our user-friendly booking system ensures a seamless experience
              from reservation to pick-up, making it easier than ever to rent a
              car tailored to your needs. With a straightforward and efficient
              process, you can reserve your desired vehicle in just a few
              clicks, leaving you more time to focus on planning your journey.
            </p>
          </li>
          <li className="ms-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />
            <time className="mb-1 text-sm font-normal leading-none text-black dark:text-black">
              Payment System
            </time>
            <h3 className="text-lg font-semibold text-black dark:text-white">
              Explore Exciting Discounts
            </h3>
            <p className="text-base font-normal text-black dark:text-black">
              This month, discover exclusive discounts on rental rates. Enjoy
              the journey with savings and experience the convenience of our
              top-notch car rental services. From seasonal promotions to loyalty
              rewards, we strive to make your travels not only enjoyable but
              also affordable. Don't miss out on the chance to save on your next
              adventure.
            </p>
          </li>
        </ol>
      </div>

      <div className="bg-emerald-50 py-16">
        <h2 className="text-3xl font-bold font-serif mb-6 text-center text-black">
          Latest Cars
        </h2>
        <div className="text-center mb-6 text-black">
          Check out our latest collection of premium cars. Each car is carefully
          selected to offer you the best driving experience.
        </div>
        <div className="flex flex-wrap justify-center">
          {latestCars.map((car) => (
            <div
              key={car.id}
              className="flex-shrink-0 max-w-sm m-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <a
                href={car.car_photo}
                className="block h-48 overflow-hidden rounded-t-lg"
              >
                <img
                  className="object-cover w-full h-full"
                  src={car.car_photo}
                  alt={`Photo of ${car.car_name}`}
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {car.car_name} - {car.brand}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Price: ${car.price}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Location: {car.location}
                </p>
                <Link
                  to={`/browse-car/${car.id}`}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Know more
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
