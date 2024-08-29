"use client"

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;

const useSocketActivity = (userId) => {
  const [isTabActive, setIsTabActive] = useState(true);

  useEffect(() => {
    // Initialize the socket connection
    socket = io('http://localhost:5000/api/v2/', { withCredentials: true });

    // Emit the user-connected event
    socket.emit('user-connected', userId);

    // Track user activity (mouse movements, key presses, etc.)
    const handleUserActivity = () => {
      socket.emit('activity', { userId, activityType: 'user-active' });
    };

    // Handle inactivity (e.g., when the user becomes inactive)
    const handleInactivity = () => {
      socket.emit('inactive', userId);
    };

    // Detect tab changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setIsTabActive(true);
        socket.emit('tab-changed', userId);
      } else {
        setIsTabActive(false);
      }
    };

    // Add event listeners for activity tracking
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);

    // Add event listener for detecting tab change
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Emit inactive event after a period of no activity
    const inactivityTimeout = setTimeout(() => handleInactivity(), 30000); // Set a timeout for inactivity (30 seconds)

    return () => {
      // Clean up event listeners on unmount
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      clearTimeout(inactivityTimeout);
      socket.disconnect(); // Disconnect socket when the component unmounts
    };
  }, [userId]);

  return { isTabActive };
};

export default useSocketActivity;
