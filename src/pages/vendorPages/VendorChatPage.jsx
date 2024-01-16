import React, { useState } from "react";
import NavBar from "../../containers/common/NavBar";
import Footer from "../../containers/common/Footer";
import ChatSidebarVendor from "../../containers/vendor/ChatSidebarVendor";
import ChatAreaVendor from "../../containers/vendor/ChatAreaVendor";

function VendorChatPage() {
  const [selectedVendor, setSelectedVendor] = useState(null);

  const handleVendorSelect = (vendor) => {
    setSelectedVendor(vendor);
  };
  return (
    <>
      <NavBar />
      <div className="chat-container">
        <ChatSidebarVendor
          setSelectedVendor={setSelectedVendor}
          selectedVendor={selectedVendor}
        />
        <ChatAreaVendor selectedVendor={selectedVendor} />
      </div>
      <Footer />
    </>
  );
}

export default VendorChatPage;
