import React, { useState, useEffect } from "react";
import NavBar from "../../containers/common/NavBar";
import Footer from "../../containers/common/Footer";
import ChatSidebar from "../../containers/user/ChatSidebar";
import ChatArea from "../../containers/user/ChatArea";
import axiosInstance from "../../axios/axios";

function UserChatPage() {
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log("selected-vendor:_+______++", selectedVendor)
    // Fetch messages for the selected vendor when it changes
    if (selectedVendor) {
      axiosInstance
        .get(`/api/chat/messages/${selectedVendor.receiver_id}/`)
        .then((response) => {
          const vendorMessages = response.data.messages || [];
          setMessages(vendorMessages);
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
          setMessages([]);
        });
    }
  }, [selectedVendor]);

  return (
    <>
      <NavBar />
      <div className="chat-container">
        <ChatSidebar
          setSelectedVendor={setSelectedVendor}
          selectedVendor={selectedVendor}
          latestMessageTimestamp={
            messages.length > 0 ? messages[0].timestamp : null
          }
        />
        <ChatArea selectedVendor={selectedVendor} />
      </div>
      <Footer />
    </>
  );
}

export default UserChatPage;
