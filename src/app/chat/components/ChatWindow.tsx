// components/ChatWindow.tsx
import React from "react";

interface Message {
  _id: string;
  content: string;
  sender: string;
}

interface ChatWindowProps {
  messages: Message[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  return (
    <div className="flex-1 p-4 overflow-auto">
      <h2 className="text-xl font-bold">Chat</h2>
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message._id} className={`message ${message.sender === 'user1' ? 'bg-blue-200' : 'bg-gray-200'} p-3 rounded-md`}>
            <p>{message.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
