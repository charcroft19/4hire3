import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
}

interface MessageContextType {
  messages: Message[];
  conversations: Conversation[];
  sendMessage: (receiverId: string, content: string) => void;
  markAsRead: (messageId: string) => void;
  getConversation: (userId: string) => Conversation | undefined;
  getMessages: (conversationId: string) => Message[];
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const storedMessages = localStorage.getItem('messages');
    const storedConversations = localStorage.getItem('conversations');
    
    if (storedMessages) {
      const parsedMessages = JSON.parse(storedMessages);
      setMessages(parsedMessages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })));
    }
    
    if (storedConversations) {
      setConversations(JSON.parse(storedConversations));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
    localStorage.setItem('conversations', JSON.stringify(conversations));
  }, [messages, conversations]);

  const sendMessage = (receiverId: string, content: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'current-user',
      receiverId,
      content,
      timestamp: new Date(),
      read: false
    };

    setMessages(prev => [...prev, newMessage]);
    
    const conversationId = [newMessage.senderId, receiverId].sort().join('-');
    const existingConversation = conversations.find(c => c.id === conversationId);
    
    if (existingConversation) {
      setConversations(prev => prev.map(conv => 
        conv.id === conversationId
          ? {
              ...conv,
              lastMessage: newMessage,
              unreadCount: conv.unreadCount + 1
            }
          : conv
      ));
    } else {
      setConversations(prev => [...prev, {
        id: conversationId,
        participants: [newMessage.senderId, receiverId],
        lastMessage: newMessage,
        unreadCount: 1
      }]);
    }
  };

  const markAsRead = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, read: true } : msg
    ));
    
    const message = messages.find(m => m.id === messageId);
    if (message) {
      const conversationId = [message.senderId, message.receiverId].sort().join('-');
      setConversations(prev => prev.map(conv => 
        conv.id === conversationId
          ? { ...conv, unreadCount: Math.max(0, conv.unreadCount - 1) }
          : conv
      ));
    }
  };

  const getConversation = (userId: string) => {
    return conversations.find(conv => conv.participants.includes(userId));
  };

  const getMessages = (conversationId: string) => {
    const [user1, user2] = conversationId.split('-');
    return messages.filter(msg => 
      (msg.senderId === user1 && msg.receiverId === user2) ||
      (msg.senderId === user2 && msg.receiverId === user1)
    ).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  };

  return (
    <MessageContext.Provider value={{
      messages,
      conversations,
      sendMessage,
      markAsRead,
      getConversation,
      getMessages
    }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};