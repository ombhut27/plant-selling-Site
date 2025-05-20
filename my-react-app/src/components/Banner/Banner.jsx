import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box } from '@mui/material';

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChange = (index) => {
    if (index >= currentIndex) {
      setCurrentIndex(index);
    }
  };

  return (
    <Box
      sx={{
        width: {
          xs: '100%',  
          sm: '100%',  
          md: '100%',  
          lg: '100%',  
          xl: '100%' 
        },
        margin: 'auto',
          mt: {
          xs: 8,   
          sm: 8,   
          md: 8,  
          lg: 8,  
        },
      }}
    >
      <Carousel
        showThumbs={false}
        infiniteLoop
        showStatus={false}
        interval={2000}
        autoPlay
        transitionTime={500}
        stopOnHover={true}
        dynamicHeight={true}
        selectedItem={currentIndex}
        onChange={handleChange}
        swipeable={false}
        emulateTouch={false}
      >
        <div>
          <img
            src="/banner_11.jpg"
            alt="Slide 1"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '600px',
              objectFit: 'cover',
            }}
          />
        </div>
        <div>
          <img
            src="/banner_22.jpg"
            alt="Slide 2"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '600px',
              objectFit: 'cover',
            }}
          />
        </div>
      </Carousel>
    </Box>
  );
};

export default ImageCarousel;
