import React, { forwardRef } from "react";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Divider,
} from '@mui/material';
import { useSelector } from 'react-redux';

const PrintableOrder = forwardRef(({ order }, ref) => {
    const formatDate = (date) => new Date(date).toLocaleString();
    const articles = order?.cart?.articles;
    const user = useSelector((state) => state.auth.user);

    const addressToString = (address) => {
        return `${address?.apartmentNo || ""},  ${address?.postCode || ""}, ${address?.postOffice || ""}, ${address?.city || ""},${address?.houseNo || ""}`;
    };

    const calculateSubtotal = () => {
        return articles?.reduce((acc, item) => {
            const price = item.product.discountPercentage
                ? item.product.price - (item.product.price * item.product.discountPercentage) / 100
                : item.product.price;
            return acc + price * item.unit;
        }, 0);
    };

    const calculateItemTotal = (item) => {
        const price = item.product.discountPercentage
            ? item.product.price - (item.product.price * item.product.discountPercentage) / 100
            : item.product.price;
        return price * item.unit;
    };

    const calculateTax = (subtotal) => {
        return (subtotal * 0.1).toFixed(2); // Assume 10% tax rate
    };

    const calculateDiscountedPrice = (price, discount) => {
        return discount ? (price - (price * discount) / 100).toFixed(2) : price.toFixed(2);
    };

    return (
        <div ref={ref}>
            <Box sx={{ p: 3 }}>
                {/* Invoice Header (Centered) */}
                <Box mb={4} sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" fontWeight="bold" color="primary">
                        Order Details
                    </Typography>
                </Box>

                {/* Content Section (Unchanged) */}
                <Box display={'flex'} justifyContent="space-between" gap={4}>
                    <Box mb={4}>
                        <Typography variant="h6" fontWeight="bold">
                            Order Details
                        </Typography>
                        <Typography variant="body1">Order ID: {order?.id}</Typography>
                        <Typography variant="body1">Date: {formatDate(order?.createdAt)}</Typography>
                        <Typography variant="body1">Updated: {formatDate(order?.updatedAt)}</Typography>
                    </Box>

                    {/* Buyer Info */}
                    <Box mb={4}>
                        <Typography variant="h6" fontWeight="bold">
                            Customer Details:
                        </Typography>
                        <Typography variant="body1">Name: {order?.user?.firstName || 'N/A'}</Typography>
                        <Typography variant="body1">Email: {order?.user?.email || 'N/A'}</Typography>
                        <Typography variant="body1">Phone: {order?.user?.phoneNo || 'N/A'}</Typography>
                        <Typography variant="body1">Address: {addressToString(order?.address) || addressToString(user?.address)}</Typography>
                    </Box>
                </Box>
                <Divider sx={{ my: 2 }} />

                {/* Order Items */}
                <TableContainer component={Paper} sx={{ mb: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Product</strong></TableCell>
                                <TableCell align="center"><strong>Price (BDT)</strong></TableCell>
                                <TableCell align="center"><strong>Quantity</strong></TableCell>
                                <TableCell align="center"><strong>Subtotal (BDT)</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {order?.cart?.articles.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.product.title}</TableCell>
                                    <TableCell align="center">{calculateDiscountedPrice(item.product.price, item.product.discountPercentage)}</TableCell>
                                    <TableCell align="center">{item.unit}</TableCell>
                                    <TableCell align="center">{calculateItemTotal(item)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Order Summary (At the bottom) */}
                <Box sx={{ textAlign: 'right', mt: 10 }}>
                    <Typography variant="body1">
                        <strong>Subtotal:</strong> BDT {calculateSubtotal()}
                    </Typography>
                    {/* <Typography variant="body1">
                        <strong>Tax (10%):</strong> BDT {calculateTax(calculateSubtotal())}
                    </Typography> */}
                    {order?.discountCoupon && (
                        <Typography variant="body1">
                            <strong>Discount:</strong> -BDT {order?.discountCoupon?.discountAmount?.toFixed(2)}
                        </Typography>
                    )}
                    <Typography variant="body1">
                        <strong>Delivery charge:</strong> BDT {order?.shippingCharge}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h5" fontWeight="bold" color="primary">
                        Total: BDT {order?.totalAmount?.toFixed(2)}
                    </Typography>
                </Box>
            </Box>
        </div>
    );
});

export default PrintableOrder;
