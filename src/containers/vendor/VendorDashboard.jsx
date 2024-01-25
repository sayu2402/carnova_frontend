import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../axios/axios";
import AuthContext from "../../context/AuthContext";

function VendorDashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalRevenue: 0,
    bookings: 0,
    totalCars: 0,
    monthlyRevenue: 0,
    total_vendor: 0,
  });
  const { partner } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/vendor/chart/${partner.user_id}`
        );

        // Axios will automatically throw an error for non-2xx responses
        const data = response.data;
        // console.log("Data:", data);
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [partner.user_id]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      <div className="bg-blue-500 p-4 rounded-md text-white h-28 flex flex-col items-center justify-center">
        <p className="text-lg font-semibold">Total Revenue</p>
        <p className="text-2xl font-bold">{dashboardData.totalRevenue}</p>
        <p className="font-thin text-xs">Total Revenue Upto date</p>
      </div>
      <div className="bg-green-500 p-4 rounded-md text-white h-28 flex flex-col items-center justify-center">
        <p className="text-lg font-semibold">Bookings</p>
        <p className="text-2xl font-bold">{dashboardData.bookings}</p>
        <p className="font-thin text-xs">Excluding booking in transit</p>
      </div>
      <div className="bg-yellow-500 p-4 rounded-md text-white h-28 flex flex-col items-center justify-center">
        <p className="text-lg font-semibold">Total Cars</p>
        <p className="text-2xl font-bold">{dashboardData.totalCars}</p>
        <p className="font-thin text-xs">
          Total Vendors : {dashboardData.total_vendor}
        </p>
      </div>
      <div className="bg-indigo-500 p-4 rounded-md text-white h-28 flex flex-col items-center justify-center">
        <p className="text-lg font-semibold">Monthly Revenue</p>
        <p className="text-2xl font-bold">{dashboardData.monthlyRevenue}</p>
        <p className="font-thin text-xs">Based on Your Local Time</p>
      </div>
    </div>
  );
}

export default VendorDashboard;
