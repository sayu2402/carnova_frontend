import React from "react";
import Adminlogin from "../../containers/admin/AdminLogin";
import AdminNavBar from "../../containers/common/AdminNavBar";
import { AdminSidebar } from "../../containers/common/AdminSidebar";
import AdminFooter from "../../containers/common/AdminFooter";

function AdminLoginPage() {
  return (
    <>
      <AdminNavBar />
      <div className="flex">
        <div className="flex-grow ">
          <Adminlogin />
        </div>
      </div>

      <AdminFooter />
    </>
  );
}

export default AdminLoginPage;
