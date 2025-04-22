import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { get } from './../reducer/api/APIService';
import { useNavigate } from 'react-router-dom';

function SendEmailToResetPassword() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await get(`/auth/sendEmailForRestPassword?email=${email}`);
      if (result.errors.length == 0) {
        navigate('/otp-verification', {
          state: {
            email: result.data.email,
            phoneNo: result.data.phoneNo,
            action: "forgetPass"
          }
        });
        console.log(result);
        setSuccess(true);
        setError('');
      } else {
        setError(result.errors[0].message);

      }


    } catch (err) {
      setError(err.message);
      setSuccess(false);
    }
  };

  return (
    <Box sx={{ minHeight: '65vh', ml: { sm: 3, md: 15, lg: 19, xl: 23 }, mr: { sm: 3, md: 15, lg: 19, xl: 23 } }}>
      <Box
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '70vh', maxWidth: 400, mx: 3, mt: 5 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Provide Email To Reset Password
        </Typography>
        {success && <Alert severity="success">Check your email to reset password</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Send OTP
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default SendEmailToResetPassword;
