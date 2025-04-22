/* import React from 'react';
import { Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import hero from './../assets/hero.jpeg';
import banner_one from './../assets/banner_one.png';
import banner_two from './../assets/banner_two.png';
import banner_three from './../assets/banner_three.png';
import banner_four from './../assets/banner_four.png';
import banner_1 from './../assets/banner_01.png'
import banner_2 from './../assets/banner_02.png'

// Sample images
const images = [
  banner_1,banner_2,banner_one,banner_two,banner_three,banner_four
];

const ImageSlider = () => {
  return (
    <Box width="100%"  margin="auto" >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
          <img 
            src={image} 
            alt={`Slide ${index + 1}`} 
            style={{ width: '100%', maxHeight: '420px', marginTop: '5px', borderRadius: '8px', objectFit: 'cover' }} 
          />
        </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ImageSlider; */

import React from 'react';
import { Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import hero from './../assets/hero.jpeg';
import banner_one from './../assets/banner_one.png';
import banner_two from './../assets/banner_two.png';
import banner_three from './../assets/banner_three.png';
import banner_four from './../assets/banner_four.png';
import banner_1 from './../assets/banner_01.png'
import banner_2 from './../assets/banner_02.png'

// Sample images
const images = [
  banner_1, banner_2, banner_one, banner_four
];

const ImageSlider = () => {
  return (
    <Box
      width="100%"
      margin="auto"
      sx={{
        overflow: 'hidden',
        position: 'relative',
        height: { xs: '200px', sm: '350px', md: '300px', lg: '350px', xl: '350px' },
      }}
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        style={{ height: '100%' }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} style={{ height: '100%' }}>
            {/* <img
              src={image}
              alt={`Slide ${index + 1}`}
              style={{
                width: '100%',
                height: '100%', // Ensures the image fills the height of the container
                borderRadius: '8px',
                objectFit: 'scale-down', // Ensures the image covers the container, cropping if necessary
                display: 'block',
                mx: 'auto'

              }}
            /> */}
            <Box
              component="img"
              src={image}
              alt={`Slide ${index + 1}`}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'contain', // OR 'contain' depending on image type
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ImageSlider;
