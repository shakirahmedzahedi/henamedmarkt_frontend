import React, {useEffect, useState} from 'react'
import { Box, Grid, Typography, Divider,useMediaQuery,useTheme, List, ListItem, ListItemText, TextField,IconButton, Paper, Tooltip } from '@mui/material'
import hero from './../assets/hero.jpeg';
import truck from './../assets/truck.png';
import customer from './../assets/customer-service (2).png';
import hand from './../assets/hand (1).png';
import sale from './../assets/discount (2).png';
import CatagorySection from '../components/catagorySection';
import BestSellerSection from '../components/bestSellerSection';
import ProductDetails from '../components/ProductDetails';
import Checkout from '../components/Checkout';
import AgeLimitSection from '../components/AgeLimitSection';
import ImageSlider from '../components/ImageSlider';
import SmallFooter from '../components/SmallFooter';
import { Send, Chat, Close, Minimize, OpenInFull } from '@mui/icons-material';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useDispatch, useSelector } from 'react-redux';


const HomePage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [openDialogs, setOpenDialogs] = useState({});
  const [minimizedDialogs, setMinimizedDialogs] = useState({});
  const [clientList, setClientList] = useState([]);
  const user = useSelector((state) => state.auth.user);

 /*  useEffect(() => {
    if (user?.roles.includes('ADMIN')) {
        const socket = new SockJS('https://backend.henamedmarkt.com/ws');
        const client = Stomp.over(socket);
        let subscription;

        client.connect({}, () => {
            subscription = client.subscribe('/chat/agent', (message) => {
                const msg = JSON.parse(message.body);
                setMessages((prev) => [...prev, msg]);

                if (!openDialogs[msg.clientId]) {
                    setOpenDialogs((prev) => ({ ...prev, [msg.clientId]: true }));
                }

                if (!clientList.includes(msg.clientId)) {
                    setClientList((prev) => [...prev, msg.clientId]);
                }
            });

            setStompClient(client);
        });

        return () => {
            if (subscription) subscription.unsubscribe();
            if (client) client.disconnect();
        };
    }
}, []);

const sendMessage = (clientId) => {
    if (stompClient && input.trim()) {
      const msg = { sender: 'Agent', message: input, clientId };
      stompClient.send('/app/sendMessageToClient', {}, JSON.stringify(msg));
      setMessages((prev) => [...prev, msg]);
      setInput('');
    }
  };

  const toggleMinimize = (clientId) => {
    setMinimizedDialogs((prev) => ({
      ...prev,
      [clientId]: !prev[clientId]
    }));
  };

  const closeChat = (clientId) => {
    setOpenDialogs((prev) => ({ ...prev, [clientId]: false }));
    setMinimizedDialogs((prev) => ({ ...prev, [clientId]: false }));
  };


  const chatOption = (
    <>
     {clientList.map((clientId, index) =>
    openDialogs[clientId] ? (
      <Paper
        key={clientId}
        elevation={5}
        sx={{
          position: 'fixed',
          bottom: minimizedDialogs[clientId] ? `${10 + index * 70}px` : '20px',
          right: `${20 + index * 360}px`,
          width: '320px',
          height: minimizedDialogs[clientId] ? '50px' : '450px',
          borderRadius: 2,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 9999
        }}
      >
        
        <Box
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            p: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chat fontSize="small" />
            <Typography variant="subtitle2">Live Chat - {clientId}</Typography>
          </Box>
          <Box>
            <Tooltip title="Minimize">
              <IconButton size="small" onClick={() => toggleMinimize(clientId)} sx={{ color: 'white' }}>
                {minimizedDialogs[clientId] ? <OpenInFull /> : <Minimize />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Close">
              <IconButton size="small" onClick={() => closeChat(clientId)} sx={{ color: 'white' }}>
                <Close />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        
        {!minimizedDialogs[clientId] && (
          <>
            <Box sx={{ flex: 1, p: 1, overflowY: 'auto', background: '#f9f9f9' }}>
              <List>
                {messages
                  .filter((msg) => msg.clientId === clientId)
                  .map((msg, i) => (
                    <ListItem key={i} sx={{ justifyContent: msg.sender === 'Agent' ? 'flex-end' : 'flex-start' }}>
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

           
            <Box sx={{ display: 'flex', p: 1, borderTop: '1px solid #ccc' }}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <IconButton onClick={() => sendMessage(clientId)} color="primary">
                <Send />
              </IconButton>
            </Box>
          </>
        )}
      </Paper>
    ) : null
  )}
    </>
  ) */

  return (
    <Box >

      <Box sx={{ ml: { xs: 2, sm: 3, md: 15, lg: 19, xl: 23 }, mr: { xs: 2, sm: 3, md: 15, lg: 19, xl: 23 } }} >

        <ImageSlider />
      </Box>


      <Box sx={{ mt: 0, ml: { xs: 2, sm: 3, md: 15, lg: 19, xl: 23 }, mr: { xs: 2, sm: 3, md: 15, lg: 19, xl: 23 } }}>
        <AgeLimitSection />
      </Box>
      <Box sx={{ mt: 1, ml: { xs: 2, sm: 3, md: 15, lg: 19, xl: 23 }, mr: { xs: 2, sm: 3, md: 15, lg: 19, xl: 23 } }}>
        <CatagorySection />
      </Box>
      <Box sx={{ mt: 1, ml: { xs: 2, sm: 3, md: 15, lg: 19, xl: 23 }, mr: { xs: 2, sm: 3, md: 15, lg: 19, xl: 23 } }}>
         <BestSellerSection />
      </Box>



      <Box sx={{ mt: 1, p: 2, background: '#edebeb' }}>
        <Box sx={{ mt: 1, ml: { xs: 2, sm: 3, md: 15, lg: 19, xl: 23 }, mr: { xs: 2, sm: 3, md: 15, lg: 19, xl: 23 }, pb:{xs:3} }}>
          <Grid container alignItems="center">
            <Grid item xs={12} lg={3}>
              <Typography
                variant="h4"
                align="center" // Centers title horizontally
                color="primary"
                sx={{
                  
                  fontSize: { xs: '16px', md: '20px', lg: '28px' }, // Adjusted font size
                }}
              >
                Hena Promies
              </Typography>
            </Grid>

            {/* Features Section */}
            <Grid item xs={12} lg={8}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={3} sm={3} md={3}lg={3}xl={3}>
                  <Box textAlign="center">
                    <img
                      src={truck}
                      alt="Home Delivery"
                      style={{ width: '60px', height: '45px' }} // Reduced size
                    />
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{
                        fontFamily: 'Squada One',
                        fontSize: { xs: '12px', md: '16px', lg: '20px' }, // Reduced text size
                      }}
                    >
                      Home Delivery
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={3} sm={3} md={3}lg={3}xl={3}>
                  <Box textAlign="center">
                    <img
                      src={hand}
                      alt="Price Guarantee"
                      style={{ width: '60px', height: '45px' }} // Reduced size
                    />
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{
                        fontFamily: 'Squada One',
                        fontSize: { xs: '12px', md: '16px', lg: '20px' }, // Reduced text size
                      }}
                    >
                      Price Guarantee
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={3} sm={3} md={3}lg={3}xl={3}>
                  <Box textAlign="center">
                    <img
                      src={sale}
                      alt="Low Price"
                      style={{ width: '60px', height: '45px' }} // Reduced size
                    />
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{
                        fontFamily: 'Squada One',
                        fontSize: { xs: '12px', md: '16px', lg: '20px' }, // Reduced text size
                      }}
                    >
                      Low Price
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={3} sm={3} md={3}lg={3}xl={3}>
                  <Box textAlign="center">
                    <img
                      src={customer}
                      alt="24/7 Customer Service"
                      style={{ width: '60px', height: '45px' }} // Reduced size
                    />
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{
                        fontFamily: 'Squada One',
                        fontSize: { xs: '12px', md: '16px', lg: '20px' }, // Reduced text size
                      }}
                    >
                      24/7 Customer Service
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {isSmallScreen && (
        <Box sx={{ mt: 3, ml: { xs: 2, sm: 3, md: 15, lg: 19, xl: 23 }, mr: { xs: 2, sm: 3, md: 15, lg: 19, xl: 23 } }}>
          <SmallFooter />
        </Box>
      )}

    </Box>
  )
}

export default HomePage
