import React from "react";
import AdminNavBar from "../../containers/common/AdminNavBar";
import AdminFooter from "../../containers/common/AdminFooter";
import { AdminSidebar } from "../../containers/common/AdminSidebar";
import UserList from "../../containers/admin/UserList";

function UserListPage() {
  return (
    <>
      <AdminNavBar />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-grow ">
          <UserList />
        </div>
      </div>

      <AdminFooter />
    </>
  );
}

export default UserListPage;
