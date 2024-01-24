import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axios/axios";
import BookingModal from "./BookingModal";
import Loading from "../common/Loading";

const UserCarDetail = () => {
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [single, setSingle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        console.log("car__ID::", carId);
        const response = await axiosInstance.get(
          `/api/user/car-details/${carId}/`
        );
        setCar(response.data);
        console.log("Car Data:", response.data);
      } catch (error) {
        console.error("Error fetching car details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [carId]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (!car) {
    return <Loading/>;
  }

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="car"
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src={car.car_photo}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              Owner Name: {car.vendor_name}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {car.brand} {car.car_name}
            </h1>
            <p className="leading-relaxed">{car.description}</p>
            <div className="flex mt-6 items-center">
              <div className="flex">
                <span className="mr-3">Transmission:</span>
                <span className="mr-1">{car.transmission}</span>
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Fuel Type:</span>
                <span className="mr-1">{car.fuel_type}</span>
              </div>
            </div>

            <div className="flex mt-4 items-center pb-5 border-b-2 border-gray-200 mb-5">
              <div className="flex">
                <span className="mr-3">Model:</span>
                <span className="mr-1">{car.model}</span>
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Location:</span>
                <span className="mr-1">{car.location}</span>
              </div>
            </div>

            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                {`$${car.price}`} / Day
              </span>
              <button
                onClick={openModal}
                className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
              >
                Reserve Now
              </button>
            </div>
          </div>

          {/* Modal */}

          {showModal && <BookingModal onClose={closeModal} carId={single} />}
        </div>
      </div>
    </section>
  );
};

export default UserCarDetail;
