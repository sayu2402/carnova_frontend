import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminPrivate from "./AdminPrivate";
import AdminDashboardPage from "../../pages/adminPages/AdminDashboardPage";
import AdminLoginPage from "../../pages/adminPages/AdminLoginPage";
import VendorListPage from "../../pages/adminPages/VendorListPage";
import UserListPage from "../../pages/adminPages/UserListPage";
import CarsListPage from "../../pages/adminPages/CarsListPage";
import CarDetailPageAdmin from "../../pages/adminPages/CarDetailPageAdmin";
import AdminBookingListPage from "../../pages/adminPages/AdminBookingListPage";


function AdminRouter() {
  return (
    <Routes>
      <Route path="/dashboard" element={<AdminPrivate> <AdminDashboardPage /> </AdminPrivate>} />
      <Route path="/login" element={<AdminLoginPage />} />
      <Route path="/user-list" element={<AdminPrivate><UserListPage /></AdminPrivate>} />
      <Route path="/vendor-list" element={<AdminPrivate> <VendorListPage /></AdminPrivate>} />
      <Route path="/car-list" element={<AdminPrivate><CarsListPage/></AdminPrivate> }/>
      <Route path="/car-list/car-details/:id" element={<AdminPrivate><CarDetailPageAdmin/></AdminPrivate> }/>
      <Route path="/bookings-list" element={<AdminPrivate><AdminBookingListPage/></AdminPrivate> }/>
    </Routes>
  );
}

export default AdminRouter;
