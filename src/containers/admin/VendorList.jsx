import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function VendorList() {
  const [vendorList, setVendorList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const blockFunction = async (vendor) => {
    const newStatus = !vendor.user.is_blocked;

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/userblock/${vendor.user.id}`)
        .then((response) => {
          const updatedVendors = vendorList.map((existingVendor) => {
            if (existingVendor.user.id === vendor.user.id) {
              return {
                ...existingVendor,
                user: {
                  ...existingVendor.user,
                  is_blocked: newStatus,
                },
              };
            }
            return existingVendor;
          });
          setVendorList(updatedVendors);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchVendorList = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/vendorlist/");
        setVendorList(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchVendorList();
  }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

  return (
    <div className="p-4">
      <h2 className="text-3xl font-semibold mb-4">Vendor List</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vendor Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone Number
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {vendorList.map((vendor, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {vendor.user.username}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{vendor.user.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{vendor.user.phone_no}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className={`text-xs text-white ${
                    vendor.user.is_blocked ? "bg-green-500" : "bg-red-500"
                  } px-2 py-1`}
                  onClick={() => blockFunction(vendor)}
                >
                  {vendor.user.is_blocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VendorList;
