import React from "react";
import { Route, Routes } from "react-router-dom";
import Adminlogin from "../../containers/adminPage/AdminLogin";
import UserList from "../../containers/adminPage/UserList";
import VendorList from "../../containers/adminPage/VendorList";
import AdminPrivate from "./AdminPrivate";
import AdminPublic from "./AdminPublic";
import AdminDashboard from "../../containers/adminPage/AdminDashboard";

function AdminRouter() {
  return (
    <Routes>
      <Route path="/dashboard" element={<AdminPrivate> <AdminDashboard /> </AdminPrivate>} />
      <Route path="/admin-login" element={<AdminPublic><Adminlogin /> </AdminPublic>} />
      <Route path="/user-list" element={<AdminPrivate><UserList /></AdminPrivate>} />
      <Route path="/vendor-list" element={<AdminPrivate> <VendorList /></AdminPrivate>} />
    </Routes>
  );
}

export default AdminRouter;
