// components/ChatList.tsx
import React from "react";

interface ChatListProps {
  onSelectChat: (chatId: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ onSelectChat }) => {
  // Giả lập danh sách các cuộc trò chuyện (có thể lấy từ API)
  const chats = [
    { id: "chat1", name: "User1" },
    { id: "chat2", name: "User2" },
  ];

  return (
    <div className="w-1/3 border-r border-gray-300">
      <h2 className="text-xl font-bold p-4">Chats</h2>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className="p-4 cursor-pointer hover:bg-gray-100"
          >
            {chat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
