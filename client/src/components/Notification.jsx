import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import  { getUserNotifications } from '../services/notificationService';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await getUserNotifications();
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div>
            {notifications.length > 0 ? (
                notifications.map((notification) => (
                    <Alert key={notification.id} variant={notification.type}>
                        {notification.message}
                    </Alert>
                ))
            ) : (
                <Alert variant="info">No notifications available.</Alert>
            )}
        </div>
    );
};

export default Notification;