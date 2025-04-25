import React, { useState } from "react";
import { Box, Fab, Zoom } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ChatIcon from "@mui/icons-material/Chat";
import PhoneIcon from "@mui/icons-material/Phone";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ClientChatComponent from "../liveChat/ClientChatComponent";

const FloatingButtons = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const handleWhatsAppClick = () => {
    const phoneNumber = "8801903652681"; // Replace with the target WhatsApp number
    const message = "Hello! I need assistance."; // Default message
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Open WhatsApp link
    window.open(whatsappURL, "_blank");
  };
  const handleLiveChatClick = () => {
    setIsChatOpen(true); // Show the chat component
  };

  const handlePhoneClick = () => {
    const phoneNumber = "8801903652681"; // Replace with the phone number to call
    const phoneURL = `tel:${phoneNumber}`;

    // Open phone dialer
    window.location.href = phoneURL;
  };
  const [open, setOpen] = useState(false);

  const toggleButtons = () => {
    setOpen((prev) => !prev);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false); // Close chat from within the chat component
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 95,
        right: 25,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 9999,
        color:"primary"
      }}
    >
      <Zoom in={open}>
        <Fab
          color="success"
          size="small"
          sx={{ mb: 1 }}
          onClick={() => handleWhatsAppClick()}
        >
          <WhatsAppIcon />
        </Fab>
      </Zoom>
      <Zoom in={open}>
        <Fab
          color="primary"
          size="small"
          sx={{ mb: 1 }}
          onClick={() => handleLiveChatClick()}
        >
          <ChatIcon />
        </Fab>
      </Zoom>
      <Zoom in={open}>
        <Fab
          color="secondary"
          size="small"
          sx={{ mb: 1 }}
          onClick={() => handlePhoneClick()}
        >
          <PhoneIcon />
        </Fab>
      </Zoom>

      <Fab size="small" color="default" onClick={toggleButtons}>
        {open ? <CloseIcon /> : <AddIcon />}
      </Fab>
      {isChatOpen && (
        <div >
          <ClientChatComponent onClose={handleCloseChat} />
        </div>
      )}
    </Box>
  );
};



export default FloatingButtons;
