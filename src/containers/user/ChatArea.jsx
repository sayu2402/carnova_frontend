import React, { useState, useEffect, useContext } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import AuthContext from "../../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import axiosInstance from "../../axios/axios"; // Import your axios instance

function ChatArea({ selectedVendor }) {
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const MemoizedMessageInput = React.memo(MessageInput);

  // Function to fetch messages from the API
  const fetchMessagesFromAPI = async (userId, receiverId) => {
    try {
      const response = await axiosInstance.get(`/api/chat/messages/${userId}/${receiverId}/`);
      const fetchedMessages = response.data.messages || [];
      setMessages(fetchedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    let newSocket;

    if (user && selectedVendor) {
      newSocket = new WebSocket(
        `ws://localhost:8000/ws/chat/${user.user_id}/${selectedVendor.receiver_id}/`
      );
      setSocket(newSocket);

      newSocket.onopen = () => {
        console.log("WebSocket connected");
        // Fetch messages when the WebSocket connection is established
        fetchMessagesFromAPI(user.user_id, selectedVendor.receiver_id);
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
        console.log(event.data, "event tat");
        const data = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, data]);
      };

      socket.onmessage = handleSocketMessage;

      return () => {
        socket.onmessage = null;
      };
    }
  }, [socket]);

  // Responsible for initial rendering
  useEffect(() => {
    setMessages(selectedVendor ? selectedVendor.messages : []);
  }, [selectedVendor]);

  const addMessage = (newMessageText) => {
    console.log(newMessageText, "nre jgfj");
    const newMessage = {
      id: uuidv4(),
      sender: user.user_id,
      receiver: selectedVendor.receiver_id,
      message: newMessageText,
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages) => [newMessage, ...prevMessages]);
  };

  return (
    <div className="chat-area">
      <div className="chat-header">
        {selectedVendor && <h2>{selectedVendor.vendorName}</h2>}
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
      </div>
      {socket && (
        <MemoizedMessageInput onSendMessage={addMessage} socket={socket} />
      )}
    </div>
  );
}

export default ChatArea;
