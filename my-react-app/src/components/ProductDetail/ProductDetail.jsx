import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { addItemToWishlist } from '../../redux/slices/wishlistSlice';
import { fetchDisplayProducts } from '../../redux/slices/displayProductSlice';
import {
    Box,
    Button,
    Typography,
    Divider,
    CircularProgress,
} from '@mui/material';
import RelatedProducts from '../RelatedProducts/RelatedProducts';
import YardIcon from '@mui/icons-material/Yard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CachedIcon from '@mui/icons-material/Cached';

const ProductDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const { products, status } = useSelector((state) => state.DisplayProducts);
    const token = useSelector((state) => state.auth.token);

    const [product, setProduct] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        dispatch(fetchDisplayProducts());
    }, [dispatch]);

    useEffect(() => {
        if (products.length > 0) {
            const foundProduct = products.find((p) => p._id === id);
            setProduct(foundProduct);
            if (foundProduct && foundProduct.image?.length > 0) {
                setImage(foundProduct.image[0]);
            }
        }
    }, [products, id]);

    if (status === 'loading' || !product) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    const handleAddToWishlist = () => {
        dispatch(addItemToWishlist(product._id, token));
    };

    return (
        <Box
            sx={{
                paddingTop: { xs: 6, sm: 8 },
                paddingX: { xs: 2, sm: 4, md: 8, lg: 20 },
                mt: { xs: 4, sm: 6, md: 8 },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    maxWidth: '1200px',
                    width: '100%',
                    paddingBottom: { xs: 6, sm: 10 },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: { xs: 4, sm: 6 },
                        width: '100%',
                    }}
                >
                    {/* Left Section */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column-reverse', md: 'row' },
                            flex: 1,
                            alignItems: 'center',
                            gap: { xs: 2, md: 4 },
                        }}
                    >
                        {/* Thumbnails */}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: {
                                    xs: 'row',
                                    md: 'column',
                                },
                                flexWrap: 'wrap',
                                gap: 2,
                                width: {
                                    xs: '100%',
                                    md: '20%',
                                },
                                justifyContent: {
                                    xs: 'center',
                                    md: 'flex-start',
                                },
                                alignItems: 'center',
                            }}
                        >
                            {product.image.map((img, index) => (
                                <Box
                                    key={img}
                                    component="img"
                                    src={img}
                                    alt={`Product thumbnail ${index + 1}`}
                                    onClick={() => setImage(img)}
                                    sx={{
                                        width: { xs: '60px', sm: '70px', md: '80px' },
                                        height: 'auto',
                                        cursor: 'pointer',
                                        borderRadius: 2,
                                        border: '1px solid #e0e0e0',
                                    }}
                                />
                            ))}
                        </Box>

                        {/* Main Image */}
                        <Box
                            sx={{
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                maxHeight: '600px',
                            }}
                        >
                            <Box
                                component="img"
                                src={image}
                                alt="Selected product"
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: 2,
                                    maxWidth: '100%',
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Right Section */}
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h5" sx={{ mb: 1 }}>
                            {product.name}
                        </Typography>

                        <Typography
                            variant="h6"
                            color="text.secondary"
                            fontWeight="medium"
                            sx={{ mt: 1 }}
                        >
                            ${product.price[0]}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ mt: 3 }}
                        >
                            {product.description}
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                gap: 2,
                                mt: 4,
                            }}
                        >
                            <Button
                                variant="contained"
                                sx={{
                                    flex: 1,
                                    backgroundColor: '#447111',
                                    '&:hover': { backgroundColor: '#3c5e10' },
                                }}
                                onClick={() =>
                                    dispatch(addToCart({ itemId: product._id }))
                                        .unwrap()
                                        .catch(console.error)
                                }
                            >
                                ADD TO CART
                            </Button>

                            <Button
                                variant="outlined"
                                sx={{
                                    flex: 1,
                                    borderColor: '#447111',
                                    color: '#447111',
                                    '&:hover': {
                                        borderColor: '#3c5e10',
                                        color: '#3c5e10',
                                    },
                                }}
                                onClick={handleAddToWishlist}
                            >
                                ADD TO WISHLIST
                            </Button>
                        </Box>

                        <Divider sx={{ mt: 5 }} />

                        <Box
                            sx={{
                                mt: 3,
                                fontSize: 'small',
                                color: 'text.secondary',
                            }}
                        >
                            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                                <YardIcon fontSize="small" sx={{ color: 'lightgreen', mr: 1 }} />
                                100% Healthy and Original Plants.
                            </Typography>
                            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                                <LocalShippingIcon fontSize="small" sx={{ color: 'red', mr: 1 }} />
                                Cash on delivery available across India.
                            </Typography>
                            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                                <CachedIcon fontSize="small" sx={{ color: 'blue', mr: 1 }} />
                                Easy 7-day replacement for damaged or unhealthy plants.
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <RelatedProducts
                category={product.category}
                currentProductId={product._id}
            />
        </Box>
    );
};

export default ProductDetail;
