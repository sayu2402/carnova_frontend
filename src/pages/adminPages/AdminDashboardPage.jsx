import React from "react";
import AdminNavBar from "../../containers/common/AdminNavBar";
import AdminDashboard from "../../containers/admin/AdminDashboard";
import AdminFooter from "../../containers/common/AdminFooter";
import { AdminSidebar } from "../../containers/common/AdminSidebar";

function AdminDashboardPage() {
  return (
    <>
      <AdminNavBar />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-grow ">
          <AdminDashboard />
        </div>
      </div>

      <AdminFooter />
    </>
  );
}

export default AdminDashboardPage;
