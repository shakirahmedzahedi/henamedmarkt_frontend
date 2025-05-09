import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { post } from './../reducer/api/APIService';
import { useLocation, useNavigate } from 'react-router';



function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};
 const [message, setMessage] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const email = params.get('email');
        setMessage(email);

        
    }, [location]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    setError('');
    const req = {
        email: email,
        password
    }
    try {
        const result = await post(`/auth/forgetPassword`, req); 
        if(result.errors.length == 0 ){
          setSuccess(true);
          setError('');
        }else {
          setError(result.errors[0].message); 
        }
        setSuccess(true);
        setError('');
      } catch (err) {
        setError(err.message);
        setSuccess(false);
      }
    setSuccess(true);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, minHeight:'70vh' }}>
      <Typography variant="h5" align="center" gutterBottom>
        Reset Password
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Password reset successfully!</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          Reset Password
        </Button>
      </form>
    </Box>
  );
}

export default ResetPassword;
