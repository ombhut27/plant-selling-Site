import React from 'react';
import { Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const ShopByCategory = () => {
  const categories = [
    { image: '/bonsai_plant.jpg', text: 'Indoor' },
    { image: '/house_plant.jpg', text: 'Outdoor' },
    { image: '/office_plant.jpg', text: 'Bonsai' },
    { image: '/gift_plant.jpg', text: 'Hanging' },
  ];

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Typography
        variant="h4"
        sx={{
          marginBottom: 4,
          textAlign: 'center',
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
        }}
      >
        Shop by Category
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 2,
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        {categories.map((category, index) => (
          <Box
            key={index}
            component={Link}
            to={`/collection/${category.text}`}
            sx={{
              position: 'relative',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: 2,
              textDecoration: 'none',
              width: { xs: '45%', sm: '22%' },
              height: { xs: 140, sm: 180, md: 220, lg: 250 },
              '&:hover img': {
                transform: 'scale(1.05)',
                transition: 'transform 0.3s ease-in-out',
              },
            }}
          >
            <img
              src={category.image}
              alt={category.text}
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
              }}
            />
            <Typography
              variant="h6"
              sx={{
                position: 'absolute',
                bottom: 10,
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'white',
                textShadow: '2px 2px 6px rgba(0, 0, 0, 0.7)',
                backgroundColor: 'rgba(0,0,0,0.4)',
                padding: '4px 10px',
                borderRadius: 1,
                fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                textAlign: 'center',
              }}
            >
              {category.text}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ShopByCategory;
