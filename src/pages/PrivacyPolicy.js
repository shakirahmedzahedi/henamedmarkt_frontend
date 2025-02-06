import React from "react";
import { Container, Typography, Paper, Box } from "@mui/material";

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md">
      {/* <Paper elevation={3} sx={{ p: 4, my: 4 }}> */}
        <Typography variant="h4" gutterBottom>
          Privacy Policy
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Last updated: November 18, 2024
        </Typography>
        <Typography variant="body1" paragraph>
          This Privacy Policy describes Our policies and procedures on the collection, use
          and disclosure of Your information when You use the Service and tells You about
          Your privacy rights and how the law protects You.
        </Typography>
        <Typography variant="body1" paragraph>
          We use Your Personal data to provide and improve the Service. By using the
          Service, You agree to the collection and use of information in accordance with
          this Privacy Policy.
        </Typography>
        
        <Box my={3}>
          <Typography variant="h5">Interpretation and Definitions</Typography>
          <Typography variant="h6">Interpretation</Typography>
          <Typography variant="body1" paragraph>
            The words of which the initial letter is capitalized have meanings defined under the
            following conditions. The following definitions shall have the same meaning regardless of
            whether they appear in singular or in plural.
          </Typography>
        </Box>

        <Box my={3}>
          <Typography variant="h6">Definitions</Typography>
          <Typography variant="body1" paragraph>
            For the purposes of this Privacy Policy:
          </Typography>
          <Typography variant="body1" component="ul">
            <li><strong>Account:</strong> A unique account created for You to access our Service.</li>
            <li><strong>Affiliate:</strong> An entity that controls, is controlled by or is under common control with a party.</li>
            <li><strong>Company:</strong> Hena MedMarkt, Mirpur, Section-12, Block-D, Muslim Bazar, Main Road, Dhaka-1216.</li>
            <li><strong>Cookies:</strong> Small files placed on Your device to track activity and store preferences.</li>
            <li><strong>Country:</strong> Bangladesh</li>
            <li><strong>Device:</strong> Any device that can access the Service.</li>
            <li><strong>Personal Data:</strong> Any information that relates to an identified or identifiable individual.</li>
            <li><strong>Service:</strong> Refers to the Website.</li>
            <li><strong>Service Provider:</strong> Any third-party company or individual employed to process data on behalf of the Company.</li>
            <li><strong>Usage Data:</strong> Data collected automatically, such as IP address, browser type, and visit duration.</li>
            <li><strong>Website:</strong> Hena MedMarkt, accessible from <a href="https://henamedmarkt.com/">https://henamedmarkt.com/</a></li>
            <li><strong>You:</strong> The individual accessing or using the Service.</li>
          </Typography>
        </Box>
        
        <Box my={3}>
          <Typography variant="h5">Collecting and Using Your Personal Data</Typography>
          <Typography variant="h6">Types of Data Collected</Typography>
          <Typography variant="body1" paragraph>
            Personal Data: While using Our Service, We may ask You to provide Us with certain personally identifiable
            information that can be used to contact or identify You, including but not limited to:
          </Typography>
          <Typography variant="body1" component="ul">
            <li>Email address</li>
            <li>First name and last name</li>
            <li>Phone number</li>
            <li>Address, State, Province, ZIP/Postal code, City</li>
            <li>Usage Data</li>
          </Typography>
        </Box>

        <Box my={3}>
          <Typography variant="h6">Tracking Technologies and Cookies</Typography>
          <Typography variant="body1" paragraph>
            We use Cookies and similar tracking technologies to track activity and improve Our Service.
            The technologies We use may include:
          </Typography>
          <Typography variant="body1" component="ul">
            <li><strong>Cookies or Browser Cookies:</strong> A small file placed on Your Device.</li>
            <li><strong>Web Beacons:</strong> Small electronic files used for analytics.</li>
          </Typography>
        </Box>

        <Box my={3}>
          <Typography variant="h6">Use of Your Personal Data</Typography>
          <Typography variant="body1" paragraph>
            The Company may use Personal Data for the following purposes:
          </Typography>
          <Typography variant="body1" component="ul">
            <li>To provide and maintain our Service.</li>
            <li>To manage Your Account.</li>
            <li>To perform a contract.</li>
            <li>To contact You regarding updates or security notifications.</li>
            <li>To provide news, special offers, and relevant information.</li>
            <li>For business transfers and internal analysis.</li>
          </Typography>
        </Box>

        <Box my={3}>
          <Typography variant="h6">Security of Your Personal Data</Typography>
          <Typography variant="body1" paragraph>
            The security of Your Personal Data is important to Us, but no method of transmission over the Internet is 100% secure.
          </Typography>
        </Box>

        <Box my={3}>
          <Typography variant="h6">Children's Privacy</Typography>
          <Typography variant="body1" paragraph>
            Our Service does not address anyone under the age of 13.
          </Typography>
        </Box>

        <Box my={3}>
          <Typography variant="h6">Changes to this Privacy Policy</Typography>
          <Typography variant="body1" paragraph>
            We may update Our Privacy Policy from time to time. You are advised to review this Privacy Policy periodically.
          </Typography>
        </Box>

        <Box my={3}>
          <Typography variant="h6">Contact Us</Typography>
          <Typography variant="body1" paragraph>
            If you have any questions about this Privacy Policy, You can contact us:
          </Typography>
          <Typography variant="body1" component="ul">
            <li>Email: info@henamedmarkt.com</li>
            <li>Website: <a href="https://henamedmarkt.com/">https://henamedmarkt.com/</a></li>
            <li>Phone: 01903652681</li>
          </Typography>
        </Box>
      {/* </Paper> */}
    </Container>
  );
};

export default PrivacyPolicy;
