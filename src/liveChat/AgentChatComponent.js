import React, { useEffect, useState } from 'react';
import {
  Box,
  IconButton,
  Typography,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Divider
} from '@mui/material';
import { Send, Chat, Close, Minimize, OpenInFull } from '@mui/icons-material';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { get } from '../reducer/api/APIService';

const AgentChatComponent = ({
  messages,
  setMessages,
  clientList,
  setClientList,
  lastMessageTime,
  setLastMessageTime,
  unread,
  setUnread,
  openDialogs,
  setOpenDialogs,
  stompClient,
  setStompClient,
  clearChatState,
  showClientList,
  setShowClientList
}) => {
  const [input, setInput] = useState('');
  const [minimizedDialogs, setMinimizedDialogs] = useState({});
  //const [showClientList, setShowClientList] = useState(true);

  useEffect(() => {
    let subscription;
    let client;

    const initializeChat = async () => {
      try {
        const response = await fetch('https://backend.henamedmarkt.com/api/v1/chat/clients');
        if (!response.ok) throw new Error('Failed to fetch client list');

        const clients = await response.json();
        const formattedClients = clients.map(id => ({ clientId: id }));
        console.log(formattedClients);
        setClientList(formattedClients);

        const socket = new SockJS('https://backend.henamedmarkt.com/ws');
        client = Stomp.over(socket);

        client.connect({}, () => {
          subscription = client.subscribe('/chat/agent', (message) => {
            const msg = JSON.parse(message.body);
            const { clientId } = msg;

            setMessages(prev => {
                const isDuplicate = prev.some(m =>
                  m.clientId === msg.clientId &&
                  m.message === msg.message &&
                  m.sender === msg.sender
                );
                return isDuplicate ? prev : [...prev, msg];
              });
            setLastMessageTime(prev => ({
              ...prev,
              [clientId]: new Date().toISOString()
            }));
            setUnread(prev => ({
              ...prev,
              [clientId]: (prev[clientId] || 0) + 1
            }));
            setOpenDialogs(prev => ({
              ...prev,
              [clientId]: true
            }));
            setClientList(prev => {
              const exists = prev.some(c => c.clientId === clientId);
              return exists ? prev : [{ clientId }, ...prev];
            });
          });

          setStompClient(client);
        });
      } catch (error) {
        console.error('Error initializing chat:', error);
      }
    };

    initializeChat();

    return () => {
      if (subscription) subscription.unsubscribe();
      if (client && client.connected) {
        client.disconnect(() => console.log("WebSocket disconnected"));
      }
      clearChatState(); // <- Ensures full cleanup on unmount
    };
  }, []); // Only runs once

  const sendMessage = (clientId) => {
    if (stompClient && input.trim()) {
      const msg = { sender: 'Agent', message: input, clientId };
      stompClient.send('/app/sendMessageToClient', {}, JSON.stringify(msg));
      setMessages(prev => [...prev, msg]);
      setInput('');
    }
  };

  const openChat = async (clientId) => {
    setOpenDialogs(prev => ({ ...prev, [clientId]: true }));
    setUnread(prev => ({ ...prev, [clientId]: 0 }));

    try {
      const res = await get(`/chat/${clientId}`);
      //const data = await res.json();
      console.log(res);
      setMessages(prev => {
        const filtered = prev.filter(m => m.clientId !== clientId);
        return [...filtered, ...res];
      });
    } catch (err) {
      console.error("Error loading chat history:", err);
    }
  };

  const toggleMinimize = (clientId) => {
    setMinimizedDialogs(prev => ({
      ...prev,
      [clientId]: !prev[clientId]
    }));
  };

  const closeChat = (clientId) => {
    setOpenDialogs(prev => ({ ...prev, [clientId]: false }));
    setMinimizedDialogs(prev => ({ ...prev, [clientId]: false }));
  };

  const sortedClients = [...clientList].sort((a, b) =>
    
    new Date(lastMessageTime[b.clientId] || 0) - new Date(lastMessageTime[a.clientId] || 0)
  );

  return (
    <>
      {/* Floating Client List */}
      <Paper sx={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        width: showClientList ? 250 : 50,
        height: showClientList ? 400 : 50,
        borderRadius: 2,
        zIndex: 9999,
        overflow: 'hidden'
      }}>
        <Box sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="subtitle2">{showClientList ? 'Clients' : ' '}</Typography>
          <IconButton size="small" onClick={() => setShowClientList(!showClientList)} sx={{ color: 'white' }}>
            {showClientList ? <Minimize /> : <OpenInFull />}
          </IconButton>
        </Box>

        {showClientList && (
          <Box sx={{ overflowY: 'auto', height: '100%' }}>
            <List dense>
              {sortedClients.map((client) => (
                <ListItem
                  button
                  key={client.clientId}
                  onClick={() => openChat(client.clientId)}
                  sx={{ justifyContent: 'space-between' }}
                >
                  <ListItemText primary={client.clientId} />
                  {unread[client.clientId] > 0 && (
                    <Box sx={{
                      width: 10,
                      height: 10,
                      bgcolor: 'red',
                      borderRadius: '50%'
                    }} />
                  )}
                  
                </ListItem>
              ))}
              <Divider />
            </List>
          </Box>
        )}
      </Paper>

      {/* Floating Chat Boxes */}
      {sortedClients.map((client, index) =>
        openDialogs[client.clientId] ? (
          <Paper
            key={client.clientId}
            elevation={5}
            sx={{
              position: 'fixed',
              bottom: minimizedDialogs[client.clientId] ? `${10 + index * 60}px` : '20px',
              right: /* `${20 + index * 360}px`, */'20px',
              width: '320px',
              height: minimizedDialogs[client.clientId] ? '50px' : '450px',
              borderRadius: 2,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 9999
            }}
          >
            <Box sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              p: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chat fontSize="small" />
                <Typography variant="subtitle2">Live Chat - {client.clientId}</Typography>
              </Box>
              <Box>
                <Tooltip title="Minimize">
                  <IconButton size="small" onClick={() => toggleMinimize(client.clientId)} sx={{ color: 'white' }}>
                    {minimizedDialogs[client.clientId] ? <OpenInFull /> : <Minimize />}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Close">
                  <IconButton size="small" onClick={() => closeChat(client.clientId)} sx={{ color: 'white' }}>
                    <Close />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            {!minimizedDialogs[client.clientId] && (
              <>
                <Box sx={{ flex: 1, p: 1, overflowY: 'auto', background: '#f9f9f9' }}>
                  <List>
                    {messages
                      .filter(msg => msg.clientId === client.clientId)
                      .map((msg, i) => (
                        <ListItem
                          key={i}
                          sx={{ justifyContent: msg.sender === 'Agent' ? 'flex-end' : 'flex-start' }}
                        >
                          <ListItemText
                            primary={msg.message}
                            sx={{
                              bgcolor: msg.sender === 'Agent' ? '#e0f7fa' : '#fff',
                              p: 1,
                              borderRadius: 2,
                              maxWidth: '70%'
                            }}
                          />
                        </ListItem>
                      ))}
                  </List>
                </Box>

                <Divider />
                <Box sx={{ display: 'flex', p: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <IconButton onClick={() => sendMessage(client.clientId)} color="primary">
                    <Send />
                  </IconButton>
                </Box>
              </>
            )}
          </Paper>
        ) : null
      )}
    </>
  );
};

export default AgentChatComponent;
