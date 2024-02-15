import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axios/axios";
import Loading from "../common/Loading";

const CarDetailsAdmin = () => {
  const { id } = useParams();
  const [carDetails, setCarDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(`api/admin/car-details/${id}/`)
      .then((response) => {
        setCarDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching car details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Car Photo</h2>
              <img
                alt="car"
                className="w-full h-auto object-cover object-center rounded border border-gray-200"
                src={carDetails.car_photo}
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Car Document</h2>
              <img
                alt="document"
                className="w-full h-auto object-cover object-center rounded border border-gray-200 mt-4"
                src={carDetails.document}
              />
            </div>
          </div>

          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              Owner Name: {carDetails.vendor_name}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {carDetails.brand} {carDetails.car_name}
            </h1>
            <p className="leading-relaxed">{carDetails.description}</p>
            <div className="flex mt-6 items-center">
              <div className="flex">
                <span className="mr-3">Transmission:</span>
                <span className="mr-1">{carDetails.transmission}</span>
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Fuel Type:</span>
                <span className="mr-1">{carDetails.fuel_type}</span>
              </div>
            </div>

            <div className="flex mt-4 items-center pb-5 border-b-2 border-gray-200 mb-5">
              <div className="flex">
                <span className="mr-3">Model:</span>
                <span className="mr-1">{carDetails.model}</span>
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Location:</span>
                <span className="mr-1">{carDetails.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarDetailsAdmin;
