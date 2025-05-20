import axios from 'axios';
import { useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { TextField, Button, Box, Typography, GlobalStyles } from '@mui/material';
import { assets } from '../assets/assets';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${backendUrl}/api/user/admin`, { email, password });
            if (response.data.success) {
                setToken(response.data.token);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    return (
        <>
            <GlobalStyles
                styles={{
                    html: { margin: 0, padding: 0, height: "100%" },
                    body: { margin: 0, padding: 0, height: "100%" },
                    "#root": { height: "100%" },
                }}
            />
            <Box

                sx={{
                    position: 'relative',
                    width: '100%',
                    minHeight: '100vh',
                    backgroundImage: `url(${assets.login_1})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 2,
                }}
            >
                {/* Overlay Form */}
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: 400,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#80e27e', mb: 2, textAlign: 'center' }}>
                        Welcome
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#80e27e', mb: 3, textAlign: 'center' }}>
                        Please login to Admin Dashboard.
                    </Typography>

                    <form onSubmit={onSubmitHandler}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    '& fieldset': {
                                        borderColor: '#80e27e',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#66bb6a',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#4caf50',
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        color: '#4caf50',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    fontSize: '0.875rem',
                                    color: '#6b8e23',
                                    '&.Mui-focused': {
                                        color: '#388e3c',
                                    },
                                },
                            }}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    '& fieldset': {
                                        borderColor: '#80e27e',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#66bb6a',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#4caf50',
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        color: '#4caf50',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    fontSize: '0.875rem',
                                    color: '#6b8e23',
                                    '&.Mui-focused': {
                                        color: '#388e3c',
                                    },
                                },
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                mt: 2,
                                py: 2,
                                backgroundColor: "#447111",
                                "&:hover": {
                                    backgroundColor: "#6B9F3C",
                                },
                                fontWeight: '600',
                                fontSize: '1rem',
                                borderRadius: '8px',
                            }}
                        >
                            Login
                        </Button>
                    </form>
                </Box>
            </Box>
        </>
    );
};

Login.propTypes = {
    setToken: PropTypes.func.isRequired,
};

export default Login;
