import React, { useState } from "react";

const MessageInput = ({ sendMessage }) => {
  const [message, setMessage] = useState("");

  // Handle the change in the input field
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  // Handle the send button click
  const handleSendClick = () => {
    if (message.trim()) {
      //is not empty , This ensures that the user cannot send empty or just whitespace messages.
      sendMessage(message);
      setMessage(""); // Clear input field after sending
    }
  };

  return (
    <div className="p-4 bg-gray-200">
      <input
        type="text"
        value={message} //makes the input a "controlled component," meaning its value is determined by the state.
        onChange={handleChange}
        placeholder="Type a message..."
        className="w-full p-2 border border-gray-300 rounded-lg"
      />
      <button
        onClick={handleSendClick}
        className="mt-2 w-full p-2 bg-blue-500 text-white rounded-lg"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
