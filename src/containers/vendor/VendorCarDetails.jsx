import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../../axios/axios';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const VendorCarDetails = () => {
  const [carDetails, setCarDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()

  const vendorId = user.user_id

  useEffect(() => {
    axiosInstance.get(`api/vendor/car-details/${vendorId}/`)
      .then(response => {
        console.log('API Response:', response.data);
        setCarDetails(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching car details:', error);
        setLoading(false);
      });
  }, [vendorId]);

  
  if (loading) {
    return <div>Loading...</div>;
  }

  const handleEdit = (carId) => {
    navigate(`/vendor/profile/${user.username}/car-edit`);
    console.log(`Edit car with ID: ${carId}`);
  };

  return (
    <div className="px-12 bg-black p-4">
      <h2 className="text-3xl font-semibold mb-4">Vendor Car Details</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Car Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Brand
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Car Photo
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Model
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {carDetails.map(car => (
            <tr key={car.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {car.car_name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {car.brand}
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
                <div className="text-sm font-medium text-gray-900">
                  {car.location}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {car.model}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {car.price}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {car.verification_status}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleEdit(car.id)}
                  >
                    Edit
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

export default VendorCarDetails;
