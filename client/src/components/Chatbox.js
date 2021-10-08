import { useState } from "react";
import useChat from './hooks/useChat'

export default function Chatbox({ user, roomName }) {
    const { messages, sendMessage } = useChat(user.username)
    const [newMessage, setNewMessage] = useState("")

    const handleNewMessageChange = (event) => {
        console.log(event.target.value)
        setNewMessage(event.target.value);
    }

    const handleSendMessage = () => {
        sendMessage(newMessage)
        setNewMessage('')
    }

    return (
        <>
            <h1 style={{ color: "black" }}>Room: {roomName}</h1>
            <div className="message-container">
                <ul className="message-list">
                    {messages.map((message, i) => {
                        {console.log(message)}
                        return <li key={i} className="message-li">
                            <span className="chatbox-username">{message.username} </span><br/>
                            {message.text}
                        </li>
                    })
                    }
                </ul>
            </div>
            <input type="text" value={newMessage}
            onChange={handleNewMessageChange}
            placeholder="Write your message..."
            className="new-message-input-field" 
            /><br/>
            <button onClick={handleSendMessage} className="send-message-btn">
                Send
            </button>
        </>
    )
}