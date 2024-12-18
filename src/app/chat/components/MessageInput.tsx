// components/MessageInput.tsx
import React, { useState } from "react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-300">
      <input
        type="text"
        className="w-full p-2 border rounded-md"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" className="mt-2 w-full bg-blue-500 text-white p-2 rounded-md">
        Send
      </button>
    </form>
  );
};

export default MessageInput;
