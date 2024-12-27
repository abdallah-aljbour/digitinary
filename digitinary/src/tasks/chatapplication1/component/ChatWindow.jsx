// import React, { useEffect, useRef } from "react";
// import Message from "./Message";

// const ChatWindow = ({ messages }) => {
//   const messagesEndRef = useRef(null); // Create a ref to scroll to the last message

//   // Scroll to the bottom whenever the messages array updates
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]); // This effect runs every time messages change

//   return (
//     <div className="p-4 bg-gray-200 h-96 overflow-y-auto">
//       <div className="space-y-4">
//         {messages.map((message) => (
//           <Message key={message.id} message={message} />
//         ))}
//       </div>
//       {/* Invisible div to mark the end of messages */}
//       <div ref={messagesEndRef} />
//     </div>
//   );
// };

// export default ChatWindow;

import React, { useEffect, useRef } from "react";
import Message from "./Message";

const ChatWindow = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-96 bg-white rounded-xl shadow-2xl overflow-hidden">
      {/* Enhanced header with more details */}
      <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h3 className="font-semibold">Ahmad</h3>
            <p className="text-xs text-blue-100">Active Now</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <button className="hover:bg-blue-600 p-2 rounded-full transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </button>
          <button className="hover:bg-blue-600 p-2 rounded-full transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages container with enhanced styling */}
      <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="animate-fade-in">
              <Message message={message} />
            </div>
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Added a subtle footer */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center text-xs text-gray-400">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Messages are end-to-end encrypted
          </div>
        </div>
      </div>
    </div>
  );
};

// Add this CSS to your styles
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-fade-in {
    animation: fadeIn 0.3s ease-in-out;
  }
`;

export default ChatWindow;
