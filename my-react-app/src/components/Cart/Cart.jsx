// All imports remain the same
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Divider,
  Button,
  ButtonGroup,
  List,
  ListItem,
  GlobalStyles,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { removeFromCart, updateCartQuantity } from '../../redux/slices/cartSlice';
import { fetchDisplayProducts } from '../../redux/slices/displayProductSlice';
import CartTotal from './CartTotal';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isXsOrSm = useMediaQuery(theme.breakpoints.down('sm'));

  const cartItems = useSelector((state) => state.cart.cartItems);
  const products = useSelector((state) => state.DisplayProducts.products);
  const productStatus = useSelector((state) => state.DisplayProducts.status);

  const [cartData, setCartData] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [visibleCount, setVisibleCount] = useState(isXsOrSm ? 2 : 3);

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchDisplayProducts());
    }
  }, [dispatch, productStatus]);

  useEffect(() => {
    const items = Object.entries(cartItems)
      .map(([itemId, itemData]) => {
        const product = products.find((p) => p._id === itemId);
        if (!product) return null;
        return {
          id: product._id,
          name: product.name,
          price: product.price[0],
          image: product.image[0],
          quantity: itemData.quantity,
        };
      })
      .filter(Boolean);

    setCartData(items);

    const tempInputs = {};
    items.forEach((item) => {
      tempInputs[item.id] = item.quantity;
    });
    setInputValues(tempInputs);
  }, [cartItems, products]);

  useEffect(() => {
    setVisibleCount(isXsOrSm ? 2 : 3);
  }, [isXsOrSm]);

  const handleQuantityChange = (id, change) => {
    const currentQty = cartItems[id]?.quantity || 1;
    const newQty = Math.max(1, currentQty + change);
    dispatch(updateCartQuantity({ itemId: id, quantity: newQty }));
    setInputValues((prev) => ({ ...prev, [id]: newQty }));
  };

  const initialCount = isXsOrSm ? 2 : 3;

  return (
    <>
      <GlobalStyles
        styles={{
          html: { margin: 0, padding: 0, height: '100%', overflowX: 'hidden' },
          body: { margin: 0, padding: 0, height: '100%', overflowX: 'hidden' },
          '#root': { height: '100%', overflowX: 'hidden' },
        }}
      />

      <Box sx={{ p: 4, mt: 10, textAlign: 'center' }}>
        <Typography
          variant="h5"
          sx={{ fontSize: { xs: '1.4rem', sm: '1.8rem', md: '2rem', lg: '2.2rem' } }}
        >
          Shopping Cart
        </Typography>
      </Box>
      <Divider sx={{ mb: 2, width: '100%' }} />

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, px: 2, gap: 4 }}>
        <Box sx={{ flex: 1 }}>
          {cartData.length === 0 ? (
            <Box sx={{ textAlign: 'center', mb: 10 }}>
              <img
                src="/empty-cart.png"
                alt="Empty Cart"
                style={{ width: 200, height: 200, marginBottom: 16 }}
              />
              <Typography
                variant="h6"
                sx={{ mb: 2, fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' } }}
              >
                Your cart is empty.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                }}
              >
                You have not added anything to your cart yet. Go ahead <br /> and explore top categories!
              </Typography>
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  px: 2,
                  mb: 1,
                  fontWeight: 'bold',
                  justifyContent: 'space-between',
                  gap: 2,
                }}
              >
                <Box sx={{ flex: '1 1 30%' }} color="text.secondary">
                  <Typography sx={{ fontSize: { sm: '0.9rem', md: '1rem' } }}>Product Info</Typography>
                </Box>
                <Box
                  sx={{
                    flex: '1 1 20%',
                    textAlign: 'center',
                    ml: { md: 8, lg: 0 },
                  }}
                  color="text.secondary"
                >
                  <Typography sx={{ fontSize: { sm: '0.9rem', md: '1rem' } }}>Quantity</Typography>
                </Box>
                <Box
                  sx={{
                    flex: '1 1 20%',
                    textAlign: 'center',
                    ml: { md: 3, lg: 0 },
                  }}
                  color="text.secondary"
                >
                  <Typography sx={{ fontSize: { sm: '0.9rem', md: '1rem' } }}>Price</Typography>
                </Box>
                <Box
                  sx={{
                    flex: '1 1 20%',
                    textAlign: 'center',
                  }}
                  color="text.secondary"
                >
                  <Typography sx={{ fontSize: { sm: '0.9rem', md: '1rem' } }}>Total</Typography>
                </Box>
              </Box>

              <List>
                {cartData.slice(0, visibleCount).map((item, idx) => (
                  <Box key={item.id}>
                    <ListItem sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          flex: '1 1 30%',
                          width: '100%',
                          textAlign: 'left',
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: 80,
                            height: 80,
                            marginRight: 16,
                          }}
                        />
                        <Box>
                          <Typography sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                            {item.name}
                          </Typography>
                          <Button
                            onClick={() => dispatch(removeFromCart(item.id))}
                            size="small"
                            sx={{
                              textTransform: 'none',
                              color: 'red',
                              pl: 0,
                              fontSize: { xs: '0.75rem', sm: '0.875rem' },
                            }}
                          >
                            Remove
                          </Button>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          flex: '1 1 20%',
                          display: { xs: 'none', sm: 'flex' },
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <ButtonGroup variant="outlined" size="small">
                          <Button onClick={() => handleQuantityChange(item.id, -1)}>-</Button>
                          <Button disabled>{inputValues[item.id]}</Button>
                          <Button onClick={() => handleQuantityChange(item.id, 1)}>+</Button>
                        </ButtonGroup>
                      </Box>

                      <Box
                        sx={{
                          flex: '1 1 20%',
                          textAlign: 'center',
                          display: { xs: 'none', sm: 'block' },
                        }}
                      >
                        <Typography sx={{ fontSize: { sm: '1rem' } }}>
                          ${item.price.toFixed(2)}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          flex: '1 1 20%',
                          textAlign: 'center',
                          display: { xs: 'none', sm: 'block' },
                        }}
                      >
                        <Typography sx={{ fontSize: { sm: '1rem' } }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: { xs: 'flex', sm: 'none' },
                          flexDirection: 'column',
                          width: '100%',
                          mt: 1,
                          px: 1,
                          gap: 1,
                        }}
                      >
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem' } }}>
                            <strong>Price:</strong> ${item.price.toFixed(2)}
                          </Typography>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem' } }}>
                              <strong>Qty:</strong>
                            </Typography>
                            <ButtonGroup variant="outlined" size="small">
                              <Button onClick={() => handleQuantityChange(item.id, -1)}>-</Button>
                              <Button disabled>{inputValues[item.id]}</Button>
                              <Button onClick={() => handleQuantityChange(item.id, 1)}>+</Button>
                            </ButtonGroup>
                          </Box>
                        </Box>

                        <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem' } }}>
                          <strong>Total:</strong> ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </Box>
                    </ListItem>

                    {idx < visibleCount - 1 && idx < cartData.length - 1 && <Divider sx={{ my: 2 }} />}
                  </Box>
                ))}
              </List>

              {cartData.length > initialCount && (
                <Box textAlign="center" mt={2}>
                  <Button
                    onClick={() =>
                      setVisibleCount(visibleCount === initialCount ? cartData.length : initialCount)
                    }
                    sx={{
                      textTransform: 'none',
                      fontWeight: 'bold',
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                    }}
                  >
                    {visibleCount === initialCount ? 'Show More' : 'Show Less'}
                  </Button>
                </Box>
              )}
            </>
          )}
        </Box>

        {cartData.length > 0 && (
          <>
            <Divider sx={{ display: { xs: 'block', md: 'none' }, my: 3 }} />
            <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
          </>
        )}

        {cartData.length > 0 && (
          <Box sx={{ minWidth: { xs: '100%', md: 400 }, flexShrink: 0 }}>
            <CartTotal />
            <Link to="/place-order">
              <Button
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  backgroundColor: '#447111',
                  color: 'white',
                  fontWeight: 'bold',
                  py: 1.5,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  '&:hover': { backgroundColor: '#6B9F3C' },
                }}
              >
                CHECKOUT
              </Button>
            </Link>
          </Box>
        )}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', ml: { md: 4, xs: 2, sm: 2 }, mt: 4 }}>
        <Link to="/shop">
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/products')}
            sx={{
              textTransform: 'none',
              color: '#7b61ff',
              fontWeight: 'bold',
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
          >
            Continue Shopping
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default Cart;
