import React, { useState } from 'react';
import ".././styles.css"
import { BellIcon } from '@chakra-ui/icons';

const NotificationBadge = ({ count }) => {
  // State to manage the count of notifications
  const [notificationCount, setNotificationCount] = useState(count);

  return (
    <div className="notification-badge">
     
      {count==0?(<span></span>):(<span className="badge-count">{count}</span>)}
      
      <BellIcon fontSize="2xl" m={1} />
    </div>
  );
};

export default NotificationBadge;