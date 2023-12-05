import React from "react";
import UserProfileCards from "../../containers/user/UserProfileCards";
import UserDashboard from "../../containers/user/UserDashboard";
import NavBar from "../../containers/common/NavBar";
import Footer from "../../containers/common/Footer";

function UserProfilePage() {
  return (
    <>
      <NavBar />
      <UserDashboard />
      <UserProfileCards />
      <Footer />
    </>
  );
}

export default UserProfilePage;
