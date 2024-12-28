import { useState, useEffect } from "react";
import ChatWindow from "./component/ChatWindow";
import MessageInput from "./component/MessageInput";
import UserList from "./component/UserList";

function ChatApplication() {
  const [messages, setMessages] = useState([]);
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [users] = useState([
    { id: 1, name: "Abdalla" },
    { id: 2, name: "Ahmad" },
    { id: 3, name: "Moath" },
    { id: 4, name: "Sara" },
  ]);

  const sendMessage = (newMessage, author = "Abdalla") => {
    const message = {
      id: Date.now(),
      text: newMessage,
      timestamp: new Date().toLocaleTimeString(),
      author,
    };
    setMessages((prevMessages) => [...prevMessages, message]);
    setWaitingForResponse(true);
  };

  useEffect(() => {
    const simulatedMessages = [
      "Hello there!",
      "How's it going?",
      "What's up everyone?",
      "Let's plan something fun!",
      "Any updates for today?",
      "Good vibes only!",
    ];

    const intervalId = setInterval(() => {
      if (waitingForResponse) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const randomMessage =
          simulatedMessages[
            Math.floor(Math.random() * simulatedMessages.length)
          ];
        sendMessage(randomMessage, randomUser.name);
        setWaitingForResponse(false);
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [waitingForResponse, users]); // Dependencies

  return (
    <div className="App">
      <div className="grid grid-cols-3 gap-4 p-6">
        <UserList users={users} />
        <div className="col-span-2">
          <ChatWindow messages={messages} />
          <MessageInput sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
}

export default ChatApplication;
