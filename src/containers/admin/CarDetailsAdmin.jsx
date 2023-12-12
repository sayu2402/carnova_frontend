import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios/axios';
import { useParams } from 'react-router-dom';

const CarDetailsAdmin = () => {
  const { id } = useParams();
  const [carDetails, setCarDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get(`api/admin/car-details/${id}/`)
      .then(response => {
        setCarDetails(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching car details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl font-semibold mb-4">Car Details</h2>
      <div className="bg-black p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-medium mb-2">{carDetails.car_name}</h3>
        <p className="mb-2"><strong>Vendor Name:</strong> {carDetails.vendor_name}</p>
        <p className="mb-2"><strong>Brand:</strong> {carDetails.brand}</p>
        <p className="mb-2"><strong>Location:</strong> {carDetails.location}</p>
        <p className="mb-2"><strong>Availability:</strong> {carDetails.is_available ? "Available" : "Not Available"}</p>
        <p className="mb-2"><strong>Price:</strong> {carDetails.price}</p>
        <p className="mb-2"><strong>Status:</strong> {carDetails.verification_status}</p>
        <p className="mb-2"><strong>Fuel Type:</strong> {carDetails.fuel_type}</p>
        <p className="mb-2"><strong>Transmission:</strong> {carDetails.transmission}</p>
        <p className="mb-2"><strong>Model:</strong> {carDetails.model}</p>
        <h2 className="text-3xl">Car Image</h2>
        <img
          src={carDetails.car_photo}
          alt={`Car ${carDetails.id} Photo`}
          className="w-full h-auto object-cover mb-4"
        />
        <h2 className="text-3xl">Car Document</h2>
         <img
          src={carDetails.document}
          alt={`Car ${carDetails.id} Photo`}
          className="w-full h-auto object-cover mb-4"
        />
      </div>
    </div>
  );
};

export default CarDetailsAdmin;
