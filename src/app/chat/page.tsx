"use client"; 
import React, { useEffect, useState } from "react";
import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";

interface Message {
  _id: string;
  content: string;
  sender: string;
  recipient: string;
}

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser) {
      setUser(storedUser);
    }

    if (storedToken) {
      console.log("Token found:", storedToken);
    } else {
      console.log("Token not found");
    }
  }, []);

  const fetchMessages = async (recipient: string) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token is missing");
      }

      const response = await fetch(
        `http://127.0.0.1:5000/chat/messages?recipient=${recipient}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        throw new Error("Failed to fetch messages");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!selectedChat) return;

    const sender = "user1";
    const recipient = selectedChat;

    try {
      const response = await fetch("http://127.0.0.1:5000/chat/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          content: message,
          sender,
          recipient,
          timestamp: new Date().toISOString(),
        }),
      });
      const data = await response.json();
      if (data.status === "success") {
        setMessages((prevMessages) => [
          ...prevMessages,
          { content: message, sender, recipient, _id: Date.now().toString() },
        ]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleChatSelect = (chatId: string) => {
    setSelectedChat(chatId); // Cập nhật cuộc trò chuyện được chọn
    fetchMessages(chatId);   // Lấy tin nhắn cho chat đã chọn
  };

  return (
    <div className="flex h-screen">
      <ChatList onSelectChat={handleChatSelect} />
      <div className="flex flex-1 flex-col">
        {selectedChat ? (
          <>
            <ChatWindow messages={messages} />
            <MessageInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <h2 className="text-gray-500">Select a chat to start messaging</h2>
          </div>
        )}
      </div>
    </div>
  );
}
