import React from "react";
import { Route, Routes } from "react-router-dom";

import ShowingOtp from "../../pages/userPages/ShowingOtp";
import HomePage from "../../pages/userPages/HomePage";
import LoginPage from "../../pages/userPages/LoginPage";
import UserSignUpPage from "../../pages/userPages/UserSignUpPage";
import UserProfilePage from "../../pages/userPages/UserProfilePage";
import UserBookingDetailsPage from "../../pages/userPages/UserBookingDetailsPage";
import BrowseCarsPage from "../../pages/userPages/BrowseCarsPage";
import UserCarDetailPage from "../../pages/userPages/UserCarDetailPage";
import CheckoutPage from "../../pages/userPages/CheckoutPage";

function UserRouter() {
  return (
    <Routes>
      <Route path="/otp" element={<ShowingOtp />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<UserSignUpPage />} />
      <Route path="/dashboard/:username" element={<UserProfilePage/>} />
      <Route path="/dashboard/:username/booking-details" element={<UserBookingDetailsPage/>}/>
      <Route path="/browse-cars" element={<BrowseCarsPage/>}/>
      <Route path="/browse-car/:carId" element={<UserCarDetailPage/>}/>
      <Route path="/checkout/:carId" element={<CheckoutPage/> } />
    </Routes>
  );
}

export default UserRouter;
