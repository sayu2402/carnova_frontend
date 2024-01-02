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
import UserPrivate from "./UserPrivate";
import BookingSinglePage from "../../pages/userPages/BookingSinglePage";

function UserRouter() {
  return (
    <Routes>
      <Route path="/otp" element={<ShowingOtp />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<UserSignUpPage />} />
      <Route path="/dashboard/:username" element={<UserPrivate><UserProfilePage/></UserPrivate>} />
      <Route path="/dashboard/:username/booking-details" element={<UserPrivate><UserBookingDetailsPage/></UserPrivate>}/>
      <Route path="/browse-cars" element={<UserPrivate><BrowseCarsPage/></UserPrivate>}/>
      <Route path="/browse-car/:carId" element={<UserPrivate><UserCarDetailPage/></UserPrivate>}/>
      <Route path="/checkout/:carId" element={<UserPrivate><CheckoutPage/></UserPrivate> } />
      <Route path="/dashboard/:username/booking-details" element={<UserPrivate><UserBookingDetailsPage/></UserPrivate> } />
      <Route path="/dashboard/:username/booking-details/:bookingId" element={<UserPrivate><BookingSinglePage/></UserPrivate> } />
    </Routes>
  );
}

export default UserRouter;
