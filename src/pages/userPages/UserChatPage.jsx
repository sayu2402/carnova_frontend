import React, { useState} from "react";
import NavBar from "../../containers/common/NavBar";
import Footer from "../../containers/common/Footer";
import ChatSidebar from "../../containers/user/ChatSidebar";
import ChatArea from "../../containers/user/ChatArea";

function UserChatPage() {
  const [selectedVendor, setSelectedVendor] = useState(null);

  const handleVendorSelect = (vendor) => {
    setSelectedVendor(vendor);
  };

  return (
    <>
      <NavBar />
      <div className="chat-container">
        <ChatSidebar
          setSelectedVendor={setSelectedVendor}
          selectedVendor={selectedVendor}
        />
        <ChatArea selectedVendor={selectedVendor} />
      </div>
      <Footer />
    </>
  );
}

export default UserChatPage;
