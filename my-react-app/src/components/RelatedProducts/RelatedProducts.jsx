import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoIcon from '@mui/icons-material/Info';

import {
  addItemToWishlist,
  removeItemFromWishlist,
} from '../../redux/slices/wishlistSlice';
import { addToCart, removeFromCart } from '../../redux/slices/cartSlice';

const RelatedProducts = ({ category, currentProductId }) => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.DisplayProducts);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const token = useSelector((state) => state.auth.token);

  const relatedProducts = useMemo(
    () =>
      products.filter(
        (p) => p.category === category && p._id !== currentProductId
      ),
    [products, category, currentProductId]
  );

  if (status === 'loading') return <CircularProgress />;
  if (status === 'failed') {
    return (
      <Typography variant="body1" align="center" color="error">
        Error: {error}
      </Typography>
    );
  }

  return (
    <>
      <Box>
        <Typography
          align="center"
          sx={{
            mb: 2,
            borderBottom: '2px solid black',
            display: 'inline-block',
            pb: 1,
            fontFamily: 'Roboto, sans-serif',
            fontSize: {
              xs: '1.2rem',
              sm: '1.5rem',
              md: '1.75rem',
              lg: '2rem',
            },
          }}
        >
          Related Products
        </Typography>
      </Box>

      <Box
        sx={{
          mt: 4,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 3,
        }}
      >
        {relatedProducts.length > 0 ? (
          relatedProducts.map((product) => (
            <Box
              key={product._id}
              sx={{
                flex: {
                  xs: '0 0 calc(50% - 12px)',
                  sm: '0 0 calc(33.33% - 16px)',
                  md: '0 0 calc(25% - 18px)',
                  lg: '0 0 calc(20% - 20px)',
                },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                maxWidth: '100%',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  '&:hover .icon-container': {
                    transform: 'translateX(0)',
                    opacity: 1,
                  },
                }}
              >
                <Link to={`/product-detail/${product._id}`}>
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                    }}
                  />
                </Link>

                <Box
                  className="icon-container"
                  sx={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    transform: 'translateX(100%)',
                    opacity: 0,
                    transition: 'all 0.4s ease-in-out',
                  }}
                >
                  <FavoriteIcon
                    onClick={(e) => {
                      e.preventDefault();
                      if (wishlistItems[product._id]) {
                        dispatch(removeItemFromWishlist(product._id, token));
                      } else {
                        dispatch(addItemToWishlist(product._id, token));
                      }
                    }}
                    sx={{
                      color: wishlistItems[product._id] ? 'red' : 'white',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      borderRadius: '50%',
                      padding: '4px',
                      fontSize: '23px',
                      cursor: 'pointer',
                      transition: 'color 0.3s',
                    }}
                  />
                  <ShoppingCartIcon
                    onClick={(e) => {
                      e.preventDefault();
                      if (cartItems[product._id]) {
                        dispatch(removeFromCart(product._id));
                      } else {
                        dispatch(addToCart({ itemId: product._id }));
                      }
                    }}
                    sx={{
                      color: cartItems[product._id] ? 'lightgreen' : 'white',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      borderRadius: '50%',
                      padding: '4px',
                      fontSize: '23px',
                      transition: 'color 0.3s',
                      cursor: 'pointer',
                    }}
                  />
                  <Link to={`/product-detail/${product._id}`}>
                    <InfoIcon
                      sx={{
                        color: 'white',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        borderRadius: '50%',
                        padding: '4px',
                        fontSize: '23px',
                        '&:hover': {
                          color: '#3b82f6',
                        },
                      }}
                    />
                  </Link>
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  width: '100%',
                  mt: 2,
                  px: 1,
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: '0.9rem',
                      sm: '1rem',
                      md: '1.1rem',
                    },
                    fontWeight: 300,
                  }}
                >
                  {product.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: {
                      xs: '0.8rem',
                      sm: '0.9rem',
                      md: '1rem',
                    },
                    color: 'text.secondary',
                  }}
                >
                  ${product.price[0]}
                </Typography>
              </Box>
            </Box>
          ))
        ) : (
          <Typography variant="body1" align="center" color="text.secondary">
            No related products found.
          </Typography>
        )}
      </Box>
    </>
  );
};

export default RelatedProducts;
