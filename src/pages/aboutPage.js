import React from 'react';
import { Box, Container, Typography, Grid, Avatar, Divider } from '@mui/material';

const teamMembers = [
  { name: "XXXXXXX XXXXXX", role: "CEO", image: "https://via.placeholder.com/150" },
  { name: "YYYYYYY YYYY", role: "CTO", image: "https://via.placeholder.com/150" },
  { name: "ZZZZ ZZZZZZ", role: "COO", image: "https://via.placeholder.com/150" },
];

const AboutUs = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center' }}>
                <Typography variant='h1' align='center' color={'primary'} sx={{ fontFamily: 'Squada One', fontSize: { xs: '40px', md: '50px', lg: '60px' } }}>
                   About Us
                </Typography>
            </Box>
            <Box >
                <Divider sx={{ bgcolor: 'secondary.main', minHeight: '.2vh' }} />
            </Box >
      {/* Our Story Section */}
      
      <Typography variant="body1" align="center" color="text.secondary" paragraph mt={3}>
      At Hena MedMarkt, we take pride in our 23-year journey of providing quality products with integrity and
a strong reputation in the community. Our commitment to excellence has made us a trusted name in
the retail sector, serving our valued customers with a range of products that cater to their diverse
needs. With two conveniently located stores in Pallabi Mirpur, one measuring 700 sqft and the other
600 sqft, we have created a welcoming environment where our customers can explore an extensive
selection of Medicine, Cosmetics, Baby Items, Baby Food, and Moms Feeding Items. Our stores are fully
equipped with a computerized system that streamlines the shopping experience, ensuring that our
customers can easily find what they need while enjoying a seamless transaction process. Our dedicated
team of approximately 20 employees is at the heart of our success. Each member is trained to provide
exceptional customer service, helping you navigate our wide array of products and answering any
questions you may have. We believe that informed customers are satisfied customers, and our staff is
always ready to assist you in making the best choices for your health and well-being. At Hena
MedMarkt, we understand that the needs of families evolve, and we strive to keep our inventory
updated with the latest products that promote health and wellness. From essential Medicines to high-
quality Cosmetics, and from nutritious Baby Food to essential Moms Feeding Items, we are committed
to offering products that enhance the lives of our customers. We also recognize the importance of
supporting new parents, which is why we offer a comprehensive selection of Baby Items. Our products
are carefully chosen to ensure safety and quality, giving parents peace of mind as they care for their
little ones. We want to be your go-to destination for all your family needs, making it easier for you to
find everything under one roof. Integrity and community involvement are at the core of our business
philosophy. Over the years, we have built lasting relationships with our customers, and it is their trust
that motivates us to continue improving our services and expanding our offerings. We are not just a
store; we are a part of the community, and we are dedicated to giving back whenever possible. As we
look to the future, Henna Medicine Point remains committed to evolving with the needs of our
customers. We are continuously researching the latest trends and products in the market to ensure that
we provide you with the best options available. Our goal is to be your first choice for all your Medicine,
Cosmetics, Baby Items, Baby Food, and Moms Feeding Items. Thank you for choosing Hena MedMarkt.
We invite you to visit us and experience our exceptional service and quality products firsthand. Your
satisfaction is our priority, and we look forward to serving you for many more years to come.
      </Typography>

      {/* Our Mission Section */}
      {/* <Box sx={{ my: 6 , fontFamily: 'Poppins' }}>
        <Typography variant="h4" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Our mission is to revolutionize the industry by offering cutting-edge products and unparalleled
          customer experiences. We strive to empower individuals and businesses through innovation, creativity,
          and excellence.
        </Typography>
      </Box>
 */}
      {/* Divider */}
     {/*  <Divider sx={{ my: 6 }} /> */}

      {/* Our Team Section */}
      {/* <Box sx={{ my: 6 }}>
        <Typography variant="h4" gutterBottom>
          Meet Our Team
        </Typography>
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={4} key={index} align="center">
              <Avatar
                alt={member.name}
                src={member.image}
                sx={{ width: 150, height: 150, mb: 2 }}
              />
              <Typography variant="h6">{member.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {member.role}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box> */}
    </Container>
  );
};

export default AboutUs;
