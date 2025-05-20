import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Fade } from "@mui/material";
import { Link } from "react-router-dom";
import { fetchDisplayProducts } from "../../redux/slices/displayProductSlice";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "../../redux/slices/wishlistSlice";
import {
  addToCart,
  removeFromCart,
} from "../../redux/slices/cartSlice";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InfoIcon from "@mui/icons-material/Info";

const ProductDisplay = () => {
  const dispatch = useDispatch();

  const { products, status, error } = useSelector((state) => state.DisplayProducts);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const token = useSelector((state) => state.auth.token);

  const [selectedCategory, setSelectedCategory] = useState("new arrivals");
  const [animateProducts, setAnimateProducts] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDisplayProducts());
    }
  }, [dispatch, status]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setAnimateProducts(true);
  };

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === "new arrivals") return product.newarrival;
    if (selectedCategory === "best sellers") return product.bestseller;
    if (selectedCategory === "hot sales") return product.hotsales;
    return false;
  });

  const limitedProducts = filteredProducts.slice(0, 4);

  useEffect(() => {
    if (animateProducts) {
      const timeout = setTimeout(() => setAnimateProducts(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [animateProducts]);

  return (
    <Box sx={{ p: 4, mt: 0 }}>
      {/* Category Tags */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
          mb: 5,
        }}
      >
        {["new arrivals", "best sellers", "hot sales"].map((category) => (
          <Typography
            key={category}
            variant="h6"
            sx={{
              cursor: "pointer",
              pb: 0.5,
              borderBottom:
                selectedCategory === category ? "2px solid black" : "none",
              color: selectedCategory === category ? "black" : "gray",
              transition: "all 0.3s",
              "&:hover": { color: "black" },
              fontSize: {
                xs: "14px",
                sm: "16px",
                md: "18px",
                lg: "20px",
              },
            }}
            onClick={() => handleCategoryChange(category)}
          >
            {category.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
          </Typography>
        ))}
      </Box>

      {/* Loading/Error */}
      {status === "loading" && (
        <Typography align="center" variant="body1" color="text.secondary">
          Loading products...
        </Typography>
      )}
      {status === "failed" && (
        <Typography align="center" variant="body1" color="error">
          Error: {error}
        </Typography>
      )}

      {/* Product Flex Layout */}
      {status === "succeeded" && (
        <Fade in={!animateProducts} timeout={500}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 3,
              maxWidth: "1200px",
              mx: "auto",
            }}
          >
            {limitedProducts.length > 0 ? (
              limitedProducts.map((product) => {
                const isInWishlist = wishlistItems[product._id];
                const isInCart = cartItems[product._id];

                return (
                  <Box
                    key={product._id}
                    sx={{
                      flexBasis: {
                        xs: "calc(50% - 12px)",
                        sm: "calc(33.33% - 16px)",  
                        md: "calc(33.33% - 16px)",
                        lg: "calc(25% - 18px)",
                      },
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      position: "relative",
                      overflow: "hidden",
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        "&:hover .icon-container": {
                          transform: "translateX(0)",
                          opacity: 1,
                        },
                      }}
                    >
                      <Link to={`/product-detail/${product._id}`}>
                        <Box
                          component="img"
                          src={product.image[0]}
                          alt={product.name}
                          sx={{
                            display: "block",
                            width: "100%",
                            maxWidth: {
                              xs: "250px",
                              sm: "250px",
                              md: "250px",
                              lg: "250px",
                            },
                            height: "auto",
                            aspectRatio: "1 / 1",
                            objectFit: "cover",
                            mx: "auto",
                          }}
                        />
                      </Link>

                      {/* Sliding Icon Container */}
                      <Box
                        className="icon-container"
                        sx={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                          transform: "translateX(100%)",
                          opacity: 0,
                          transition: "all 0.4s ease-in-out",
                        }}
                      >
                        <FavoriteIcon
                          onClick={(e) => {
                            e.preventDefault();
                            if (isInWishlist) {
                              dispatch(removeItemFromWishlist(product._id, token));
                            } else {
                              dispatch(addItemToWishlist(product._id, token));
                            }
                          }}
                          sx={{
                            color: isInWishlist ? "red" : "white",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            borderRadius: "50%",
                            padding: "4px",
                            fontSize: "23px",
                            cursor: "pointer",
                          }}
                        />

                        <ShoppingCartIcon
                          onClick={(e) => {
                            e.preventDefault();
                            if (isInCart) {
                              dispatch(removeFromCart(product._id));
                            } else {
                              dispatch(addToCart({ itemId: product._id }));
                            }
                          }}
                          sx={{
                            color: isInCart ? "lightgreen" : "white",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            borderRadius: "50%",
                            padding: "4px",
                            fontSize: "23px",
                            cursor: "pointer",
                          }}
                        />

                        <Link to={`/product-detail/${product._id}`}>
                          <InfoIcon
                            sx={{
                              color: "white",
                              backgroundColor: "rgba(0, 0, 0, 0.5)",
                              borderRadius: "50%",
                              padding: "4px",
                              fontSize: "23px",
                              "&:hover": {
                                color: "#3b82f6",
                              },
                            }}
                          />
                        </Link>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        width: "100%",
                        mt: 2,
                        px: 1,
                        ml: {
                          xs: 1,
                          sm: 6,
                          md: 6,
                          lg: 4,
                        },
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontSize: {
                            xs: "13px",
                            sm: "16px",
                            md: "18px",
                            lg: "20px",
                          },
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontSize: {
                            xs: "11px",
                            sm: "14px",
                            md: "16px",
                            lg: "18px",
                          },
                        }}
                      >
                        ${product.price[0]}
                      </Typography>
                    </Box>
                  </Box>
                );
              })
            ) : (
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  textAlign: "center",
                  mt: 4,
                  fontSize: {
                    xs: "14px",
                    sm: "16px",
                    md: "18px",
                    lg: "20px",
                  },
                }}
              >
                No products available in this category.
              </Typography>
            )}
          </Box>
        </Fade>
      )}
    </Box>
  );
};

export default ProductDisplay;
