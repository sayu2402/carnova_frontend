import React, { useState } from "react";

function MessageInput({ socket, onSendMessage }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();

    if (inputValue && socket && socket.readyState === WebSocket.OPEN) {
      const data = {
        message: inputValue,
      };
      socket.send(JSON.stringify(data));
    //   onSendMessage(inputValue);
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSendMessage}>
      <div className="message-input">
        <textarea
          placeholder="Type Your Message"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit">Send</button>
      </div>
    </form>
  );
}

export default MessageInput;
