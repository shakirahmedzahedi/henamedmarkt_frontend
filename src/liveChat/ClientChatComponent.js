/* import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Paper, List, ListItem, Box, IconButton } from '@mui/material';
import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from "@stomp/stompjs";
import { v4 as uuidv4 } from 'uuid';
import { ChatBubbleOutline, Send } from '@mui/icons-material';

const ClientChatComponent = () => {
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [clientId] = useState(localStorage.getItem('clientId') || uuidv4());

  useEffect(() => {
    // Load chat history from local storage
    const savedMessages = JSON.parse(localStorage.getItem('chatHistory')) || [];
    setMessages(savedMessages);

    // WebSocket connection
    const socket = new SockJS('http://localhost:8080/ws'); // WebSocket endpoint
    const client = Stomp.over(socket);

    client.connect({}, () => {
      // Subscribe to the client's private queue
      client.subscribe(`/queue/${clientId}`, (message) => {
        const newMessage = JSON.parse(message.body);
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, newMessage];
          localStorage.setItem('chatHistory', JSON.stringify(updatedMessages)); // Save to local storage
          return updatedMessages;
        });
      });

      setStompClient(client);
    });

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [clientId]);

  const sendMessageToAgent = () => {
    if (stompClient && input.trim()) {
      const message = { sender: 'Client', message: input, clientId };
      stompClient.send('/app/sendMessageToAgent', {}, JSON.stringify(message)); // Send message to agent
      setInput('');
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, message];
        localStorage.setItem('chatHistory', JSON.stringify(updatedMessages)); // Save to local storage
        return updatedMessages;
      });
    }
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 20, right: 20, width: 300, borderRadius: 2 }}>
      <Paper sx={{ p: 2, maxHeight: 400, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6">Chat with Agent</Typography>
        <List sx={{ flex: 1, overflowY: 'auto' }}>
          {messages.map((msg, idx) => (
            <ListItem key={idx}>
              <Typography variant="body2" sx={{ fontWeight: msg.sender === 'Client' ? 'bold' : 'normal' }}>
                {msg.sender}: {msg.message}
              </Typography>
            </ListItem>
          ))}
        </List>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <IconButton onClick={sendMessageToAgent} sx={{ marginLeft: 1 }}>
            <Send />
          </IconButton>
        </Box>
      </Paper>
      <Button
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          borderRadius: '50%',
          minWidth: 50,
          minHeight: 50,
          backgroundColor: '#3f51b5',
          color: 'white',
        }}
        onClick={() => document.getElementById('chatBox').scrollIntoView({ behavior: 'smooth' })}
      >
        <ChatBubbleOutline />
      </Button>
    </Box>
  );
};

export default ClientChatComponent;
 */

import React, { useEffect, useRef, useState } from "react";
import {
    Box,
    IconButton,
    TextField,
    Typography,
    Avatar,
    Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import ChatIcon from "@mui/icons-material/Chat";
import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from "@stomp/stompjs";
import { v4 as uuidv4 } from 'uuid';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const ClientChatComponent = ({ onClose }) => {
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [clientId] = useState(localStorage.getItem('clientId') || uuidv4());
    const messagesEndRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('clientId', clientId); // Persist clientId

        let savedMessages = JSON.parse(localStorage.getItem('chatHistory')) || [];

        // Add welcome message if first time
        if (savedMessages.length === 0) {
            const welcomeMessage = {
                sender: "Agent",
                message: "Hello! How can I help you?",
                clientId,
            };
            savedMessages.push(welcomeMessage);
            localStorage.setItem('chatHistory', JSON.stringify(savedMessages));
        }

        setMessages(savedMessages);

        const socket = new SockJS('https://backend.henamedmarkt.com/ws');
        const client = Stomp.over(socket);

        client.connect({}, () => {
            client.subscribe(`/queue/${clientId}`, (message) => {
                const newMessage = JSON.parse(message.body);
                setMessages((prevMessages) => {
                    const isDuplicate = prevMessages.some(m =>
                      m.clientId === newMessage.clientId &&
                      m.message === newMessage.message &&
                      m.sender === newMessage.sender
                    );
              
                    if (isDuplicate) return prevMessages;
              
                    const updatedMessages = [...prevMessages, newMessage];
                    localStorage.setItem('chatHistory', JSON.stringify(updatedMessages));
                    return updatedMessages;
                  });
                });

            setStompClient(client);
        });

        return () => {
            if (client && client.connected) {
                client.disconnect();
            }
        };
    }, [clientId]);

    const sendMessageToAgent = () => {
        if (stompClient && input.trim()) {
            const message = { sender: 'Client', message: input, clientId };
            stompClient.send('/app/sendMessageToAgent', {}, JSON.stringify(message));
            setInput('');
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages, message];
                localStorage.setItem('chatHistory', JSON.stringify(updatedMessages));
                return updatedMessages;
            });
        }
    };

    const renderMessage = (msg, index) => {
        const isClient = msg.sender?.toLowerCase() === "client";
        return (
            <Box
                key={index}
                sx={{
                    display: "flex",
                    justifyContent: isClient ? "flex-end" : "flex-start",
                    mb: 1,
                }}
            >
               {!isClient && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        mr: 1,
                    }}
                >
                    <SupportAgentIcon color="primary" />
                    <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                        Admin
                    </Typography>
                </Box>
                )}
                <Paper
                    elevation={1}
                    sx={{
                        p: 1,
                        maxWidth: "75%",
                        whiteSpace: "pre-wrap",
                        backgroundColor: isClient ? "#e0f7fa" : "#e3f2fd",
                    }}
                >
                    <Typography variant="body2">{msg.message}</Typography>
                </Paper>
            </Box>
        );
    };

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                width: 350,
                height: 480,
                bgcolor: "#fff",
                borderRadius: 2,
                boxShadow: 4,
                display: "flex",
                flexDirection: "column",
                zIndex: 1300,
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    bgcolor: "primary.main",
                    color: "#fff",
                    px: 2,
                    py: 1,
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <ChatIcon sx={{ mr: 1 }} />
                <Typography variant="subtitle1" fontWeight="bold">
                    Live Chat
                </Typography>
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 4,
                        color: "#fff",
                    }}
                    size="small"
                >
                    <CloseIcon />
                </IconButton>
            </Box>

            {/* Messages */}
            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    px: 2,
                    py: 1,
                    bgcolor: "#f9f9f9",
                }}
            >
                {messages.map((msg, index) => renderMessage(msg, index))}
                <div ref={messagesEndRef} />
            </Box>

            {/* Input Area */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 1,
                    borderTop: "1px solid #eee",
                }}
            >
                <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    placeholder="Compose your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") sendMessageToAgent();
                    }}
                />
                <IconButton color="primary" onClick={sendMessageToAgent} sx={{ ml: 1 }}>
                    <SendIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default ClientChatComponent;

