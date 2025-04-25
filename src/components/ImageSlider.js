/* import React from 'react';
import { Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import hero from './../assets/hero.jpeg';
import banner_one from './../assets/pexels-jahoo-388415.jpg';
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

export default ImageSlider;  */

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
        height: { xs: '200px', sm: '25vh', md: '300px', lg: '350px', xl: '450px' },
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
            <Box
              component="img"
              src={image}
              alt={`Slide ${index + 1}`}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: {
                  xs:'contain',
                  sm: 'contain',
                  md: 'contain',
                  lg: 'cover',
                  xl: 'cover',
                }, // OR 'contain' depending on image type
                objectPosition: 'center',
              }}
             
            />
            
          
            
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ImageSlider;


/* import React, { useState, useEffect } from 'react';
import './ImageSlider.css'; // Import the CSS file for styling

import banner_one from './../assets/pexels-jahoo-388415.jpg';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [currentIndex, length]);

  return (
    <div className="slider-container">
      {images.map((image, index) => (
        <div
          className={index === currentIndex ? 'slide active' : 'slide'}
          key={index}
        >
          {index === currentIndex && (
            <img src={image} alt={`Slide ${index}`} className="image" />
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;
 */