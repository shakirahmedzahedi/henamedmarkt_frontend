import React, { useState } from "react";
import { Box, Fab } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ChatIcon from "@mui/icons-material/Chat";
import PhoneIcon from "@mui/icons-material/Phone";
import ClientChatComponent from "../liveChat/ClientChatComponent";

const FloatingButtons = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleWhatsAppClick = () => {
    const phoneNumber = "8801903652681";
    const message = "Hello! I need assistance.";
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  const handleLiveChatClick = () => {
    setIsChatOpen(true);
  };

  const handlePhoneClick = () => {
    const phoneURL = `tel:8801903652681`;
    window.location.href = phoneURL;
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
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
      }}
    >
      <Fab
        color="success"
        size="small"
        sx={{ mb: 1 }}
        onClick={handleWhatsAppClick}
      >
        <WhatsAppIcon />
      </Fab>
      <Fab
        color="primary"
        size="small"
        sx={{ mb: 1 }}
        onClick={handleLiveChatClick}
      >
        <ChatIcon />
      </Fab>
      <Fab
        color="secondary"
        size="small"
        sx={{ mb: 1 }}
        onClick={handlePhoneClick}
      >
        <PhoneIcon />
      </Fab>

      {isChatOpen && (
        <div>
          <ClientChatComponent onClose={handleCloseChat} />
        </div>
      )}
    </Box>
  );
};

export default FloatingButtons;
