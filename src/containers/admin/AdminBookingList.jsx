import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios/axios";
import Loading from "../common/Loading";
const baseUrl = process.env.REACT_APP_BASE_URL;

const AdminBookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const totalResult = pagination.count;

  useEffect(() => {
    fetchData(`${baseUrl}/api/admin/bookings-list/`);
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
      console.log("error fetching car data:", error);
    }finally{
      setLoading(false)
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
            handlePageChange(`${baseUrl}/api/admin/bookings-list/?page=${i}`)
          }
          className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-white transition-all hover:bg-white-900/10 hover:text-white active:bg-white-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${
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
    {loading ? (
        <Loading /> // Render the Loading component while data is being fetched
      ) : (
        
    <div className="p-4">
      <h2 className="text-3xl font-semibold mb-4">Bookings List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Order Number</th>
              <th className="py-2 px-4 border-b">User Name</th>
              <th className="py-2 px-4 border-b">Vendor Name</th>
              <th className="py-2 px-4 border-b">Car Name</th>
              <th className="py-2 px-4 border-b">Car Photo</th>
              <th className="py-2 px-4 border-b">Pickup Date</th>
              <th className="py-2 px-4 border-b">Return Date</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Is Cancelled</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="py-2 px-4 border-b">{booking.order_number}</td>
                <td className="py-2 px-4 border-b">
                  {booking.user.user.username}
                </td>
                <td className="py-2 px-4 border-b">
                  {booking.vendor.user.username}
                </td>
                <td className="py-2 px-4 border-b">
                  {booking.car.brand} {booking.car.car_name}
                </td>
                <td className="py-2 px-4 border-b">
                  <img
                    src={booking.car.car_photo}
                    alt={`Car ${booking.car.id} Photo`}
                    className="w-16 h-16 object-cover"
                  />
                </td>

                <td className="py-2 px-4 border-b">{booking.pickup_date}</td>
                <td className="py-2 px-4 border-b">{booking.return_date}</td>
                <td className="py-2 px-4 border-b">{booking.total_amount}</td>
                <td className="py-2 px-4 border-b">
                  {booking.is_cancelled ? "Cancelled by user" : "Booked"}
                </td>
                <td className="py-2 px-4 border-b">
                  {booking.verification_status}
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
    )}
    </>
  );
};

export default AdminBookingList;
