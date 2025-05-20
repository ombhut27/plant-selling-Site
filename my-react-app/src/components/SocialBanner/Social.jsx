import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';

const Social = () => {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, py: 6, mb: 0 }}>
      {/* Flex container to handle layout */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 4,
        }}
      >
        {/* Small Image on Left */}
        <Box
          sx={{
            width: { xs: '100%', sm: '55%', md: '55%', lg: 600 },
            height: 'auto',
            borderRadius: 2,
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <img
            src="/social_banner.jpg"
            alt="Social Media"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '12px',
            }}
          />
        </Box>

        {/* Content on Right */}
        <Box sx={{ textAlign: { xs: 'center', sm: 'left' }, maxWidth: { xs: '100%', sm: 500 } }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem', lg: '2rem' },
              maxWidth: { xs: '100%', sm: 500 },
            }}
          >
            Follow Us
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              mb: 4,
              fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
              maxWidth: { xs: '100%', sm: 500 },
              marginBottom: { xs: 2, sm: 3, md: 4 },
            }}
          >
            Explore the beauty of nature — follow us on social media for exclusive plant collections, gardening tips, behind-the-scenes peeks, and special offers just for you!
          </Typography>

          {/* Social Icons */}
          <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' }, gap: 2 }}>
            <IconButton
              sx={{
                fontSize: { xs: '1.5rem', sm: '2rem' },
                color: 'text.secondary',
                '&:hover': { color: '#E4405F' },
              }}
              aria-label="Instagram"
            >
              <InstagramIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              sx={{
                fontSize: { xs: '1.5rem', sm: '2rem' },
                color: 'text.secondary',
                '&:hover': { color: '#1877F2' },
              }}
              aria-label="Facebook"
            >
              <FacebookIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              sx={{
                fontSize: { xs: '1.5rem', sm: '2rem' },
                color: 'text.secondary',
                '&:hover': { color: '#1DA1F2' },
              }}
              aria-label="Twitter"
            >
              <XIcon fontSize="inherit" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Social;
