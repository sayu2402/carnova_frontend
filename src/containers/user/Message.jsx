import React from "react";

function Message({ text, sender, timestamp }) {
  const messageTime = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });


  return (
    <div className={`message ${sender ? "sent" : "recieved"}`}>
      <div className="message-bubble">
        {text}
        <div className="message-time">{messageTime}</div>
      </div>
    </div>
  );
}

export default Message;
