import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../../axios/axios";
import AuthContext from "../../context/AuthContext";
import OnlineStatus from "../common/OnlineStatus";

function ChatSidebar({ setSelectedVendor, selectedVendor }) {
  const [bookedVendors, setBookedVendors] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Fetch booked vendors
    axiosInstance
      .get(`/api/chat/message/${user.user_id}/`)
      .then((response) => {
        setBookedVendors(response.data.booked_vendors);
      })
      .catch((error) => {
        console.error("Error fetching booked vendors:", error);
        setBookedVendors([]);
      });
  }, [user.user_id]);

  const handleVendorSelect = (vendor) => {
    setSelectedVendor(vendor);
  };

  return (
    <div className="sidebar">
      <h2 className="text-lg font-semibold mb-4">History</h2>
      <ul>
        {/* Display booked vendors */}
        {bookedVendors.map((vendor) => (
          <li
            key={vendor.id}
            className={`flex flex-col items-start mb-4 md:flex-row md:items-center md:mb-2 ${
              selectedVendor &&
              selectedVendor.receiver_id === vendor.receiver_id
                ? "selected"
                : ""
            }`}
            onClick={() => handleVendorSelect(vendor)}
          >
            <img
              src={
                vendor.user.profile_photo ||
                "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png"
              }
              alt={`${vendor.user.username}'s Avatar`}
              className="rounded-full w-16 h-16 md:w-12 md:h-12 mr-0 mb-2 md:mr-4 md:mb-0"
            />
            <div>
              <strong>{vendor.user.username}</strong>
              <OnlineStatus/>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatSidebar;
