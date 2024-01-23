import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationComponent = () => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('wss://car.gotashoess.online/ws/notification/');

    socket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      if (data.notification_type === 'car_approved' || data.notification_type === 'car_rejected') {
        setNotification(data.message);
        toast.success(data.message);
      }
    };

    socket.onerror = function (error) {
      console.error('WebSocket Error:', error);
    };

    socket.onclose = function (event) {
      console.log('WebSocket disconnected');
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}
    </div>
  );
};

export default NotificationComponent;
