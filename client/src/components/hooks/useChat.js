import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import io from "socket.io-client"

let socket

const useChat = (username) => {
  const { game_id } = useParams()

  const [messages, setMessages] = useState([]); // Sent and received messages
  useEffect(() => {
    socket = io("http://localhost:9000")
  }, [])
  
  useEffect(() => {
    const data = {
      username: username,
      roomId: game_id
    } 
    socket.emit('JOIN_ROOM', data)
  }, [game_id])


  useEffect(() => {
    
    // Listens for incoming messages
    socket.on("message", (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socket.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });
    
    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socket.disconnect();
    };
  }, [game_id]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (messageBody) => {
    socket.emit("sendMessage", {
      username: username,
      text: messageBody,
      senderId: socket.id
    });
  };

  return { messages, sendMessage };
};

export default useChat;