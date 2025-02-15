import React, { useEffect, useState } from 'react';
import {
    Box, Paper, Avatar, Typography, TextField, FormControlLabel, Checkbox, Button, Grid, Link, IconButton, InputAdornment,
    MenuItem, FormControl, Select, InputLabel, CircularProgress
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { post } from '../../reducer/api/APIService';
import { clearError } from '../../reducer/slices/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../reducer/services/AuthService';
import data from "../../assets/data.json"


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
    const division =['Dhaka Division','Chittagong Division','Rajshahi Division','Khulna Division','Barishal Division',
        'Sylhet Division','Rangpur Division','Mymensingh Division'];

    const validate = () => {
        const newErrors = [];
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10,15}$/;
        const alphanumericRegex = /^.{1,20}$/;///^[a-zA-Z0-9]{1,20}$/;
        const numericRegex = /^[0-9]{4}$/;
        const letterRegex = /^[a-zA-Z]{1,15}$/;

        if (!inputs.firstName) newErrors.push('First name is required,');
        if (!inputs.lastName) newErrors.push('Last name is required,');
        if (!emailRegex.test(inputs.email)) newErrors.push('Invalid email format,');
        if (inputs.password.length < 6) newErrors.push('Password must be at least 6 characters long,');
        if (!phoneRegex.test(inputs.phoneNo)) newErrors.push('Phone number must be between 10 and 15 digits,');
        if (!inputs.terms) newErrors.push('You must agree to the terms and conditions,');

       /*  if (!alphanumericRegex.test(inputs.address.apartmentNo)) newErrors.push('Address Line must be  up to 20 characters,');
        if (!alphanumericRegex.test(inputs.address.houseNo)) newErrors.push('Address Line must be  up to 20 characters,');
        if (!letterRegex.test(inputs.address.postCode)) newErrors.push('Area up to 20 characters,');
        if (!letterRegex.test(inputs.address.postOffice)) newErrors.push('Thana must contain only letters and be up to 15 characters,');*/
        if (!(inputs.address.city)) newErrors.push('City required,'); 

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const handleOnChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'address.city') {
            // Reset postOffice and postCode when city is changed
            setInputs(prevState => ({
                ...prevState,
                address: { 
                    ...prevState.address, 
                    city: value, 
                    postOffice: '',  // Reset postOffice
                    postCode: ''     // Reset postCode
                }
            }));
        }
        else if (name.startsWith('address.')) {
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
                                inputProps={{ maxLength: 25 }}
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
                                inputProps={{ maxLength: 20 }}
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
                                inputProps={{ maxLength: 50 }}
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
                                    maxLength: 20,
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
                                inputProps={{ maxLength: 15 }}
                                onChange={handleOnChange}
                                autoComplete="phoneNo"
                            />
                            <Typography component="h5" variant="subtitle1" sx={{ mt: 1.5, mb: 1 }}>Address</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}><TextField fullWidth size='small' label="AddressLine 1" name="address.apartmentNo" value={inputs.address.apartmentNo} inputProps={{ maxLength: 20 }} onChange={handleOnChange} /></Grid>
                                 {/*<Grid item xs={6}><TextField fullWidth size='small' label="AddressLine 2" name="address.houseNo" value={inputs.address.houseNo} inputProps={{ maxLength: 20 }} onChange={handleOnChange} /></Grid>
                                 <Grid item xs={6}><TextField  fullWidth size='small' label="Area" name="address.postCode" value={inputs.address.postCode} onChange={handleOnChange} /></Grid>
                                <Grid item xs={6}><TextField required fullWidth size='small' label="Thana" name="address.postOffice" value={inputs.address.postOffice} onChange={handleOnChange} /></Grid>
                                <Grid item xs={12}><TextField required fullWidth size='small' label="City" name="address.city" value={inputs.address.city} onChange={handleOnChange} /></Grid> */}
                                <Grid item xs={6}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Division</InputLabel>
                                        <Select label="Division" name="address.houseNo" value={inputs.address.houseNo} onChange={handleOnChange}>
                                            {Object.keys(division).map((d) => (
                                                <MenuItem key={d} value={division[d]}>
                                                   <Typography >{division[d]}</Typography> 
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl required fullWidth size="small">
                                        <InputLabel>City</InputLabel>
                                        <Select label="City" name="address.city" value={inputs.address.city} onChange={handleOnChange}>
                                            {Object.keys(data).map((city) => (
                                                <MenuItem key={city} value={city}>
                                                   <Typography >{city}</Typography> 
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth size='small' disabled={!inputs.address.city}>
                                        <InputLabel>Thana</InputLabel>
                                        <Select label="Thana" name="address.postOffice" value={inputs.address.postOffice} onChange={handleOnChange}>
                                            {inputs.address.city &&
                                                Object.keys(data[inputs.address.city]).map((upazila) => (
                                                    <MenuItem key={upazila} value={upazila}>
                                                       <Typography >{upazila}</Typography> 
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth size='small' disabled={!inputs.address.postOffice}>
                                        <InputLabel>Area</InputLabel>
                                        <Select
                                        label="Area"
                                            name="address.postCode"
                                            value={inputs.address.postCode}
                                            onChange={handleOnChange}
                                        >
                                            {inputs.address.postOffice &&
                                                data[inputs.address.city][inputs.address.postOffice].map((union) => (
                                                    <MenuItem key={union} value={union}>
                                                      <Typography >{union}</Typography>  
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
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
