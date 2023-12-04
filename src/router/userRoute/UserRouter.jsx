import React from "react";
import { Route, Routes } from "react-router-dom";

import ShowingOtp from "../../pages/userPages/ShowingOtp";
import HomePage from "../../pages/userPages/HomePage";
import LoginPage from "../../pages/userPages/LoginPage";
import UserSignUpPage from "../../pages/userPages/UserSignUpPage";
import UserDashboardPage from "../../pages/userPages/UserDashboardPage";

function UserRouter() {
  return (
    <Routes>
      <Route path="/otp" element={<ShowingOtp />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<UserSignUpPage />} />
      <Route path="/dashboard/:username" element={<UserDashboardPage/>} />
    </Routes>
  );
}

export default UserRouter;
