import React, { useState, useEffect, useContext, useRef } from "react";
import axiosInstance from "../../axios/axios";
import AuthContext from "../../context/AuthContext";

function ChatSidebar({ setSelectedVendor, selectedVendor }) {
  const [chattedVendors, setChattedVendors] = useState([]);
  const { user } = useContext(AuthContext);


  useEffect(() => {
    axiosInstance
      .get(`/api/chat/messages/${user.user_id}/`)
      .then((response) => {
        const vendorData = response.data.receiver_details || {};
        const avatarURL =
          "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png";
        const vendorsArray = Object.entries(vendorData).map(
          ([vendorName, data]) => ({
            vendorName,
            receiver_id: data.receiver_id,
            messages: data.messages?.reverse() || [],
            avatar: avatarURL,
          })
        );
        setChattedVendors(vendorsArray);
      })
      .catch((error) => {
        console.error("Error fetching chatted vendors:", error);
        setChattedVendors([]);
      });
  }, [user.user_id]);

  const handleVendorSelect = (vendor) => {
    console.log("Selected Vendor in ChatSidebar:", vendor);
    setSelectedVendor(vendor);
  };

  return (
    <div className="sidebar">
      <h2 className="text-lg font-semibold mb-4">History</h2>
      <ul>
        {chattedVendors.map((vendor) => (
          <li
            key={vendor.receiver_id}
            className={`flex flex-col items-start mb-4 md:flex-row md:items-center md:mb-2 ${
              selectedVendor && selectedVendor.receiver_id === vendor.receiver_id
                ? "selected"
                : ""
            }`}
            onClick={() => handleVendorSelect(vendor)}
          >
            <img
              src={vendor.avatar}
              alt={`${vendor.vendorName}'s Avatar`}
              className="rounded-full w-16 h-16 md:w-12 md:h-12 mr-0 mb-2 md:mr-4 md:mb-0"
            />
            <div className="md:ml-4">
              <strong>{vendor.vendorName}</strong>
              <div className="text-gray-500 text-sm">
                {vendor.messages.length > 0
                  ? formatTime(vendor.messages[0]?.timestamp)
                  : ""}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const today = new Date();

  if (date.toDateString() === today.toDateString()) {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else {
    return date.toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
};

export default ChatSidebar;
