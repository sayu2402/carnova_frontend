import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios/axios';
import { useNavigate } from 'react-router-dom';

const CarList = () => {
  const [carList, setCarList] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch car data
    axiosInstance.get('api/admin/cars-list')
      .then(response => setCarList(response.data))
      .catch(error => console.error('Error fetching car data:', error));
  }, []);

  const handleVerification = (carId, newStatus) => {
    console.log("car______id", carId)
    // Update verification status
    axiosInstance.patch(`api/admin/verify-car/${carId}/`, { verification_status: newStatus })
      .then(response => {
        // Update local state with the updated data
        setCarList(prevList => prevList.map(car => (car.id === carId ? response.data : car)));
      })
      .catch(error => console.error('Error updating verification status:', error));
  };

  const checkAvailability = (isAvailable) => {
    return isAvailable ? "Available" : "Not Available";
  };

  const handleView = (carId) => {
    // Navigate to the single page for the selected car
    navigate(`/admin/car-list/car-details/${carId}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-semibold mb-4">Car List</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sl.No
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Car Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vendor Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Brand
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Availability
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Car Photo
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Details
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {carList.map((car, index) => (
            <tr key={car.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {index + 1}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {car.car_name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                {car.vendor_name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {car.brand}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {car.location}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{checkAvailability(car.is_available)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {car.price}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
              <img
                  src={car.car_photo}
                  alt={`Car ${car.id} Photo`}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{car.verification_status}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className={`text-xs text-white ${
                    car.verification_status === 'Approved' ? "bg-green-500" : "bg-red-500"
                  } px-2 py-1`}
                  onClick={() => handleVerification(car.id, car.verification_status === 'Approved' ? 'Rejected' : 'Approved')}
                >
                  {car.verification_status === 'Approved' ? 'Reject' : 'Approve'}
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleView(car.id)}
                  >
                    View
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarList;