import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../../axios/axios";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";

const UserBookingDetails = ({ user_id }) => {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/user/bookings/${user.user_id}/`
        );
        console.log("API Response:", response.data);
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [user_id]);

  return (
    <div className="flex flex-col bg-slate-200 px-8 pb-8">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Order Number
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Username
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Car Photo
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Car Brand and Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Pickup Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Return Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    View
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking, index) => (
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
                        <span
                          className="px-2 inline-flex text-xs leading-5
                      font-semibold rounded-full bg-red-100 text-red-800"
                        >
                          Cancelled by You
                        </span>
                      ) : (
                        <span
                          className="px-2 inline-flex text-xs leading-5
                      font-semibold rounded-full bg-green-100 text-green-800"
                        >
                          {booking.verification_status}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/dashboard/${user.username}/booking-details/${booking.id}`}
                        state={{ bookingId: booking.id }}
                        className="text-indigo-600 hover:text-indigo-900"
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

export default UserBookingDetails;
