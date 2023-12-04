import React from "react";
import Footer from "../../containers/common/Footer";
import NavBar from "../../containers/common/NavBar";
import UserDashboard from "../../containers/user/UserDashboard";

function UserDashboardPage() {
  return (
    <>
      <NavBar />
      <UserDashboard />
      <Footer />
    </>
  );
}

export default UserDashboardPage;
