import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios/axios";
import AuthContext from "../../context/AuthContext";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(AuthContext);
  const [updatedBookings, setUpdatedBookings] = useState(() => {
    const storedBookings = localStorage.getItem("updatedBookings");
    return storedBookings ? JSON.parse(storedBookings) : [];
  });

  const fetchBookings = async () => {
    try {
      const storedStatus = localStorage.getItem("bookingStatus") || "Approved";
      const response = await axiosInstance.get(
        `/api/vendor/bookings/${user.user_id}`,
        {
          params: { verification_status: storedStatus },
        }
      );
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      if (!updatedBookings.includes(bookingId)) {
        await axiosInstance.put(
          `/api/vendor/bookings/${bookingId}/update-status/`,
          { verification_status: newStatus }
        );
        setUpdatedBookings((prevState) => {
          const updatedList = [...prevState, bookingId];
          localStorage.setItem("updatedBookings", JSON.stringify(updatedList));
          return updatedList;
        });
        fetchBookings();
      } else {
        console.warn(`Booking ${bookingId} status already updated.`);
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      await axiosInstance.post(
        `/api/vendor/${user.user_id}/cancel-order/${bookingId}/`
      );
      fetchBookings();
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user.user_id]);

  return (
    <div className="flex flex-col px-8 bg-slate-200 pb-8">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Car Photo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Car Brand and Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pickup Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Return Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Update Status
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    View
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.order_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.user.user.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        className="h-16 w-16"
                        src={booking.car.car_photo}
                        alt=""
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.car.brand} {booking.car.car_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.pickup_date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.return_date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.is_cancelled ? (
                        <span className="text-red-500">Cancelled</span>
                      ) : (
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            booking.verification_status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {booking.verification_status}
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {!booking.is_cancelled &&
                      !updatedBookings.includes(booking.id) ? (
                        <>
                          <button
                            onClick={() =>
                              updateBookingStatus(booking.id, "Approved")
                            }
                            className="text-white bg-green-500 hover:bg-green-700 px-4 py-2 rounded mr-2"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => cancelBooking(booking.id)}
                            className="text-white bg-yellow-500 hover:bg-yellow-700 px-4 py-2 rounded"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <span>
                          {booking.is_cancelled
                            ? "Booking cancelled"
                            : "Status updated"}
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/vendor/booking-details/${booking.id}`}
                        state={{ bookingId: booking.id }}
                        className="text-indigo-600 hover:text-indigo-900 px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingList;
