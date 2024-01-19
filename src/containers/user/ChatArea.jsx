import React, { useState, useEffect, useContext, useRef } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import AuthContext from "../../context/AuthContext";
import axiosInstance from "../../axios/axios";
import { v4 as uuidv4 } from "uuid";
const baseURL = process.env.REACT_APP_BASE_URL


function ChatArea({ selectedVendor }) {
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const MemoizedMessageInput = React.memo(MessageInput);
  const lastMessageRef = useRef(null);
  const [onlineStatus, setOnlineStatus] = useState(false);

  // Function to fetch messages from the API
  const fetchMessagesFromAPI = async () => {
    console.log("selected vendor in chat area", selectedVendor);

    try {
      const response = await axiosInstance.get(
        `/api/chat/messages/${user.user_id}/${selectedVendor.user.id}`
        );
        console.log("reposne in messagelist",response)
      const { data } = response;
      const selectedVendorMessages = data.messages;
      setMessages(selectedVendorMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessages([]);
    }
  };

  useEffect(() => {
    let newSocket;

    if (user && selectedVendor) {
      newSocket = new WebSocket(
        `ws://${baseURL}/ws/chat/${user.user_id}/${selectedVendor.user.id}/`
      );
      setSocket(newSocket);

      newSocket.onopen = () => {
        console.log("WebSocket connected");
        // Fetch messages when the WebSocket connection is established
        fetchMessagesFromAPI();
      };

      newSocket.onclose = () => console.log("WebSocket disconnected");
    }

    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, [user, selectedVendor]);

  useEffect(() => {
    if (socket) {
      const handleSocketMessage = (event) => {
        const data = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, data]);
      };

      socket.onmessage = handleSocketMessage;

      return () => {
        socket.onmessage = null;
      };
    }
  }, [socket]);

  useEffect(() => {
    // 👇️ scroll to the bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (newMessageText) => {
    const newMessage = {
      id: uuidv4(),
      sender: user.user_id,
      receiver: selectedVendor.user.id,
      message: newMessageText,
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages) => [newMessage, ...prevMessages]);
  };

  return (
    <div className="chat-area">
      <div className="chat-header">
        {selectedVendor && (
          <h2>
            {selectedVendor.user.username}
          </h2>
        )}
      </div>
      <div className="messages">
        {messages.map((message) => (
          <Message
            key={message.id}
            text={message.message}
            sender={message.sender === user.user_id}
            timestamp={message.timestamp}
          />
        ))}
        <div ref={lastMessageRef} />
      </div>
      {socket && (
        <MemoizedMessageInput onSendMessage={addMessage} socket={socket} />
      )}
    </div>
  );
}

export default ChatArea;
