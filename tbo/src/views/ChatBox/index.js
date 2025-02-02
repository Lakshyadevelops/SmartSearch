import React, { useState } from "react";
import MessageCard from "../MessageCard";
import SearchBox from "../SearchBox";

const ChatBox = () => {
    const [messages, setMessages] = useState([
        { text: "Hey, how are you?", isSender: false },
        { text: "I'm good, thanks for asking!", isSender: true },
        { text: "What can I help you with today?", isSender: false },
    ]);

    const handleSendMessage = (newMessage) => {
        if (newMessage.trim() !== "") {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: newMessage, isSender: true }
            ]);
        }
    };

    return (
        <div className="flex flex-col h-[350px] m-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md">
            {/* Messages container */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                {messages.map((msg, index) => (
                    <MessageCard key={index} message={msg.text} isSender={msg.isSender} />
                ))}
            </div>

            {/* SearchBox at the bottom */}
            <div className="p-2">
                <SearchBox onSendMessage={handleSendMessage} />
            </div>
        </div>
    );
};

export default ChatBox;
