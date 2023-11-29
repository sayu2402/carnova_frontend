import React from "react";
import { Route, Routes } from "react-router-dom";
import UserList from "../../containers/admin/UserList";
import VendorList from "../../containers/admin/VendorList";
import AdminPrivate from "./AdminPrivate";
import AdminPublic from "./AdminPublic";
import AdminDashboardPage from "../../pages/adminPages/AdminDashboardPage";
import AdminLoginPage from "../../pages/adminPages/AdminLoginPage";


function AdminRouter() {
  return (
    <Routes>
      <Route path="/dashboard" element={<AdminPrivate> <AdminDashboardPage /> </AdminPrivate>} />
      <Route path="/login" element={<AdminLoginPage />} />
      <Route path="/user-list" element={<AdminPrivate><UserList /></AdminPrivate>} />
      <Route path="/vendor-list" element={<AdminPrivate> <VendorList /></AdminPrivate>} />
    </Routes>
  );
}

export default AdminRouter;
