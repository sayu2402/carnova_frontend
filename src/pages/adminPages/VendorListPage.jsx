import React from "react";
import AdminNavBar from "../../containers/common/AdminNavBar";
import { AdminSidebar } from "../../containers/common/AdminSidebar";
import AdminFooter from "../../containers/common/AdminFooter";
import VendorList from "../../containers/admin/VendorList";

function VendorListPage() {
  return (
    <>
      <AdminNavBar />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-grow ">
          <VendorList />
        </div>
      </div>

      <AdminFooter />
    </>
  );
}

export default VendorListPage;
