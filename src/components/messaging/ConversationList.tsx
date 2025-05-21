import React from 'react';
import { format } from 'date-fns';
import Avatar from '../common/Avatar';

interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: {
    content: string;
    timestamp: Date;
  };
  unreadCount: number;
}

interface ConversationListProps {
  conversations: Conversation[];
  onSelect: (conversationId: string) => void;
  selectedId?: string;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  onSelect,
  selectedId
}) => {
  return (
    <div className="divide-y divide-gray-200">
      {conversations.map(conversation => (
        <button
          key={conversation.id}
          onClick={() => onSelect(conversation.id)}
          className={`w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 ${
            selectedId === conversation.id ? 'bg-blue-50' : ''
          }`}
        >
          <Avatar
            src=""
            alt={conversation.participants[1]}
            size="md"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {conversation.participants[1]}
              </h3>
              {conversation.lastMessage && (
                <span className="text-xs text-gray-500">
                  {format(conversation.lastMessage.timestamp, 'p')}
                </span>
              )}
            </div>
            
            <div className="flex justify-between items-center">
              {conversation.lastMessage ? (
                <p className="text-sm text-gray-500 truncate">
                  {conversation.lastMessage.content}
                </p>
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No messages yet
                </p>
              )}
              
              {conversation.unreadCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-600 rounded-full">
                  {conversation.unreadCount}
                </span>
              )}
            </div>
          </div>
        </button>
      ))}
      
      {conversations.length === 0 && (
        <div className="px-4 py-8 text-center text-gray-500">
          <p>No conversations yet</p>
        </div>
      )}
    </div>
  );
};

export default ConversationList;