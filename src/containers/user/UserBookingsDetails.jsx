import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../../axios/axios";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Loading from "../common/Loading";
const baseUrl = process.env.REACT_APP_BASE_URL;

const UserBookingDetails = ({ user_id }) => {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const totalResult = pagination.count;

  useEffect(() => {
    fetchData(`${baseUrl}/api/user/bookings/${user.user_id}/`);
  }, []);

  const fetchData = async (url) => {
    try {
      const response = await axiosInstance.get(url);
      setBookings(response.data.results);
      setPagination({
        count: response.data.count,
        next: response.data.next,
        previous: response.data.previous,
      });
    } catch (error) {
      console.log("error fetching user bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (url) => {
    setCurrentPage((prevPage) => prevPage + 1);
    fetchData(url);
  };

  const links = [];
  for (let i = 1; i <= Math.ceil(totalResult / 6); i++) {
    links.push(
      <li key={i}>
        <button
          onClick={() =>
            handlePageChange(
              `${baseUrl}/api/user/bookings/${user.user_id}/?page=${i}`
            )
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
    {loading && <Loading/>}
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

              {/* Pagination Area Start*/}
              <nav
                aria-label="Page navigation example"
                className="flex justify-center mt-4"
              >
                <ul className="flex items-center gap-4 list-none">
                  <li>
                    <button
                      onClick={() =>
                        pagination.previous &&
                        handlePageChange(pagination.previous)
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
                    <li key={index} className="">
                      {link}
                    </li>
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
              {/* Pagination Area End */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBookingDetails;
