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
  HiOutlineTruck
} from "react-icons/hi";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function AdminSidebar() {
  const {logoutUser} = useContext(AuthContext)
  return (
    <Sidebar aria-label="Default sidebar example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item  icon={HiChartPie}>
            <Link to="/admin/dashboard">Dashboard</Link>
          </Sidebar.Item>
          <Sidebar.Item  icon={HiOutlineTruck}>
            Cars
          </Sidebar.Item>
          <Sidebar.Item  icon={HiInbox}>
            Inbox
          </Sidebar.Item>
          <Sidebar.Item  icon={HiUser}>
            <Link to="/admin/user-list">Users List</Link>
          </Sidebar.Item>
          <Sidebar.Item  icon={HiUser}>
            <Link to="/admin/vendor-list">Vendor List</Link>
          </Sidebar.Item>
          <Sidebar.Item  icon={HiShoppingBag}>
            Bookings
          </Sidebar.Item>
          <Sidebar.Item  icon={HiTable}>
            <Link to="#" onClick={logoutUser}>Logout</Link>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default AdminSidebar;