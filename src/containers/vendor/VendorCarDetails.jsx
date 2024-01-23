import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../../axios/axios";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loading from "../common/Loading";
const baseUrl = process.env.REACT_APP_BASE_URL;

const VendorCarDetails = () => {
  const [carDetails, setCarDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const vendorId = user.user_id;
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const totalResult = pagination.count;
  console.log("total_results:", totalResult);

  useEffect(() => {
    fetchData(`${baseUrl}/api/vendor/car-details/${vendorId}/`);
  }, []);

  const fetchData = async (url) => {
    try {
      const response = await axiosInstance.get(url);
      setCarDetails(response.data.results);
      setLoading(false);
      setPagination({
        count: response.data.count,
        next: response.data.next,
        previous: response.data.previous,
      });
    } catch (error) {
      console.log("error fetching car details:", error);
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
              `${baseUrl}/api/vendor/car-details/${vendorId}/?page=${i}`
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

  if (loading) {
    return <Loading />;
  }

  const handleEdit = (carId) => {
    navigate(`/vendor/profile/${user.username}/car-edit/${carId}`);
    console.log(`Edit car with ID: ${carId}`);
  };

  return (
    <div className="px-12 bg-slate-200 p-4">
      <h2 className="text-3xl font-semibold mb-4">Vendor Car Details</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Car Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Brand
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
              Location
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Model
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Price
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
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {carDetails.map((car) => (
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
  );
};

export default VendorCarDetails;
