import React from "react";
const Message = ({ message }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="font-semibold text-gray-800">{message.author}</div>
      <div className="text-gray-700">{message.text}</div>
      <div className="text-sm text-gray-500">{message.timestamp}</div>
    </div>
  );
};
export default Message;
