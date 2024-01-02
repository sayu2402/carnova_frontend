import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios/axios';


const AdminBookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch booking data from the API using axiosInstance
    axiosInstance.get('/api/admin/bookings-list/')
      .then(response => {
        console.log(response.data); // Log the response to inspect
        setBookings(response.data.results); // Access the results array
      })
      .catch(error => console.error('Error fetching booking data:', error));
  }, []);

  return (
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
              <th className="py-2 px-4 border-b">Cancelled</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id}>
                <td className="py-2 px-4 border-b">{booking.order_number}</td>
                <td className="py-2 px-4 border-b">{booking.user.user.username}</td>
                <td className="py-2 px-4 border-b">{booking.vendor.user.username}</td>
                <td className="py-2 px-4 border-b">{booking.car.brand} {booking.car.car_name}</td>
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
                <td className="py-2 px-4 border-b">{booking.is_cancelled ? 'Cancelled' : 'Booked'}</td>
                <td className="py-2 px-4 border-b">{booking.verification_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBookingList;
