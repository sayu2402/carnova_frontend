import React from "react";
import NavBar from "../../containers/common/NavBar";
import Footer from "../../containers/common/Footer";
import VendorProfile from "../../containers/vendor/VendorProfile";

function VendorProfilePage() {
  return (
    <>
      <NavBar />
      <VendorProfile />
      <Footer />
    </>
  );
}

export default VendorProfilePage;
