import React, { useEffect, useState } from 'react';
import { Box, Paper, Avatar, Typography, TextField, FormControlLabel, Checkbox, Button, Grid, Link, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { post } from '../../reducer/api/APIService';
import { clearError } from '../../reducer/slices/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../reducer/services/AuthService';


const Registration = () => {
    const [inputs, setInputs] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNo: '',
        terms: false,
        address: {
            apartmentNo: '',
            houseNo: '',
            postCode: '',
            postOffice: '',
            city: ''
        }
    });

    const [errors, setErrors] = useState([]);
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth.loading);
    const responseError = useSelector((state) => state.auth.error);
    const message = useSelector((state) => state.auth.text);

    const validate = () => {
        const newErrors = [];
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10,15}$/;
        const alphanumericRegex = /^[a-zA-Z0-9]{1,8}$/;
        const numericRegex = /^[0-9]{4}$/;
        const letterRegex = /^[a-zA-Z]{1,15}$/;

        if (!inputs.firstName) newErrors.push('First name is required,');
        if (!inputs.lastName) newErrors.push('Last name is required,');
        if (!emailRegex.test(inputs.email)) newErrors.push('Invalid email format,');
        if (inputs.password.length < 6) newErrors.push('Password must be at least 6 characters long,');
        if (!phoneRegex.test(inputs.phoneNo)) newErrors.push('Phone number must be between 10 and 15 digits,');
        if (!inputs.terms) newErrors.push('You must agree to the terms and conditions,');

        if (!alphanumericRegex.test(inputs.address.apartmentNo)) newErrors.push('Apartment No must be alphanumeric and up to 8 characters,');
        if (!alphanumericRegex.test(inputs.address.houseNo)) newErrors.push('House No must be alphanumeric and up to 8 characters,');
        if (!numericRegex.test(inputs.address.postCode)) newErrors.push('Post Code must be exactly 4 digits,');
        if (!letterRegex.test(inputs.address.postOffice)) newErrors.push('Post Office must contain only letters and be up to 15 characters,');
        if (!letterRegex.test(inputs.address.city)) newErrors.push('City must contain only letters and be up to 15 characters,');

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const handleOnChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.startsWith('address.')) {
            const field = name.split('.')[1];
            setInputs(prevState => ({
                ...prevState,
                address: { ...prevState.address, [field]: value }
            }));
        } else {
            setInputs(prevState => ({
                ...prevState,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(clearError());
        if (validate()) {
            dispatch(signUp(inputs));
        }

        console.log(message);
    };

    return (
        <>
            {loading ? <CircularProgress size={96} /> :
                <Box sx={{ p: 2 }}>
                    <Box component={Paper} elevation={6} square sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main', textAlign: 'center' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign Up
                        </Typography>

                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                size='small'
                                id="firstName"
                                label="First Name"
                                name="firstName"
                                value={inputs.firstName}
                                onChange={handleOnChange}
                                autoComplete="firstName"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                size='small'
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                value={inputs.lastName}
                                onChange={handleOnChange}
                                autoComplete="lastName"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                size='small'
                                id="email"
                                label="Email Address"
                                name="email"
                                value={inputs.email}
                                onChange={handleOnChange}
                                autoComplete="email"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                size='small'
                                name="password"
                                label="Password"
                                value={inputs.password}
                                onChange={handleOnChange}
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                size='small'
                                id="phoneNo"
                                label="Phone No"
                                name="phoneNo"
                                value={inputs.phoneNo}
                                onChange={handleOnChange}
                                autoComplete="phoneNo"
                            />
                            <Typography component="h5" variant="subtitle1" sx={{ mt: 1.5, mb: 1 }}>Address</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={6}><TextField required fullWidth size='small' label="Apartment No" name="address.apartmentNo" value={inputs.address.apartmentNo} onChange={handleOnChange} /></Grid>
                                <Grid item xs={6}><TextField required fullWidth size='small' label="House No" name="address.houseNo" value={inputs.address.houseNo} onChange={handleOnChange} /></Grid>
                                <Grid item xs={6}><TextField required fullWidth size='small' label="Post Code" name="address.postCode" value={inputs.address.postCode} onChange={handleOnChange} /></Grid>
                                <Grid item xs={6}><TextField required fullWidth size='small' label="Post Office" name="address.postOffice" value={inputs.address.postOffice} onChange={handleOnChange} /></Grid>
                                <Grid item xs={12}><TextField required fullWidth size='small' label="City" name="address.city" value={inputs.address.city} onChange={handleOnChange} /></Grid>
                            </Grid>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name='terms'
                                        checked={inputs.terms}
                                        onChange={handleOnChange}
                                        value="terms"
                                        color="primary"
                                    />
                                }
                                label="Agree to terms and conditions"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>

                            {errors.length > 0 && (
                                <Box sx={{ mt: 2 }}>
                                    {errors.map((error, index) => (
                                        <body1 key={index} color="info.main">
                                            {error}
                                        </body1>
                                    ))}
                                </Box>
                            )}
                            <Typography component="h6" variant="body1" color="primary.main">
                                {responseError}
                            </Typography>
                            <Typography component="h6" variant="body1" color="primary.main">
                                {message}
                            </Typography>

                        </Box>
                    </Box>
                </Box>
            }
        </>
    );
};

export default Registration;
