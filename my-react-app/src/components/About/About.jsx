import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import NewsletterBox from '../NewsLetter/NewsLetter';

const AboutUs = () => {
  return (
    <Box sx={{ width: '100%', overflow: 'hidden', mb: 10 }}>
      {/* Top Image Section */}
      <Box
        sx={{
          height: { xs: '250px', sm: '300px', md: '550px', lg: '550px' },
          backgroundImage: 'url("/about.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderBottomLeftRadius: '100px',
          borderBottomRightRadius: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 4,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: 'white',
            mt: 7,
            fontWeight: 700,
            fontFamily: 'Roboto',
            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem', lg: '3rem' },
            letterSpacing: '1px',
            textTransform: 'uppercase',
            p: 2,
            borderRadius: '12px',
          }}
        >
          About Us
        </Typography>
      </Box>

      {/* Content Section */}
      <Grid container spacing={4} sx={{ px: { xs: 2, md: 8 }, pb: 8 }}>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: '#333',
              mb: 2,
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem', lg: '1.8rem' },
              lineHeight: 1.2,
            }}
          >
            We Work Hard To Provide You
            <br />
            The Best Quality Plants
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem', lg: '1.15rem' },
              lineHeight: 1.6,
            }}
          >
            At Pick a Plant, we are dedicated to providing you with the finest selection of plants.
            Our team works tirelessly to ensure that every plant we sell is of the highest quality,
            ensuring a perfect addition to your home or office. We specialize in a wide variety of plants
            to suit every taste and need, offering everything from lush indoor plants to garden-ready options.
            Our mission is to make plant ownership easy and enjoyable for everyone, regardless of experience level.
          </Typography>
        </Grid>
      </Grid>

      {/* Why Choose Us Section */}
      <Box sx={{ px: { xs: 2, md: 8 }, mb: 8 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 200,
            mb: 4,
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem', lg: '1.3rem' },
            letterSpacing: '0.8px',
          }}
        >
          WHY CHOOSE US :
        </Typography>
        <Box sx={{ overflowX: 'auto' }}>
          <Grid
            container
            spacing={0}
            sx={{
              flexWrap: { xs: 'wrap', sm: 'nowrap' },
            }}
          >
            {[
              {
                title: 'Premium Plant Selection:',
                description:
                  'We carefully handpick every plant to ensure it is healthy, vibrant, and ready to thrive in your space.',
              },
              {
                title: 'Hassle-Free Shopping:',
                description:
                  'Our seamless online experience makes it easy to browse, select, and order your favorite plants from the comfort of your home.',
              },
              {
                title: 'Expert Support & Care Tips:',
                description:
                  'Our team of plant experts is always available to guide you with personalized care tips and support, ensuring your plants flourish.',
              },
            ].map((item, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Box
                  sx={{
                    border: '1px solid #e0e0e0',
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    borderRadius: 0,
                    boxSizing: 'border-box',
                    mb: { xs: 2, sm: 0 },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      mb: 2,
                      fontSize: { xs: '1.1rem', sm: '1.15rem', md: '1.25rem', lg: '1.3rem' },
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.secondary',
                      fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem', lg: '1.05rem' },
                      lineHeight: 1.5,
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Newsletter Section */}
      <NewsletterBox />
    </Box>
  );
};

export default AboutUs;
