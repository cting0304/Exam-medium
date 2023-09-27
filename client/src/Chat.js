import React, { useEffect, useState, useContext, useRef } from 'react';
import io from 'socket.io-client';
import './App.css'; 
import UserContext from './UserContext';
import { Stack } from "react-bootstrap";
import moment from "moment";

const socket = io('http://localhost:3001', { autoConnect: false });

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const { user } = useContext(UserContext);
  const divRef = useRef(null);
  const uniqueMessageIds = useRef(new Set());

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  useEffect(() => {
    if (user == null || user === undefined) {
      return;
    }
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [user]);

  function handleSubmit(event) {
    event.preventDefault();
    if (input) {
      socket.emit('chat_message', user, input);
      setInput('');
    }
  }

  useEffect(() => {
    socket.on('received_message', (message) => {
      console.log('Received message:', message);
      
      if (!uniqueMessageIds.current.has(message.id)) {
        uniqueMessageIds.current.add(message.id);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: message.id,
            sender: message.sender,
            text: message.message,
          },
        ]);
  
        divRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
      }
    });
  }, []);

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="chat-container">
      <div className="message-container mb-3">
        <Stack gap={3}>
        {messages.map((message, index) => (
  <Stack
    key={index}
    className={`${
      message?.sender === user
        ? "message self align-self-end flex-grow-0"
        : "message align-self-start flex-grow-0"
    }`}
  >
    <div className={'mx-2 my-1 p-2 px-3 message-card'}>
      <div className="message-header">
        {message.sender}
      </div>
      <div className="message-text">
        {message.text}
      </div>
      <div className="message-footer">
        {moment(message.createdAt).calendar()}
      </div>
    </div>
  </Stack>
))}

        </Stack>
        <div ref={divRef} />
      </div>
      <form className="chat-form" onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={handleInputChange} placeholder="Type your message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
