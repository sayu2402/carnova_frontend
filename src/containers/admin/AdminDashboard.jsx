import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios/axios";
import MonthlyChart from "./MonthlyLineChart";
import PieChartAdmin from "./PieChartAdmin";

function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalRevenue: 0,
    bookings: 0,
    totalCars: 0,
    monthlyRevenue: 0,
    total_vendor: 0,
  });
  const [newUsersData, setNewUsersData] = useState([]);
  const [newVendorsData, setNewVendorsData] = useState([]);
  const [newBookingsData, setNewBookingsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/api/admin/chart/");
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchNewUsersData = async () => {
      try {
        const response = await axiosInstance.get("/api/admin/new-users/");
        setNewUsersData(response.data);
      } catch (error) {
        console.error("Error fetching new users data:", error);
      }
    };

    const fetchNewVendorsData = async () => {
      try {
        const response = await axiosInstance.get("/api/admin/new-vendors/");
        setNewVendorsData(response.data);
      } catch (error) {
        console.error("Error fetching new vendors data:", error);
      }
    };

    const fetchNewBookingsData = async () => {
      try {
        const response = await axiosInstance.get("/api/admin/new-bookings/");
        setNewBookingsData(response.data);
      } catch (error) {
        console.error("Error fetching new bookings data:", error);
      }
    };

    fetchData();
    fetchNewUsersData();
    fetchNewVendorsData();
    fetchNewBookingsData();
  }, []);

  return (
    <>
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

      {/* chart side */}
      <div className="flex justify-center">
        <div className=" w-[700px] ">
          <MonthlyChart />
        </div>
        <div className="">
          <PieChartAdmin />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-10">
        {/* Block 5 - New Users */}
        <div className="bg-slate-200 p-4 rounded-md text-black flex flex-col items-start">
          <p className="text-lg font-bold mb-4">New Users</p>
          {newUsersData.length > 0 ? (
            <>
              {newUsersData.map((user, index) => (
                <div key={user.id} className="mb-4 flex items-center">
                  {/* Avatar */}
                  <img
                    src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png"
                    alt="avatar"
                    className="mr-2 rounded-full"
                    width={40}
                    height={40}
                  />
                  {/* User details */}
                  <div>
                    <p className="text-sm font-semibold font-mono">
                      {user.username}
                    </p>
                    <p className="font-thin text-xs">{user.email}</p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="text-2xl font-bold">No data available</p>
          )}
        </div>

        {/* Block 6 - New Vendors */}
        <div className="bg-slate-200 p-4 rounded-md text-black flex flex-col items-start">
          <p className="text-lg font-bold mb-4">New Vendors</p>
          {newVendorsData.length > 0 ? (
            <>
              {newVendorsData.map((vendor, index) => (
                <div key={vendor.id} className="mb-4 flex items-center">
                  {/* Avatar */}
                  <img
                    src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png"
                    alt="avatar"
                    className="mr-2 rounded-full"
                    width={40}
                    height={40}
                  />
                  {/* Vendor details */}
                  <div>
                    <p className="text-sm font-semibold font-mono">
                      {vendor.user.username}
                    </p>
                    <p className="font-thin text-xs">{vendor.user.email}</p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="text-2xl font-bold">No data available</p>
          )}
        </div>

        {/* Block 7 - New Bookings */}
        <div className="bg-slate-200 p-4 rounded-md text-black flex flex-col items-start">
          <p className="text-lg font-bold mb-4">New Bookings</p>
          {newBookingsData.length > 0 ? (
            <>
              {newBookingsData.map((booking, index) => (
                <div key={booking.id} className="mb-4">
                  <p className="text-sm font-semibold font-mono">
                    <span className="text-green-500">
                      ✨ {booking.user.user.username}
                    </span>{" "}
                    booked
                    <span className="text-blue-500">
                      {" "}
                      {booking.car.car_name}
                    </span>{" "}
                    from
                    <span className="text-purple-500">
                      {" "}
                      {booking.pickup_date}
                    </span>{" "}
                    to
                    <span className="text-purple-500">
                      {" "}
                      {booking.return_date}
                    </span>
                  </p>
                </div>
              ))}
            </>
          ) : (
            <p className="text-2xl font-bold">No data available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
