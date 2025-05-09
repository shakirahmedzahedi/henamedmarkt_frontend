import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Menu, MenuItem, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders } from '../../reducer/services/OrderService';
import PrintableOrder from '../../components/PrintableOrder';
import { useReactToPrint } from "react-to-print";

const OrderTable = ({ onShowDetails, onUpdateStatus }) => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.allorders);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentOrder, setCurrentOrder] = React.useState(null);
  const contentRef = useRef(null);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  

  const handleClickMenu = (event, order) => {
    setAnchorEl(event.currentTarget);
    setCurrentOrder(order);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setCurrentOrder(null);
  };

  const handleDetailsClick = () => {
    handleCloseMenu();
    onShowDetails(currentOrder);
  };

  const handleUpdateClick = () => {
    handleCloseMenu();
    onUpdateStatus(currentOrder);
  };
 /*  const handlePrint = useReactToPrint({
    content: () =>{
      alert("Hello");
      console.log("Current Order: ", currentOrder);
      console.log(componentRef.current); // Check if this logs the PrintableOrder component correctly
      return componentRef.current;
    },  // This is where you need to pass the ref
    documentTitle: `Invoice_${currentOrder?.id}`,
  }); */

  const handlePrint = useReactToPrint({ contentRef });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
        All Orders
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Order Number</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">
                Total
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">
                Order Status
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">
                Update
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">
                Options
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.length > 0 ? (
              orders.map((order, index) => (
                <TableRow
                  key={order.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white',
                  }}
                >
                  <TableCell>{order.id}</TableCell>
                  <TableCell align="right">{order.totalAmount}</TableCell>
                  <TableCell align="right">{order.orderStatus}</TableCell>
                  <TableCell align="right">{new Date(order.updatedAt).toLocaleString()}</TableCell>
                  <TableCell align="right">
                    <Button onClick={(event) => handleClickMenu(event, order)}>Options</Button>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                      <MenuItem onClick={handleDetailsClick}>Show Details</MenuItem>
                      <MenuItem onClick={handleUpdateClick}>Update Status</MenuItem>
                      <MenuItem onClick={() => {
                        setCurrentOrder(order);
                          handleCloseMenu();
                          handlePrint();
                        }}
                        >
                          Print
                          </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No Orders available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {currentOrder && (
        <div style={{ display: "none" }}>
          <PrintableOrder ref={contentRef} order={currentOrder} />
        </div>
      )}
    </Box>
  );
};

export default OrderTable;
