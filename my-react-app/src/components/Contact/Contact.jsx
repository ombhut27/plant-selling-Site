import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import NewsletterBox from '../NewsLetter/NewsLetter';

const Contact = () => {
  return (
    <Box sx={{ mx: { xs: 2, sm: 4, md: 10, lg: 20 }, mb: 10 }}>
      <Box
        sx={{
          my: { xs: 6, sm: 8, md: 10 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 6, md: 10 },
          alignItems: { xs: 'center', md: 'flex-start' },
          mt: { xs: 9, sm: 10},
        }}
      >
        <Box
          component="img"
          src="/contact_img.png"
          alt="Contact"
          sx={{
            width: { xs: '90%', sm: '80%', md: '60%', lg: '50%' },
            maxWidth: '700px',
            height: { xs: '250px', sm: '350px', md: '500px' }, 
            ml: { xs: 0, md: 4, lg: 8 },
            boxShadow: 3,
          }}
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: { xs: 3, md: 6 },
            textAlign: { xs: 'center', md: 'left' },
            width: { xs: '100%', md: '40%' },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: 'gray.600',
              fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.4rem' },
            }}
          >
            Contact Us :
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: 'gray.500',
              fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
              lineHeight: 1.6,
            }}
          >
            54709 Willms Station <br /> Suite 350, Washington, USA
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: 'gray.500',
              fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
              lineHeight: 1.6,
            }}
          >
            Tel: (415) 555-0132 <br /> Email: admin@pickaplant.com
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: 'gray.600',
              fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.4rem' },
              mt: 2,
            }}
          >
            About Us :
          </Typography>

          <Link to="/about" style={{ width: '100%' }}>
            <Button
              variant="outlined"
              sx={{
                width: '100%',
                px: { xs: 3, sm: 4, md: 6 },
                py: { xs: 1, md: 1.5 },
                mt: 2,
                fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                '&:hover': { backgroundColor: '#447111', color: 'white' },
                transition: 'all 0.5s',
                borderRadius: 2,
              }}
            >
              Explore About Us
            </Button>
          </Link>
        </Box>
      </Box>

      <NewsletterBox />

    </Box>
  );
};

export default Contact;
