import React from "react";
import Adminlogin from "../../containers/admin/AdminLogin";
import AdminFooter from "../../containers/common/AdminFooter";
import NavBar from "../../containers/common/NavBar";

function AdminLoginPage() {
  return (
    <>
      <NavBar />
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
