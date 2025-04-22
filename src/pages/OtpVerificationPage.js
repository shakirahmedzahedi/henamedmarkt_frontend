import React, { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import { get, post } from '../reducer/api/APIService'; // Your axios wrapper

const OtpVerificationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, phoneNo,action } = location.state || {};

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
      setError('');
      setMessage('');
    }
  };

  const handleSubmit = async () => {
    if (otp.length !== 6) {
      setError('OTP must be 6 digits');
      return;
    }

    try {
      setLoading(true);
      const response = await get(`/auth/varifyOTP?phoneNo=${encodeURIComponent(phoneNo)}&otp=${encodeURIComponent(otp)}`);
      setMessage(response?.data || 'Account verified successfully!');
      setError('');
      if(action === 'forgetPass'){
        navigate('/forgetPassword', {
          state: {
              email: email,
              
          }
      });
      }
      else{
        setTimeout(() => {
          navigate('/signIn');
        }, 5000);

      }
      
    } catch (err) {
      setError(err.message || 'Failed to verify OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setLoading(true);
      const response = await post('/auth/resendotp', { email,phoneNo });
      setMessage(response?.data || 'OTP resent successfully!');
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to resend OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="70vh"
        px={2}
      >
        <Typography variant="h5" gutterBottom textAlign="center">
          An OTP is sent to your Phone. Submit the OTP to continue...
        </Typography>

        <TextField
          fullWidth
          label="Enter OTP"
          value={otp}
          onChange={handleChange}
          error={!!error}
          helperText={error}
          margin="normal"
          inputProps={{
            maxLength: 6,
            inputMode: 'numeric',
          }}
        />

        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={handleResend}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Resend'}
            </Button>
          </Grid>
        </Grid>

        {message && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {message}
          </Alert>
        )}

        {error && !otp && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default OtpVerificationPage;
