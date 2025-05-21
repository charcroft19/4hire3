import React from 'react';
import { format } from 'date-fns';
import Avatar from '../common/Avatar';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUserId }) => {
  return (
    <div className="flex flex-col space-y-4">
      {messages.map(message => {
        const isOwnMessage = message.senderId === currentUserId;
        
        return (
          <div
            key={message.id}
            className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-end space-x-2 max-w-[70%] ${isOwnMessage ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <Avatar
                src=""
                alt={isOwnMessage ? "You" : "Other user"}
                size="sm"
              />
              
              <div className={`rounded-lg px-4 py-2 ${
                isOwnMessage 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm">{message.content}</p>
                <div className={`text-xs mt-1 ${
                  isOwnMessage ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {format(message.timestamp, 'p')}
                  {isOwnMessage && (
                    <span className="ml-2">
                      {message.read ? '✓✓' : '✓'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;