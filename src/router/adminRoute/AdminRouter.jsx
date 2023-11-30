import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminPrivate from "./AdminPrivate";
import AdminPublic from "./AdminPublic";
import AdminDashboardPage from "../../pages/adminPages/AdminDashboardPage";
import AdminLoginPage from "../../pages/adminPages/AdminLoginPage";
import VendorListPage from "../../pages/adminPages/VendorListPage";
import UserListPage from "../../pages/adminPages/UserListPage";


function AdminRouter() {
  return (
    <Routes>
      <Route path="/dashboard" element={<AdminPrivate> <AdminDashboardPage /> </AdminPrivate>} />
      <Route path="/login" element={<AdminLoginPage />} />
      <Route path="/user-list" element={<AdminPrivate><UserListPage /></AdminPrivate>} />
      <Route path="/vendor-list" element={<AdminPrivate> <VendorListPage /></AdminPrivate>} />
    </Routes>
  );
}

export default AdminRouter;
