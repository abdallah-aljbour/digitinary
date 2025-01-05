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
import { Box, Typography, Avatar, IconButton, Paper } from "@mui/material";
import {
  Chat as ChatIcon,
  Videocam as VideocamIcon,
} from "@mui/icons-material";

const ChatWindow = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "96%",
        borderRadius: "16px",
        boxShadow: 3,
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={2}
        py={1}
        sx={{
          background: "linear-gradient(to right, #1e88e5, #1565c0)",
          color: "white",
        }}
      >
        <Box display="flex" alignItems="center">
          <Avatar sx={{ width: 40, height: 40, border: "2px solid white" }} />
          <Box ml={2}>
            <Typography variant="subtitle1" fontWeight="bold">
              Ahmad
            </Typography>
            <Typography variant="body2">Active Now</Typography>
          </Box>
        </Box>
        <Box display="flex">
          <IconButton color="inherit">
            <ChatIcon />
          </IconButton>
          <IconButton color="inherit">
            <VideocamIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Messages Container */}
      <Box
        sx={{
          flexGrow: 1,
          p: 2,
          overflowY: "auto",
          background: "linear-gradient(to bottom, #fafafa, white)",
        }}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </Box>
        <div ref={messagesEndRef} />
      </Box>

      {/* Footer */}
      <Box
        px={2}
        py={1}
        sx={{ backgroundColor: "#fafafa", borderTop: "1px solid #e0e0e0" }}
      >
        <Typography variant="caption" color="textSecondary">
          <Box display="flex" alignItems="center">
            <Box
              sx={{
                width: 8,
                height: 8,
                backgroundColor: "green",
                borderRadius: "50%",
                marginRight: 1,
              }}
            />
            Messages are end-to-end encrypted
          </Box>
        </Typography>
      </Box>
    </Paper>
  );
};

export default ChatWindow;
