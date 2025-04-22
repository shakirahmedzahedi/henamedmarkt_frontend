import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  FormControl,
  Button,
  Collapse,
  Checkbox,
  Grid,
  Switch,
  Divider,
  Paper,
  CircularProgress,
  MenuItem, Select, InputLabel
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { addNewOrder } from './../reducer/services/OrderService'; // Import your Redux service
import { clearCoupon } from '../reducer/slices/DiscountCouponSlice';
import data from "../assets/data1.json"


const PaymentPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { subtotal, tax, initialDiscount, discount, deliveryCharge, total } = location.state;
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart.cart);
  const articles = cart?.articles;
  const discountCoupon = useSelector((state) => state.coupon.discountedCoupon);
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('paymentOnDelivery');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [differentAddress, setDifferentAddress] = useState(false);
  const [charge, setCharge] = useState(deliveryCharge);
  const [deliveryTime, setDeliveryTime] = useState("");
  const isFirstRender = useRef(true);
  const [buttonLoading, setButtonLoading] = useState(false);

  const [newAddress, setNewAddress] = useState(user?.address || {
    apartmentNo: '',
    houseNo: '',
    postCode: '',
    postOffice: '',
    city: '',
  });
 

  const division = Object.keys(data);

 
 
  // 2. Set delivery time when user loads
  useEffect(() => {
    if (user?.address?.city) {
      setNewAddress(user.address); // also set address initially if needed
      setDeliveryTime(calculateDeliveryTime(user.address.city));
    }
  }, [user]);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // Skip first render
    }
    if (articles?.length > 0) {
      const totalWeight = calculatTotalWeight();
      setCharge(calculatDeliveryCharge(totalWeight, newAddress.city))
      setDeliveryTime(calculateDeliveryTime(newAddress.city))
      console.log("Called");
    }
  }, [newAddress]);

  if (!user) {
    return <Typography>Loading...</Typography>;
  }


 

  
  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  const handleTermsChange = (event) => {
    setTermsAccepted(event.target.checked);
  };

  const handleAddressToggle = (event) => {
    Object.keys(newAddress).map(field => console.log(field))

    setDifferentAddress(event.target.checked);
  };

  const handleAddressChange = (field, value) => {
     if (field === "apartmentNo") {
      setNewAddress({
        ...newAddress,
        apartmentNo: value,
        houseNo:'',
        city: '',
        postOffice: '',  // Reset postOffice
        postCode: ''
      })
    }
    else if (field === "houseNo") {
      setNewAddress({
        ...newAddress,
        houseNo:value,
        city: '',
        postOffice: '',  // Reset postOffice
        postCode: ''
      })
    }
    
    else if (field === "city") {
      setNewAddress({
        ...newAddress,
        city: value,
        postOffice: '',  // Reset postOffice
        postCode: ''
      })
    }
    else if (field === "postOffice") {
      setNewAddress({
        ...newAddress,
        postOffice: value,  // Reset postOffice
        postCode: ''
      })
    }
    else {
      setNewAddress({ ...newAddress, [field]: value });
    }

  };

  const handlePlaceOrder = async () => {
    const address = differentAddress
      ? {
        apartmentNo: newAddress.apartmentNo,
        houseNo: newAddress.houseNo,
        postCode: newAddress.postCode,
        postOffice: newAddress.postOffice,
        city: newAddress.city,
      }
      : user.address;

    const orderRequest = {
      cartId: cart.id,
      userId: user.id,
      address,
      paymentMethod: selectedPayment === 'paymentOnDelivery' ? 'PAYMENT_ON_DELIVERY' : 'OTHERS',
      paymentStatus: selectedPayment === 'paymentOnDelivery' ? 'PENDING' : 'COMPLETE',
      orderStatus: 'PENDING',
      discountCouponNumber: discountCoupon?.number || null,
      shippingCharge: charge
    };

    try {
      setButtonLoading(true);
      await dispatch(addNewOrder(orderRequest)).unwrap(); // Unwrap to handle success/failure
      if (discountCoupon) {
        dispatch(clearCoupon());
      }
      setButtonLoading(false);
      navigate('/orderSuccess'); // Navigate to the success page
    } catch (error) {
      console.error('Order creation failed:', error);
    }
  };

  const calculatTotalWeight = () => {

    return articles?.reduce((acc, item) => {
      const weight = item.product.weight;

      return acc + (weight + 100) * item.unit;
    }, 0);
  };

  let calculateDeliveryTime = (city) => {
    if (city.toUpperCase() === "DHAKA INTER CITY") {
      return " 0-1 days";
    }
    if (city.toUpperCase() === "DHAKA OUTER CITY" || city.toUpperCase() === "GAZIPUR DISTRICT" || city.toUpperCase() === "NARAYANGANJ DISTRICT") {
      return " 1-2 days";
    }
    else {
      return " 2-3 days";
    }
  };

  const calculatDeliveryCharge = (totalWeight, city) => {

    if (city.toUpperCase() === "DHAKA INTER CITY") {
      if (totalWeight <= 1000) {
        return 80;
      }
      else if (totalWeight > 1000 && totalWeight <= 2000) {
        return 90;
      }
      else if (totalWeight > 2000 && totalWeight <= 3000) {
        return 110;
      }
      else if (totalWeight > 3000 && totalWeight <= 4000) {
        return 130;
      }
      else if (totalWeight > 4000 && totalWeight <= 5000) {
        return 150;
      }
      else if (totalWeight > 5000 && totalWeight <= 6000) {
        return 160;
      }
      else if (totalWeight > 6000 && totalWeight <= 7000) {
        return 180;
      }
      else if (totalWeight > 7000 && totalWeight <= 8000) {
        return 190;
      }
      else if (totalWeight > 8000 && totalWeight <= 9000) {
        return 210;
      }
      else if (totalWeight > 9000 && totalWeight <= 10000) {
        return 230;
      }
      else if (totalWeight > 10000 && totalWeight <= 12000) {
        return 270;
      }
      else if (totalWeight > 12000 && totalWeight <= 15000) {
        return 350;
      }
      else {
        return 500;
      }

    }

    if (city.toUpperCase() === "DHAKA OUTER CITY" || city.toUpperCase() === "GAZIPUR DISTRICT" || city.toUpperCase() === "NARAYANGANJ DISTRICT") {
      setDeliveryTime("1-2 days");
      if (totalWeight <= 1000) {
        return 100;
      }
      else if (totalWeight > 1000 && totalWeight <= 2000) {
        return 130;
      }
      else if (totalWeight > 2000 && totalWeight <= 3000) {
        return 160;
      }
      else if (totalWeight > 3000 && totalWeight <= 4000) {
        return 180;
      }
      else if (totalWeight > 4000 && totalWeight <= 5000) {
        return 210;
      }
      else if (totalWeight > 5000 && totalWeight <= 6000) {
        return 240;
      }
      else if (totalWeight > 6000 && totalWeight <= 7000) {
        return 270;
      }
      else if (totalWeight > 7000 && totalWeight <= 8000) {
        return 295;
      }
      else if (totalWeight > 8000 && totalWeight <= 9000) {
        return 320;
      }
      else if (totalWeight > 9000 && totalWeight <= 10000) {
        return 350;
      }
      else if (totalWeight > 10000 && totalWeight <= 12000) {
        return 390;
      }
      else if (totalWeight > 12000 && totalWeight <= 15000) {
        return 480;
      }
      else {
        return 500;
      }

    }
    else {
      setDeliveryTime("2-4 days");
      if (totalWeight <= 1000) {
        return 120;
      }
      else if (totalWeight > 1000 && totalWeight <= 2000) {
        return 160;
      }
      else if (totalWeight > 2000 && totalWeight <= 3000) {
        return 190;
      }
      else if (totalWeight > 3000 && totalWeight <= 4000) {
        return 180;
      }
      else if (totalWeight > 4000 && totalWeight <= 5000) {
        return 250;
      }
      else if (totalWeight > 5000 && totalWeight <= 6000) {
        return 270;
      }
      else if (totalWeight > 6000 && totalWeight <= 7000) {
        return 300;
      }
      else if (totalWeight > 7000 && totalWeight <= 8000) {
        return 325;
      }
      else if (totalWeight > 8000 && totalWeight <= 9000) {
        return 350;
      }
      else if (totalWeight > 9000 && totalWeight <= 10000) {
        return 380;
      }
      else if (totalWeight > 10000 && totalWeight <= 12000) {
        return 430;
      }
      else if (totalWeight > 12000 && totalWeight <= 15000) {
        return 520;
      }
      else {
        return 700;
      }

    }

  };

  return (
  
    <Box sx={{ padding: .5, minHeight: '78vh', ml: { xs: .5, sm: 3, md: 11, lg: 15, xl: 23 }, mr: { xs: .5, sm: 3, md: 11, lg: 15, xl: 23 }, pb: 9 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h3" align="center" color="primary" sx={{ fontSize: { xs: '24px', md: '36px', lg: '36px' } }}>
          Payment
        </Typography>
      </Box>
      <Box>
        <Divider sx={{ bgcolor: 'info.dark', minHeight: '.2vh' }} />
      </Box>
      {buttonLoading && <CircularProgress size={48} />}
      {!buttonLoading && (
        <Grid container mt={3}>
          <Grid item xs={12} md={8} pr={3}>
            <Card variant="outlined" sx={{ maxWidth: 1100, p: 3 }}>
              <CardContent>
                <Typography textAlign={'center'} variant="h6">
                  Payment
                </Typography>
                <Typography textAlign={'center'} variant="body2" color="textSecondary">
                  Select your payment method.
                </Typography>

                <FormControl component="fieldset" sx={{ mt: 2 }}>
                  <RadioGroup value={selectedPayment} onChange={handlePaymentChange}>
                    {/* Payment on Delivery */}
                    <FormControlLabel
                      value="paymentOnDelivery"
                      control={<Radio />}
                      label={
                        <Box display="flex" alignItems="center">
                          <LocalShippingIcon sx={{ mr: 1 }} />
                          <Typography variant="body1">Cash on Delivery</Typography>
                        </Box>
                      }
                    />
                    <Collapse in={selectedPayment === 'paymentOnDelivery'}>
                      <Box pl={4} pt={1}>
                        <Typography variant="body2" color="textSecondary">
                          You’ll pay in cash when the product is delivered.
                        </Typography>
                      </Box>
                    </Collapse>

                    {/* Credit Card */}
                    <FormControlLabel
                      value="card"
                      control={<Radio />}
                      label={
                        <Box display="flex" alignItems="center">
                          <CreditCardIcon sx={{ mr: 1 }} />
                          <Typography variant="body1">Cards</Typography>
                        </Box>
                      }
                    />
                  </RadioGroup>
                </FormControl>

                {/* Different Shipping Address Option */}
                <Box mt={3}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={differentAddress}
                        onChange={handleAddressToggle}
                        color="primary"
                      />
                    }
                    label="Use a different shipping address"
                  />
                </Box>
                <Collapse in={differentAddress}>
                  <Box mt={2}>
                    <Typography variant="subtitle1" mb={1}>Shipping Address</Typography>
                    <Grid container spacing={2}>
                      <TextField margin='normal' required fullWidth size='small' label="Address Line" name="newAddress.apartmentNo" value={newAddress.apartmentNo} inputProps={{ maxLength: 50 }} onChange={(e) => handleAddressChange('apartmentNo', e.target.value)} />

                      <FormControl fullWidth size="small" margin='normal'>
                        <InputLabel>Division</InputLabel>
                        <Select label="Division" name="houseNo" value={newAddress.houseNo} onChange={(e) => handleAddressChange('houseNo', e.target.value)}>
                          {Object.keys(division).map((d) => (
                            <MenuItem key={d} value={division[d]}>
                              <Typography >{division[d]}</Typography>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl required fullWidth size="small" margin='normal' disabled={!newAddress.houseNo}>
                        <InputLabel>City</InputLabel>
                        <Select label="City" name="city" value={newAddress.city} onChange={(e) => handleAddressChange('city', e.target.value)}>
                          {newAddress.houseNo &&
                            Object.keys(data[newAddress.houseNo]).map((city) => (
                              <MenuItem key={city} value={city}>
                                <Typography >{city}</Typography>
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                      <FormControl fullWidth size='small' margin='normal' disabled={!newAddress.city}>
                        <InputLabel>Thana</InputLabel>
                        <Select label="Thana" name="postOffice" value={newAddress.postOffice} onChange={(e) => handleAddressChange('postOffice', e.target.value)}>
                          {newAddress.houseNo &&
                            newAddress.city &&
                            Object.keys(data[newAddress.houseNo][newAddress.city]).map((thana) => (
                              <MenuItem key={thana} value={thana}>
                                <Typography>{thana}</Typography>
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                      <FormControl fullWidth size='small' margin='normal' disabled={!newAddress.postOffice}>
                        <InputLabel>Area</InputLabel>
                        <Select
                          label="Area"
                          name="postCode"
                          value={newAddress.postCode}
                          onChange={(e) => handleAddressChange('postCode', e.target.value)}
                        >

                          {newAddress.houseNo &&
                            newAddress.city &&
                            newAddress.postOffice &&
                            Array.isArray(data[newAddress.houseNo][newAddress.city][newAddress.postOffice]) &&
                            data[newAddress.houseNo][newAddress.city][newAddress.postOffice].map((area) => (
                              <MenuItem key={area} value={area}>{area}</MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Box>
                </Collapse>

                {/* Terms and Conditions Checkbox */}
                <Box mt={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={termsAccepted}
                        onChange={handleTermsChange}
                        color="primary"
                      />
                    }
                    label={
                      <Typography variant="body2">
                        I have read, understand and accept the{' '}
                        <a href="#terms">terms and conditions</a> and the{' '}
                        <a href="#privacy">privacy policy</a>.
                      </Typography>
                    }
                  />
                </Box>

                {/* Place Order Button */}
                <Box mt={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={!termsAccepted}
                    onClick={handlePlaceOrder}
                  >
                    PLACE ORDER
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item textAlign={'right'} xs={12} md={4} pl={0} mt={2}>
            <Paper elevation={3}>
              <Typography variant="h5" textAlign={'center'} gutterBottom>
                Order Summary
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 1, p: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1">Subtotal:</Typography>
                <Typography variant="body1" color="text.secondary">
                  ৳ {subtotal}
                </Typography>
              </Box>

              {/* <Box sx={{ mb: 1, p: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1">Tax <span>included</span> (10%):</Typography>
                <Typography variant="body1" color="text.secondary">
                  ৳ {tax}
                </Typography>
              </Box> */}
              {initialDiscount &&
                <Box sx={{ mb: 1, p: 1, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">Welcome Discount:</Typography>
                  <Typography variant="body1" color="text.secondary">
                    ৳ 200.00
                  </Typography>
                </Box>

              }


              {discount &&

                <Box sx={{ mb: 1, p: 1, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">Discount:</Typography>

                  <Typography variant="body1" color="text.secondary">
                    ৳ {discount}
                  </Typography>
                </Box>
              }

              <Box sx={{ mb: 1, p: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1">
                  Delivery Charge:
                </Typography>
                <Typography variant="body1">
                  ৳ {charge}
                </Typography>
              </Box>
              <Box sx={{ mb: 1, p: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" fontWeight="bold">
                  Total:
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  ৳ {total}
                </Typography>
              </Box>
              <Box sx={{ mb: 1, p: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1" color="primary">
                  Estimated Delivery Time:{deliveryTime}
                </Typography>
              </Box>
            </Paper>
          </Grid>

        </Grid>
      )}

    </Box>
  );
};

export default PaymentPage;
