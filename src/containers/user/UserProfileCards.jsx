import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import axiosInstance from "../../axios/axios";


function UserProfileCards() {
  const { userProfilee } = useContext(AuthContext);

  return (
    <>
      <div className="flex flex-col lg:flex-row bg-slate-200">
        {/* Left Card */}
        <div className="lg:w-1/2 lg:pl-60">
          <div className="w-full max-w-sm border border-pink-900 rounded-lg shadow dark:bg-pink-900 dark:border-pink-900 p-8">
            <div className="bg-pink-900 flex flex-col items-center pb-12">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png"
                alt="My Pic"
              />
              <h5 className="mb-2 text-xl font-medium text-gray-900 dark:text-white">
                Hi..
              </h5>
              <p className="text-lime-500 dark:text-lime-200 mb-2">
                Name: {userProfilee.username}
              </p>
              <p className="text-lime-500 dark:text-lime-200 mb-2">
                Email: {userProfilee.email}
              </p>
              <p className="text-lime-500 dark:text-lime-200 mb-2">
                Phone: {userProfilee.phone_no}
              </p>
            </div>
          </div>
        </div>

        {/* Right Card */}
        <div className="lg:w-1/2 lg:pl-20">
          <div className="w-full max-w-sm border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-8">
            <div className="flex flex-col items-center pb-12">
              <h5 className="mb-2 text-xl font-medium text-gray-900 dark:text-white">
                Wallet Will be here
              </h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfileCards;
