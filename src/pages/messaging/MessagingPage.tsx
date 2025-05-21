import React, { useState } from 'react';
import { useMessages } from '../../context/MessageContext';
import { useAuth } from '../../context/AuthContext';
import ConversationList from '../../components/messaging/ConversationList';
import MessageList from '../../components/messaging/MessageList';
import MessageInput from '../../components/messaging/MessageInput';
import { Plus, Search, X } from 'lucide-react';

const MessagingPage: React.FC = () => {
  const { user } = useAuth();
  const { conversations, sendMessage, getMessages } = useMessages();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [newRecipient, setNewRecipient] = useState('');

  if (!user) return null;

  const messages = selectedConversation ? getMessages(selectedConversation) : [];

  const handleNewMessage = () => {
    if (!newRecipient.trim()) return;
    
    const conversationId = [user.id, newRecipient].sort().join('-');
    setSelectedConversation(conversationId);
    setShowNewMessage(false);
    setNewRecipient('');
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-4rem)]">
      <div className="bg-white rounded-lg shadow-md h-full flex overflow-hidden">
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">Messages</h2>
              <button
                onClick={() => setShowNewMessage(true)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
              >
                <Plus size={20} />
              </button>
            </div>

            {showNewMessage && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Enter recipient ID..."
                    value={newRecipient}
                    onChange={(e) => setNewRecipient(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => setShowNewMessage(false)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                </div>
                <button
                  onClick={handleNewMessage}
                  className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Start Conversation
                </button>
              </div>
            )}
          </div>
          <div className="flex-1 overflow-y-auto">
            <ConversationList
              conversations={conversations}
              onSelect={setSelectedConversation}
              selectedId={selectedConversation || undefined}
            />
          </div>
        </div>
        
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-medium text-gray-800">
                  {conversations.find(c => c.id === selectedConversation)?.participants[1]}
                </h3>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                <MessageList
                  messages={messages}
                  currentUserId={user.id}
                />
              </div>
              
              <MessageInput
                onSend={(content) => {
                  const [, receiverId] = selectedConversation.split('-');
                  sendMessage(receiverId, content);
                }}
              />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <p>Select a conversation or start a new one</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagingPage;