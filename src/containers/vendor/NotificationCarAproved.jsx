import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationCarApproved = () => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/notification/');

    socket.onopen = function (event) {
        console.log('WebSocket connection opened:', event);
      };
      
      socket.onmessage = function (event) {
        console.log('WebSocket message received:', event.data);
        const data = JSON.parse(event.data);
        console.log('Parsed data:', data);
        console.log("notification_type", data.notification_type)
        if (data.notification_type === 'car_approved') {
          console.log('Handling car_approved notification:', data.message);
          setNotification(data.message);
          toast.success(data.message);
        }
      };
      
      socket.onclose = function (event) {
        console.log('WebSocket connection closed:', event);
      };

    return () => {
      socket.close();
    };
  }, []);


  return (
    <div>
      
    </div>
  );
};

export default NotificationCarApproved;
