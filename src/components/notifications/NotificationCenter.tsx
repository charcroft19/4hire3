import React, { useState } from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { Bell, X, Check } from 'lucide-react';
import { format } from 'date-fns';

const NotificationCenter: React.FC = () => {
  const { notifications, markAsRead, clearNotifications, unreadCount } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <Check className="text-green-500" size={16} />;
      case 'warning':
        return <Bell className="text-yellow-500" size={16} />;
      case 'error':
        return <X className="text-red-500" size={16} />;
      default:
        return <Bell className="text-blue-500" size={16} />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
              <button
                onClick={clearNotifications}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Clear all
              </button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-200 ${
                    notification.read ? 'bg-white' : 'bg-blue-50'
                  }`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {notification.message}
                      </p>
                      <div className="mt-2 text-xs text-gray-400">
                        {format(notification.timestamp, 'MMM d, yyyy h:mm a')}
                      </div>
                    </div>
                    {!notification.read && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <Check size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;