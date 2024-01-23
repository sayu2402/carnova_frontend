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
import useGoogleMapApi from "../../CustomeHook/useGoogleMapAPI";
import { useFormik } from "formik";
import Loading from "../common/Loading";
const baseUrl = process.env.REACT_APP_BASE_URL;

const BrowseCar = () => {
  const { isLoaded } = useGoogleMapApi();
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
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
  });


  const [cars, setCars] = useState([]);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
  });
  const [currentPage, setCurrentPage] = useState(1);

  console.log("baseUrl:", baseUrl);

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
    }finally {
      setLoading(false)
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

  return (
    <>
    {loading && <Loading />}
    <div>
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
    </>
  );
};

export default BrowseCar;
