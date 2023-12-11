import React from "react";
import NavBar from "../../containers/common/NavBar";
import VendorProfile from "../../containers/vendor/VendorProfile";
import VendorDashboard from "../../containers/vendor/VendorDashboard";
import Footer from "../../containers/common/Footer";
import AddCar from "../../containers/vendor/AddCar";

function AddCarPage() {
  return (
    <>
      <NavBar />
      <VendorProfile />
      <AddCar />
      <Footer />
    </>
  );
}

export default AddCarPage;
