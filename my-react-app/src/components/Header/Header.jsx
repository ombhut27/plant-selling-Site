import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import {
  Favorite,
  AccountCircle,
  ShoppingCart,
  Menu as MenuIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { resetCart } from '../../redux/slices/cartSlice';
import { resetWishlist } from '../../redux/slices/wishlistSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const wishlistCount = useSelector((state) => Object.keys(state.wishlist.items).length);
  const cartCount = useSelector((state) =>
    Object.values(state.cart.cartItems).reduce((total, item) => total + (item.quantity || 0), 0)
  );

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetCart());
    dispatch(resetWishlist());
    navigate('/home');
  };

  const navLinks = [
    { label: 'Home', path: '/home' },
    { label: 'Shop', path: '/shop' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'My Orders', path: '/my-orders' },
  ];

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: 'white' }} elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Left: Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logo.png" alt="Pick A Plant Logo" style={{ height: 70 }} />
          </Box>

          {/* Middle: Nav links (hidden on small screens) */}
          <Box
            sx={{
              display: {
                xs: 'none',
                sm: 'none',
                md: 'flex',
              },
              gap: 2,
              flexGrow: 1,
              justifyContent: 'center',
            }}
          >
            {navLinks.map((link) => (
              <Button
                key={link.label}
                component={Link}
                to={link.path}
                sx={{
                  color: 'black',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#447111',
                  },
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          {/* Right: Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isAuthenticated ? (
              <Button
                onClick={handleLogout}
                sx={{
                  color: 'black',
                  fontSize: '0.9rem',
                  display: { xs: 'none', sm: 'none', md: 'block' },
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#447111',
                  },
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                component={Link}
                to="/signup"
                sx={{
                  color: 'black',
                  fontSize: '0.9rem',
                  display: { xs: 'none', sm: 'none', md: 'block' },
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#447111',
                  },
                }}
              >
                Sign In
              </Button>
            )}

            <IconButton component={Link} to="/wishlist" sx={{ color: 'black' }}>
              <Badge badgeContent={wishlistCount} color="primary">
                <Favorite />
              </Badge>
            </IconButton>

            <IconButton component={Link} to="/cart" sx={{ color: 'black' }}>
              <Badge badgeContent={cartCount} color="primary">
                <ShoppingCart />
              </Badge>
            </IconButton>

            <IconButton sx={{ color: 'black' }}>
              <AccountCircle />
            </IconButton>

            {/* Hamburger menu (visible on small screens) */}
            <IconButton
              onClick={toggleDrawer}
              sx={{ display: { md: 'none' }, color: 'black' }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for small screens */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }} role="presentation">
          {/* Close button inside drawer */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            <IconButton onClick={toggleDrawer}>
              <ChevronRightIcon />
            </IconButton>
          </Box>

          <List>
            {navLinks.map((link) => (
              <ListItem key={link.label} disablePadding>
                <ListItemButton
                  component={Link}
                  to={link.path}
                  onClick={toggleDrawer}
                >
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  toggleDrawer();
                  isAuthenticated ? handleLogout() : navigate('/signup');
                }}
              >
                <ListItemText primary={isAuthenticated ? 'Logout' : 'Sign In'} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
