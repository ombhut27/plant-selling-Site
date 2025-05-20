import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';

const Navbar = ({ isCollapsed, setToken }) => {
    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: '#ffffff',
                boxShadow: 'none',
                marginLeft: isCollapsed ? '70px' : '240px',
                transition: 'margin-left 0.3s',
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <img
                    src="/logo.png"
                    alt="Logo"
                    style={{ width: '90px', objectFit: 'contain' }}
                />

                <Button
                    variant="contained"
                    color="error"
                    sx={{
                        borderRadius: '999px',
                        fontWeight: 600,
                        textTransform: 'none',
                        mr: isCollapsed ? 10 : 30
                    }}
                    onClick={() => setToken('')}
                >
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
