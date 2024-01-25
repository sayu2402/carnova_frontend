import React, { useContext, useEffect, useState, useRef } from "react";
import AuthContext from "../../context/AuthContext";
const baseURL = process.env.REACT_APP_BASE_URL


const OnlineStatusVendor = () => {
  const [onlineStatus, setOnlineStatus] = useState(false);
  const { partner } = useContext(AuthContext);
  const socketRef = useRef(null);
  const isWebSocketOpen = useRef(false);

  useEffect(() => {
    if (partner) {
      const socket = new WebSocket(`ws://${baseURL}/ws/online/`);
      socketRef.current = socket;

      socket.onopen = () => {
        // console.log("WebSocket connection opened");
        isWebSocketOpen.current = true;

        socket.send(
          JSON.stringify({
            username: partner.partnername,
            type: "open",
          })
        );
      };

      window.addEventListener("beforeunload", async function (e) {
        e.preventDefault();

        if (isWebSocketOpen.current) {
          await socketRef.current.send(JSON.stringify({
            'username': partner.partnername,
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
        // console.log("WebSocket connection closed");
        isWebSocketOpen.current = false;
      };

      return () => {
        if (isWebSocketOpen.current) {
          socketRef.current.send(JSON.stringify({
            'username': partner.partnername,
            'type': 'close'
          }));
          socketRef.current.close();
        }
      };
    }
  }, [partner]);

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

export default OnlineStatusVendor;
