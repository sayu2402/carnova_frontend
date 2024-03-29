"use client";

import { Sidebar } from "flowbite-react";
import { useContext } from "react";
import {
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiTruck,
  HiOutlineTruck,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function AdminSidebar() {
  const { logoutUser } = useContext(AuthContext);
  return (
    <div className="bg-black">
      <Sidebar
        aria-label="Default sidebar example"
        style={{ position: "sticky", top: 0, height: "100vh" }}
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item icon={HiChartPie}>
              <Link to="/admin/dashboard">Dashboard</Link>
            </Sidebar.Item>
            <Sidebar.Item icon={HiOutlineTruck}>
              <Link to="/admin/car-list">Cars</Link>
            </Sidebar.Item>
            <Sidebar.Item icon={HiUser}>
              <Link to="/admin/user-list">Users List</Link>
            </Sidebar.Item>
            <Sidebar.Item icon={HiUser}>
              <Link to="/admin/vendor-list">Vendor List</Link>
            </Sidebar.Item>
            <Sidebar.Item icon={HiShoppingBag}>
              <Link to="/admin/bookings-list">Bookings</Link>
            </Sidebar.Item>
            <Sidebar.Item icon={HiTable}>
              <Link to="#" onClick={logoutUser}>
                Logout
              </Link>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}

export default AdminSidebar;
