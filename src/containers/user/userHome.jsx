import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useGoogleMapApi from "../../CustomeHook/useGoogleMapAPI";
import { useFormik } from "formik";
import { Autocomplete } from "@react-google-maps/api";
function Home() {
  const { user, itspartner } = useContext(AuthContext);
  const { isLoaded } = useGoogleMapApi();
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
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
    // onSubmit,
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

  return (
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
                <input
                  type="date"
                  class="bg-white text-gray-800 border px-4 py-4 rounded-md focus:outṭline-none focus:ring focus:border-blue-500"
                />
                <input
                  type="date"
                  class="bg-white text-gray-800 border px-4 py-4 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
                <button class="bg-blue-500 text-white px-4 py-4 rounded-md hover:bg-blue-600 transition duration-300">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
