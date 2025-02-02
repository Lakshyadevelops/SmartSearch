import React from "react";

const MessageCard = ({ message, isSender }) => {
    return (
        <div className={`flex mb-2 ${isSender ? "justify-end" : "justify-start"}`}>
            <div className={`px-4 py-2 rounded-lg max-w-xs ${isSender ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>
                {message}
            </div>
        </div>
    );
};

export default MessageCard;
