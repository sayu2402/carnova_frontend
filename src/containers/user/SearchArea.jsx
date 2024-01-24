import React, { useState } from "react";
import useGoogleMapApi from "../../CustomeHook/useGoogleMapAPI";
import { useFormik } from "formik";
import { Autocomplete } from "@react-google-maps/api";
import axiosInstance from "../../axios/axios";
import SearchResults from "./SearchResults";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SearchArea() {
  const { isLoaded } = useGoogleMapApi();
  const [cars, setCars] = useState([]);
  const [errorLocation, setErrorLocation] = useState("");
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
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
      pickupDate: "",
      returnDate: "",
    },
    onSubmit: async (values) => {
        try {
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
          toast.error(error.response?.data.message || "An error occurred");
        }finally {
          setLoading(false)
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
        setErrorLocation("");
        setFieldValue("location", place.formatted_address);
      } else {
        setErrorLocation("Invalid location");
      }
    });
  };

  return (
    <>
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(https://wallpapercave.com/wp/wp8762917.jpg)",
        }}
      >
        <div class="hero-overlay bg-opacity-60"></div>
        <div class="hero-content text-center text-neutral-content">
          <div class="max-w-md mx-auto mt-44">
            <h1 class="mb-5 text-5xl font-bold">Browse Cars</h1>
            <p class="mb-5">
              Explore Your Ride: Find the Perfect Companion for Your Next
              Adventure!
            </p>
            <form onSubmit={handleSubmit}>
              <div class="flex space-x-4 text-zinc-950">
                <div class="flex rounded-md overflow-hidden w-full">
                  <input
                    type="text"
                    class="w-full bg-slate-200 rounded-md rounded-r-none px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Search Car"
                  />
                  <button type="submit" class="btn btn-primary">
                    Search Car
                  </button>
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
                        class="bg-blue-500 text-white px-6 py-4 rounded-md hover:bg-blue-600 transition duration-300"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Display search results */}
      {cars.length > 0 && <SearchResults cars={cars} />}
    </div>
    </>
  );
}

export default SearchArea;
