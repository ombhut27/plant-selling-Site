import React from 'react';
import { Box, Container, Link, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#447111',
        color: '#ffffff',
        py: 2,
        mt: 4,
        fontFamily: 'Roboto, sans-serif',
      }}
    >
      <Container maxWidth="lg">
        {/* Top Row: About Us | Quick Links | Customer Support */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          {/* About Us */}
          <Box sx={{ flex: '1 1 30%', minWidth: '250px' }}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              gutterBottom
              sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem', lg: '1.2rem' } }}
            >
              About Us
            </Typography>
            <Typography
              variant="caption"
              color="grey.400"
              sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem', lg: '0.8rem' } }}
            >
              We are a premier online plant shop dedicated to bringing nature closer to you. From lush indoor plants to vibrant outdoor varieties, we offer a carefully curated selection to enhance your space. Our mission is to make plant care easy and enjoyable for everyone.
            </Typography>
          </Box>

          {/* Quick Links */}
          <Box sx={{ flex: '1 1 20%', minWidth: '120px', ml: { xs: 0, sm: 10, md: 15, lg: 20 } }}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              gutterBottom
              sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem', lg: '1.2rem' } }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              {['Shop', 'About', 'Contact', 'FAQ'].map((text) => (
                <Link
                  key={text}
                  href="#"
                  color="grey.400"
                  underline="hover"
                  sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem', lg: '0.8rem' } }}
                >
                  {text}
                </Link>
              ))}
            </Box>
          </Box>

          {/* Customer Support */}
          <Box sx={{ flex: '1 1 20%', minWidth: '120px' }}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              gutterBottom
              sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem', lg: '1.2rem' } }}
            >
              Customer Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              {[
                'Returns & Exchanges',
                'Shipping Info',
                'Privacy Policy',
                'Terms of Service',
              ].map((text) => (
                <Link
                  key={text}
                  href="#"
                  color="grey.400"
                  underline="hover"
                  sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem', lg: '0.8rem' } }}
                >
                  {text}
                </Link>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Bottom Footer Row */}
        <Box
          sx={{
            borderTop: '1px solid #374151',
            mt: 2,
            pt: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          <Typography
            variant="caption"
            color="grey.500"
            sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem', lg: '0.75rem' } }}
          >
            © 2025 E-Commerce Store. All rights reserved.
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            {['Facebook', 'Twitter', 'Instagram'].map((text) => (
              <Link
                key={text}
                href="#"
                color="grey.400"
                underline="hover"
                sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem', lg: '0.8rem' } }}
              >
                {text}
              </Link>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
