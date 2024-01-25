import React, { useContext, useEffect, useState, useRef } from "react";
import AuthContext from "../../context/AuthContext";
const baseURL = process.env.REACT_APP_BASE_URL


const OnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(false);
  const { user } = useContext(AuthContext);
  const socketRef = useRef(null);
  const isWebSocketOpen = useRef(false);

  useEffect(() => {
    if (user) {
      const socket = new WebSocket(`wss://car.gotashoess.online/ws/online/${user.user_id}/`);
      socketRef.current = socket;

      socket.onopen = () => {
        // console.log("WebSocket connection opened");
        isWebSocketOpen.current = true;

        socket.send(
          JSON.stringify({
            user_id: user.user_id,
            type: "open",
          })
        );
      };

      window.addEventListener("beforeunload", async function (e) {
        e.preventDefault();

        if (isWebSocketOpen.current) {
          await socketRef.current.send(JSON.stringify({
            'user_id': user.user_id,
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
            'user_id': user.user_id,
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
        <p>{onlineStatus ? 'online' : 'offline'}</p>
      ) : (
        <p>Loading online status...</p>
      )}
    </div>
  );
};

export default OnlineStatus;