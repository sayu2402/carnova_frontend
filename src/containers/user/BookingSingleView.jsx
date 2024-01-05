import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../axios/axios";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import swal from "sweetalert2";

const BookingSingleView = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cancelling, setCancelling] = useState(false);

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

  const handleCancelBooking = async () => {
    // Display confirmation dialog
    const result = await swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    });

    // If the user clicks "Yes" in the confirmation dialog
    if (result.isConfirmed) {
      try {

        setCancelling(true);

        await axiosInstance.post(
          `/api/user/cancel-booking/${user.user_id}/${bookingId}/`
        );
        navigate(`/dashboard/${user.username}`);
      } catch (error) {
        console.error("Error cancelling booking:", error);
      }
    }
  };

  if (!booking) {
    return <p>Loading...</p>;
  }

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
                  Owner Name: {booking.vendor.user.username}
                </h2>
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  Owner Phone: {booking.vendor.user.phone_no}
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
                      Booking Cancelled: Your Booking Amount is Credited to Your Wallet
                    </span>
                  ) : (
                    "Stay Connect With Car Owner"
                  )}
                </h1>
                {!booking.is_cancelled && (
                  <div className="flex space-x-4 items-center">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                      Chat
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={handleCancelBooking}
                    >
                      Cancel Booking
                    </button>
                  </div>
                )}
              </span>
            </div>

            <div className="flex items-center mt-6 mr-56">
              <button className="bg-red-500 text-white px-4 py-2 rounded ml-auto">
                Report Owner
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSingleView;
