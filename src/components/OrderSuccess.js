import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderDetails from './OrderDetails';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order;

  const handleGoHome = () => {
    navigate('/'); // Redirect to home or another page
  };
  const handlelog = () => {
   console.log(order);
  };

  return (
    <Box sx={{ padding: .5, minHeight: '78vh', ml: { xs: .5, sm: 3, md: 11, lg: 15, xl: 23 }, mr: { xs: .5, sm: 3, md: 11, lg: 15, xl: 23 }, pb: 9 }}>
      <Box textAlign="center" mt={5}>
        <Typography variant="h4" color="primary">
          Order Successfully Placed!
        </Typography>
        <Typography variant="body1" mt={2}>
          Thank you for your order. We’re processing it and will update you shortly.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={handleGoHome}
        >
          Go to Home
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={handlelog}
        >
          Invoice
        </Button>

      </Box>
      <Box textAlign="center" mt={5}>
        <OrderDetails order={order} />
      </Box>
    </Box>
  );
};

export default OrderSuccess;