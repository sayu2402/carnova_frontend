import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import axiosInstance from "../../axios/axios";
import { Autocomplete } from "@react-google-maps/api";
import useGoogleMapApi from "../../CustomeHook/useGoogleMapAPI";
import { useFormik } from "formik";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const BrowseCar = () => {
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
  const baseUrl = "http://localhost:8000";
  const [cars, setCars] = useState([]);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData(`${baseUrl}/api/user/browse-cars/`);
  }, []);

  const fetchData = async (url) => {
    try {
      const response = await axiosInstance.get(url);
      setCars(response.data.results);
      setPagination({
        count: response.data.count,
        next: response.data.next,
        previous: response.data.previous,
      });
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  const handlePageChange = (url) => {
    setCurrentPage((prevPage) => prevPage + 1);
    fetchData(url);
  };

  const totalResult = pagination.count;

  const links = [];
  for (let i = 1; i <= Math.ceil(totalResult / 6); i++) {
    links.push(
      <li key={i}>
        <button
          onClick={() =>
            handlePageChange(`${baseUrl}/api/user/browse-cars/?page=${i}`)
          }
          className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${
            currentPage === i ? "font-bold" : ""
          }`}
        >
          {i}
        </button>
      </li>
    );
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
        // Set other form values if needed
        setFieldValue("location", place.formatted_address);
      } else {
        setErrorLocation("Invalid location");
      }
    });
  };

  return (
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
                  <input
                    type="date"
                    class="bg-white text-gray-800 border px-4 py-4 rounded-md focus:outline-none focus:ring focus:border-blue-500"
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

      <div className="bg-slate-200 py-20 pl-4">
        <h2 className="text-4xl font-bold text-black mb-4">Available Cars</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {Array.isArray(cars) &&
            cars.map((car) => (
              <Card key={car.id} className="w-92 mb-4">
                <CardHeader shadow={false} floated={false} className="h-96">
                  <img
                    src={car.car_photo}
                    alt="car-image"
                    className="h-full w-full object-full"
                  />
                </CardHeader>
                <CardBody>
                  <div className="mb-2 flex items-center justify-between">
                    <Typography color="blue-gray" className="font-medium">
                      {car.brand} {car.car_name}
                    </Typography>
                    <Typography color="blue-gray" className="font-medium">
                      ${car.price} / day
                    </Typography>
                  </div>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal opacity-75"
                  >
                    {car.description}
                  </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                  <Link
                    to={`/browse-car/${car.id}`}
                    className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                  >
                    View Details
                  </Link>
                </CardFooter>
              </Card>
            ))}
        </div>
        <nav
          aria-label="Page navigation example"
          className="flex justify-center mt-4"
        >
          <ul className="flex items-center gap-4 list-none">
            <li>
              <button
                onClick={() =>
                  pagination.previous && handlePageChange(pagination.previous)
                }
                disabled={!pagination.previous}
                className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-white transition-all ${
                  !pagination.previous ? "bg-gray-400" : "bg-blue-500"
                } hover:bg-blue-600 active:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
              >
                Prev
              </button>
            </li>
            {links.map((link, index) => (
              <li key={index}>{link}</li>
            ))}
            <li>
              <button
                onClick={() =>
                  pagination.next && handlePageChange(pagination.next)
                }
                disabled={!pagination.next}
                className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-white transition-all ${
                  !pagination.next ? "bg-gray-400" : "bg-blue-500"
                } hover:bg-blue-600 active:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default BrowseCar;
