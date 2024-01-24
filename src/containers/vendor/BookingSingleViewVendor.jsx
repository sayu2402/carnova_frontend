import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios/axios";
import { useParams, Link } from "react-router-dom";
import Loading from "../common/Loading";

const BookingSingleViewVendor = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);

  console.log("booking_id_______", bookingId);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/user/booking-detail/${bookingId}/`
        );
        console.log("API Response:single", response.data);
        setBooking(response.data);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  if (!booking) {
    return <Loading />;
  }

  console.log("___________", booking.user.user)

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          {/* Left Part: Car Image Display */}
          <div className="lg:w-1/3 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <img
              alt="car"
              className="w-full object-cover object-center rounded border border-gray-200"
              src={booking.car.car_photo}
            />
            {/* Pickup Date and Return Date in a line */}
            <div className="flex items-center mt-4">
              <p className="block text-gray-700 text-sm font-bold mb-2 mr-2">
                Pickup Date: {booking.pickup_date}
              </p>
              <p className="block text-gray-700 text-sm font-bold mb-2">
                Return Date: {booking.return_date}
              </p>
            </div>
          </div>

          {/* Center Part: Owner and Car Details, Price */}
          <div className="lg:w-1/3 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <div className="flex items-center">
              <div className="flex">
                <h2 className="text-sm title-font text-gray-500 tracking-widest mr-4">
                  User Name: {booking.user.user.username}
                </h2>
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  User Phone: {booking.user.user.phone_no}
                </h2>
              </div>
            </div>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {booking.car.brand} {booking.car.car_name}
            </h1>
            <div className="flex mt-6 items-center">
              <div className="flex">
                <span className="mr-3 font-bold">Transmission:</span>
                <span className="mr-1">{booking.car.transmission}</span>
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3 font-bold">Fuel Type:</span>
                <span className="mr-1">{booking.car.fuel_type}</span>
              </div>
            </div>

            <div className="flex mt-4 items-center pb-5 border-b-2 border-gray-200 mb-5">
              <div className="flex">
                <span className="mr-3 font-bold">Model:</span>
                <span className="mr-1">{booking.car.model}</span>
              </div>
              <div className="flex ml-6 items-center">
                <span className="text-gray-800 mr-3 font-bold">Location:</span>
                <span className="mr-1">{booking.car.location}</span>
              </div>
            </div>

            {/* Price to the left */}
            <div className="mb-4">
              <span className="title-font font-medium text-2xl text-gray-900">
                {`Price: $${booking.total_amount}`}
              </span>
            </div>
          </div>

          <div className="lg:w-1/3 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 flex flex-col justify-between">
            <div className="flex items-center space-x-4">
              <span className="cursor-pointer">
                <h1 className="pb-4 text-lg font-bold">
                  {booking.is_cancelled ? (
                    <span className="text-red-500">
                      Booking Cancelled: Your Car Booking Has been cancelled by
                      the user
                    </span>
                  ) : (
                    "Details Will be shown here"
                  )}
                </h1>
              </span>
            </div>
            <div className="flex items-center mt-6 mr-56">
              <Link
                to="/vendor/booking-details/user-id-card"
                state={{ user: booking.user.user }}
                className="bg-red-500 text-white px-4 py-2 rounded ml-auto"
              >
                Show ID
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSingleViewVendor;
