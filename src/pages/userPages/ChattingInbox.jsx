import React from "react";
import NavBar from "../../containers/common/NavBar";
import Footer from "../../containers/common/Footer";
import ChattingSideBar from "../../containers/common/ChattingSideBar";

const ChattingInbox = () => {
  return (
    <>
      <NavBar />

      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="bg-gray-200 w-1/4 p-4">
          {/* Sidebar content goes here */}

          <ChattingSideBar />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden">
          {/* Chat Header */}
          <div className="border-b-2 p-4">
            <h1 className="text-2xl font-bold">Chat with User</h1>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-scroll p-4">
            {/* Messages will go here */}
          </div>

          {/* Chat Input Box */}
          <div className="border-t-2 p-4">
            <textarea
              placeholder="Type your message..."
              className="w-full border rounded p-2"
            ></textarea>
            <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
              Send
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ChattingInbox;
