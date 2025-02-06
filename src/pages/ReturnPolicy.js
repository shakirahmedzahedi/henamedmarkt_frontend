import React from "react";
import { Container, Typography, List, ListItem, Box } from "@mui/material";

const ReturnPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        RETURN POLICY
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Last updated January 01, 2025
      </Typography>
      <Typography variant="body1" paragraph>
        Thank you for your purchase. We hope you are happy with your purchase. However, if you
        are not completely satisfied with your purchase for any reason, you may return it to us
        for an exchange only. Please see below for more information on our return policy.
      </Typography>
      <Typography variant="h5" gutterBottom>
        RETURNS
      </Typography>
      <Typography variant="body1" paragraph>
        All returns must be postmarked within seven (7) days of the purchase date. All returned
        items must be in new and unused condition, with all original tags and labels attached.
      </Typography>
      <Typography variant="h5" gutterBottom>
        RETURN PROCESS
      </Typography>
      <Typography variant="body1" paragraph>
        To return an item, please email customer service at <strong>info@henamedmarkt.com</strong> to obtain a
        Return Merchandise Authorization (RMA) number. After receiving an RMA number, place the
        item securely in its original packaging, and mail your return to the following address:
      </Typography>
      <Box sx={{ p: 2, border: "1px solid grey", borderRadius: 2, backgroundColor: "#f9f9f9" }}>
        <Typography variant="body1">
          <strong>Hena MedMarkt</strong>
          <br /> Attn: Returns
          <br /> RMA #
          <br /> Mirpur, Section-12, Block-C, Road-04, House-19, Pallabi, Dhaka-1216
          <br /> Dhaka, Mirpur-12, Block-C, Road-04, House-19 1216
          <br /> Bangladesh
        </Typography>
      </Box>
      <Typography variant="body1" paragraph>
        Please note, you will be responsible for all return shipping charges. We strongly
        recommend that you use a trackable method to mail your return.
      </Typography>
      <Typography variant="h5" gutterBottom>
        REFUNDS
      </Typography>
      <Typography variant="body1" paragraph>
        After receiving your return and inspecting the condition of your item, we will process
        your exchange. Please allow at least ten (10) days from the receipt of your item to process
        your exchange. We will notify you by email when your return has been processed.
      </Typography>
      <Typography variant="h5" gutterBottom>
        EXCEPTIONS
      </Typography>
      <Typography variant="body1" paragraph>
        The following items cannot be exchanged:
      </Typography>
      <List sx={{ listStyleType: 'disc', pl: 2 }}>
        <ListItem sx={{ display: 'list-item' }}>Use Product cannot be returned, Only Intake Product can be returned.</ListItem>
      </List>
      <Typography variant="body1" paragraph>
        For defective or damaged products, please contact us at the contact details below to
        arrange a refund or exchange.
      </Typography>
      <Typography variant="h5" gutterBottom>
        Please Note
      </Typography>
      <List sx={{ listStyleType: 'disc', pl: 2 }}>
        <ListItem sx={{ display: 'list-item' }}>
          No cosmetic and feeding items can be exchanged or returned once opened. To return the
          parcel, you must return the box provided to us. If the parcel is damaged or lost during
          the return, you will bear it yourself.
        </ListItem>
      </List>
      <Typography variant="h5" gutterBottom>
        QUESTIONS
      </Typography>
      <Typography variant="body1" paragraph>
        If you have any questions concerning our return policy, please contact us at:
      </Typography>
      <Typography variant="body1">
        <strong>01903652681</strong>
        <br /> <strong>info@henamedmarkt.com</strong>
      </Typography>
    </Container>
  );
};

export default ReturnPolicy;