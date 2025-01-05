import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const MessageInput = ({ sendMessage }) => {
  const [message, setMessage] = useState("");

  // Handle the change in the input field
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  // Handle the send button click
  const handleSendClick = () => {
    if (message.trim()) {
      // Ensure the message is not empty or just whitespace
      sendMessage(message);
      setMessage(""); // Clear input field after sending
    }
  };

  return (
    <Box sx={{ padding: 2, backgroundColor: "#f5f5f5" }}>
      <TextField
        fullWidth
        value={message}
        onChange={handleChange}
        placeholder="Type a message..."
        variant="outlined"
        sx={{ marginBottom: 1 }}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSendClick}
        sx={{ padding: "10px", borderRadius: "8px" }}
      >
        Send
      </Button>
    </Box>
  );
};

export default MessageInput;
