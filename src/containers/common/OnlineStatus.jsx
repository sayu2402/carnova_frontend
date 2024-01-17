import React, { useContext, useEffect, useState, useRef } from "react";
import AuthContext from "../../context/AuthContext";

const OnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(false);
  const { user, partner } = useContext(AuthContext);
  const socketRef = useRef(null);
  const isWebSocketOpen = useRef(false);

  useEffect(() => {
    if (user && partner) {
      const socket = new WebSocket("ws://localhost:8000/ws/online/");
      socketRef.current = socket;

      socket.onopen = () => {
        console.log("WebSocket connection opened");
        isWebSocketOpen.current = true;

        socket.send(
          JSON.stringify({
            username: user.username,
            type: "open",
          })
        );
      };

      window.addEventListener("beforeunload", async function (e) {
        e.preventDefault();

        if (isWebSocketOpen.current) {
          await socketRef.current.send(JSON.stringify({
            'username': user.username,
            'type': 'close'
          }));
          socketRef.current.close();
        }
      });

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setOnlineStatus(data.online_status);
      };

      socket.onclose = () => {
        console.log("WebSocket connection closed");
        isWebSocketOpen.current = false;
      };

      return () => {
        if (isWebSocketOpen.current) {
          socketRef.current.send(JSON.stringify({
            'username': user.username,
            'type': 'close'
          }));
          socketRef.current.close();
        }
      };
    }
  }, [user]);

  return (
    <div>
      {onlineStatus !== null ? (
        <p>User is {onlineStatus ? 'online' : 'offline'}</p>
      ) : (
        <p>Loading online status...</p>
      )}
    </div>
  );
};

export default OnlineStatus;
