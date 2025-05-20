import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserWishlist, removeItemFromWishlist } from '../../redux/slices/wishlistSlice';
import { fetchDisplayProducts } from '../../redux/slices/displayProductSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Divider,
  IconButton,
  Paper,
  CircularProgress,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { products, status } = useSelector((state) => state.DisplayProducts);
  const [wishlistData, setWishlistData] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getUserWishlist(token));
    }

    if (status === 'idle') {
      dispatch(fetchDisplayProducts());
    }
  }, [dispatch, status]);

  useEffect(() => {
    const tempData = Object.keys(wishlistItems)
      .map((itemId) => products.find((product) => product._id === itemId))
      .filter(Boolean);
    setWishlistData(tempData);
  }, [wishlistItems, products]);

  const handleRemoveFromWishlist = (itemId) => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(removeItemFromWishlist(itemId, token));
    }
  };

  const handleAddToCart = (itemId) => {
    dispatch(addToCart({ itemId }));
  };

  const visibleItems = isExpanded ? wishlistData : wishlistData.slice(0, 3);

  if (status === 'loading') {
    return (
      <Box sx={{ textAlign: 'center', pt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ pt: { xs: 2, sm: 1 }, mb: { xs: 6, sm: 8 }, minHeight: '57.94vh' }}>
      <Box sx={{ p: { xs: 2, sm: 4 }, mt: { xs: 4, sm: 7 }, textAlign: 'center' }}>
        <Typography
          variant="h5"
          component="h1"
          fontWeight={400}
          sx={{
            fontSize: { xs: '1.4rem', sm: '1.6rem', md: '1.8rem', lg: '2rem' },
          }}
        >
          My Wishlist
        </Typography>
      </Box>
      <Divider sx={{ mb: { xs: 3, sm: 4 } }} />

      {wishlistData.length > 0 ? (
        <>
          {visibleItems.map((product) => (
            <Paper
              key={product._id}
              variant="outlined"
              sx={{
                mb: { xs: 2, sm: 3 },
                p: { xs: 1.5, sm: 2 },
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: { xs: 'wrap', sm: 'nowrap' },
                gap: { xs: 2, sm: 0 },
              }}
            >
              <IconButton
                onClick={() => handleRemoveFromWishlist(product._id)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  zIndex: 1,
                }}
                size="small"
                aria-label={`Remove ${product.name} from wishlist`}
              >
                <CloseIcon fontSize="small" />
              </IconButton>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: { xs: 1.5, sm: 2 },
                  width: { xs: '100%', sm: 'auto' },
                }}
              >
                <Link
                  to={`/product-detail/${product._id}`}
                  style={{ display: 'flex', textDecoration: 'none', color: 'inherit' }}
                >
                  <Box
                    component="img"
                    src={product.image[0]}
                    alt={product.name}
                    sx={{
                      width: { xs: 56, sm: 80, md: 90, lg: 100 },
                      height: 'auto',
                      borderRadius: 1,
                      objectFit: 'cover',
                    }}
                  />
                  <Box sx={{ ml: { xs: 1.5, sm: 2 } }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={500}
                      noWrap
                      sx={{
                        maxWidth: { xs: 140, sm: 200, md: 300 },
                        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem', lg: '1.2rem' },
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      mt={0.5}
                      sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' } }}
                    >
                      ${product.price}
                    </Typography>
                  </Box>
                </Link>
              </Box>

              <Button
                variant="contained"
                size="small"
                onClick={() => handleAddToCart(product._id)}
                sx={{
                  mt: { xs: 1.5, sm: 4, md: 5, lg: 6 },
                  fontWeight: 'normal',
                  backgroundColor: '#447111',
                  '&:hover': {
                    backgroundColor: '#6B9F3C',
                  },
                  minWidth: { xs: '100%', sm: '120px' },
                }}
              >
                Add to Cart
              </Button>
            </Paper>
          ))}

          {wishlistData.length > 3 && (
            <Box textAlign="center" mt={{ xs: 3, sm: 4 }}>
              <Button
                sx={{ textTransform: 'none', fontWeight: 'bold' }}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? 'Show Less' : 'Show More'}
              </Button>
            </Box>
          )}
        </>
      ) : (
        <Typography
          textAlign="center"
          color="text.secondary"
          py={{ xs: 4, sm: 6 }}
          sx={{
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem', lg: '1.3rem' },
          }}
        >
          Your wishlist is empty.
        </Typography>
      )}
    </Container>
  );
};

export default Wishlist;
