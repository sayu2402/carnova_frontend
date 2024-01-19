import React from "react";
import NavBar from "../../containers/common/NavBar";
import Footer from "../../containers/common/Footer";
import Checkout from "../../containers/user/checkout";

function CheckoutPage() {
  return (
    <>
      <NavBar />
      <Checkout />
      <Footer />
    </>
  );
}

export default CheckoutPage;
