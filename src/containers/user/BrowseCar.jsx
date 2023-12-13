import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import axiosInstance from "../../axios/axios";

const BrowseCar = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/api/user/browse-cars/");
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div
        className="bg-cover h-screen flex items-center"
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/360399/pexels-photo-360399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        }}
      >
        <div className="text-white text-6xl font-bold p-20">
          <div className="font-serif text-stone-50">Browse Cars</div>
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

      <div className="bg-slate-200 py-20 pl-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {cars.map((car) => (
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
              <Link to={`/browse-car/${car.id}`}
                ripple={false}
                fullWidth={true}
                className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
              >
                View Details
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default BrowseCar;
