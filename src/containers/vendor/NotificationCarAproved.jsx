import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotificationCarApproved = () => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // const socket = new WebSocket("ws://localhost:8000/ws/notification/");

    const socket = new WebSocket("wss://car.gotashoess.online/ws/notification/");


    socket.onopen = function (event) {
      console.log("WebSocket connection opened:", event);
    };

    socket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      if (data.notification_type === "car_approved") {
        setNotification(data.message);
        toast.success(data.message);
      } else if (data.notification_type === "car_rejected") {
        setNotification(data.message);
        toast.error(data.message);
      }
    };

    socket.onclose = function (event) {
      console.log("WebSocket connection closed:", event);
    };

    return () => {
      socket.close();
    };
  }, []);

  return <div></div>;
};

export default NotificationCarApproved;
