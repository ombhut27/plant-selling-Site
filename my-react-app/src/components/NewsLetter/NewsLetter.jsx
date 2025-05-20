import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

    return (
        <Box sx={{ textAlign: 'center', px: 2 }}>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    color: '#333',
                    fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem', lg: '1.75rem' }
                }}
            >
                Subscribe now & get 20% off
            </Typography>
            <Typography
                variant="body2"
                sx={{
                    color: 'text.secondary',
                    mt: 1,
                    fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }
                }}
            >
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </Typography>
            <form
                onSubmit={onSubmitHandler}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '1.5rem',
                    gap: '1rem',
                }}
            >
                <TextField
                    label="Enter your email"
                    type="email"
                    required
                    variant="outlined"
                    sx={{
                        width: {
                            xs: '100%',
                            sm: '400px',
                            md: '400px',
                            lg: '400px'
                        }
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        bgcolor: 'black',
                        color: 'white',
                        textTransform: 'uppercase',
                        paddingX: { xs: 3, sm: 4 },
                        paddingY: { xs: 1.5, sm: 2 },
                        fontSize: { xs: '0.7rem', sm: '0.75rem' },
                        width: { xs: '100%', sm: 'auto' }
                    }}
                >
                    Subscribe
                </Button>
            </form>
        </Box>
    );
};

export default NewsletterBox;
