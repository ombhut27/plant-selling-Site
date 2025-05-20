import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InfoIcon from "@mui/icons-material/Info";

import { fetchFilteredProducts } from "../../redux/slices/productSlice";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "../../redux/slices/wishlistSlice";
import {
  addToCart,
  removeFromCart,
} from "../../redux/slices/cartSlice";

const Collection = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { products, status, pagination } = useSelector((state) => state.products);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const token = useSelector((state) => state.auth.token);

  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    if (category) {
      dispatch(fetchFilteredProducts({ category: [category], page, limit }));
    }
  }, [dispatch, category, page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= (pagination?.totalPages || 1)) {
      setPage(newPage);
    }
  };

  if (status === "loading") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ px: 2, mt: 12 }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, textAlign: "center", fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" } }}
      >
        {category} Plants
      </Typography>

      {/* Main container with flexbox layout */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
        }}
      >
        {products.map((product) => (
          <Box
            key={product._id}
            sx={{
              width: "calc(50% - 16px)",
              maxWidth: "250px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
              overflow: "hidden",
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
                <img
                  src={product.image?.[0] || "/placeholder.jpg"}
                  alt={product.name}
                  style={{
                    display: "block",
                    width: "100%",
                    height: "auto",
                  }}
                  sx={{
                    width: { xs: "150px", sm: "200px", md: "250px", lg: "300px" },
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
              </Link>

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
                    if (wishlistItems[product._id]) {
                      dispatch(removeItemFromWishlist(product._id, token));
                    } else {
                      dispatch(addItemToWishlist(product._id, token));
                    }
                  }}
                  sx={{
                    color: wishlistItems[product._id] ? "red" : "white",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderRadius: "50%",
                    padding: "4px",
                    fontSize: { xs: "20px", sm: "23px", md: "25px" },
                    cursor: "pointer",
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
                    color: cartItems[product._id] ? "lightgreen" : "white",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderRadius: "50%",
                    padding: "4px",
                    fontSize: { xs: "20px", sm: "23px", md: "25px" },
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
                      fontSize: { xs: "20px", sm: "23px", md: "25px" },
                      "&:hover": { color: "#3b82f6" },
                    }}
                  />
                </Link>
              </Box>
            </Box>

            <Typography
              variant="subtitle1"
              align="left"
              sx={{
                mt: 2,
                width: "100%",
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.2rem", lg: "1.3rem" },
              }}
            >
              {product.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              align="left"
              sx={{
                width: "100%",
                fontSize: { xs: "0.8rem", sm: "1rem", md: "1.1rem", lg: "1.2rem" },
              }}
            >
              ${product.price?.[0] || "0.00"}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Pagination Controls */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          sx={{ minWidth: "40px" }}
        >
          <ArrowBackIos />
        </Button>
        <Typography sx={{ alignSelf: "center", mx: 2 }}>
          Page {page} of {pagination?.totalPages || 1}
        </Typography>
        <Button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= (pagination?.totalPages || 1)}
          sx={{ minWidth: "40px" }}
        >
          <ArrowForwardIos />
        </Button>
      </Box>
    </Box>
  );
};

export default Collection;
