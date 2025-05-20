import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Skeleton,
  TextField,
  MenuItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchFilteredProducts,
  setCurrentPage,
  setSort,
} from "../../redux/slices/productSlice";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "../../redux/slices/wishlistSlice";
import { addToCart, removeFromCart } from "../../redux/slices/cartSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InfoIcon from "@mui/icons-material/Info";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";

const categoriesList = ["Indoor", "Outdoor", "Bonsai", "Hanging"];
const flagOptions = ["hotsales", "bestseller", "newarrival"];
const sortOptions = [
  { value: "relevant", label: "Relevant" },
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "price-asc", label: "Price (Low to High)" },
  { value: "price-desc", label: "Price (High to Low)" },
];

const ProductCard = () => {
  const dispatch = useDispatch();
  const { products, status, error, pagination, sort } = useSelector(
    (state) => state.products
  );
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const token = useSelector((state) => state.auth.token);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedFlags, setSelectedFlags] = useState({
    hotsales: false,
    bestseller: false,
    newarrival: false,
  });
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [expandedPanels, setExpandedPanels] = useState([]);

  const handleAccordionToggle = (panel) => {
    setExpandedPanels((prev) =>
      prev.includes(panel)
        ? prev.filter((p) => p !== panel)
        : [...prev, panel]
    );
  };

  const baseHeight = 190;
  const perPanelHeight = 150;
  const dynamicHeight = baseHeight + expandedPanels.length * perPanelHeight;
  const sidebarHeight = Math.min(Math.max(dynamicHeight, 190), 660);

  const currentPage = pagination?.currentPage || 1;
  const totalPages = pagination?.totalPages || 1;

  useEffect(() => {
    const hasFlags = Object.values(selectedFlags).includes(true);
    const hasCategories = selectedCategories.length > 0;
    const hasPrice = minPrice || maxPrice;

    if (hasFlags || hasCategories || hasPrice || sort !== "relevant") {
      dispatch(
        fetchFilteredProducts({
          category: hasCategories ? selectedCategories : undefined,
          hotsales: selectedFlags.hotsales,
          bestseller: selectedFlags.bestseller,
          newarrival: selectedFlags.newarrival,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
          page: currentPage,
          limit: 10,
          sort,
        })
      );
    } else {
      dispatch(fetchProducts({ page: currentPage, limit: 8 }));
    }
  }, [
    dispatch,
    currentPage,
    selectedCategories,
    selectedFlags,
    minPrice,
    maxPrice,
    sort,
  ]);

  const handleCategoryCheckboxChange = (event) => {
    const { value, checked } = event.target;
    const updatedCategories = checked
      ? [...selectedCategories, value]
      : selectedCategories.filter((cat) => cat !== value);
    setSelectedCategories(updatedCategories);
    dispatch(setCurrentPage(1));
  };

  const handleFlagCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedFlags((prevFlags) => ({
      ...prevFlags,
      [name]: checked,
    }));
    dispatch(setCurrentPage(1));
  };

  const handlePriceChange = (type, value) => {
    if (type === "min") setMinPrice(value);
    if (type === "max") setMaxPrice(value);
    dispatch(setCurrentPage(1));
  };

  const handleSortChange = (event) => {
    dispatch(setSort(event.target.value));
    dispatch(setCurrentPage(1));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(setCurrentPage(newPage));
    }
  };

  if (status === "failed") {
    return (
      <Typography variant="h6" color="error">
        Error: {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "flex", gap: 4, px: 2 }}>
      {/* Sidebar Filters in One Gray Box */}
      <Box
        sx={{
          width: 300,
          height: sidebarHeight,
          overflowY: "auto",
          flexShrink: 0,
          backgroundColor: "#f0f0f0",
          borderRadius: 2,
          p: 2,
          transition: "height 0.3s ease",
        }}
      >
        {/* Category Filter */}
        <Accordion
          expanded={expandedPanels.includes("category")}
          onChange={() => handleAccordionToggle("category")}
          disableGutters
          elevation={0}
          square
          sx={{
            backgroundColor: "transparent",
            borderBottom: "1px solid #ccc",
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: "normal" }}>
              Filter by Category
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {categoriesList.map((cat) => (
                <FormControlLabel
                  key={cat}
                  control={
                    <Checkbox
                      checked={selectedCategories.includes(cat)}
                      onChange={handleCategoryCheckboxChange}
                      value={cat}
                    />
                  }
                  label={cat}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        {/* Flag Filter */}
        <Accordion
          expanded={expandedPanels.includes("flag")}
          onChange={() => handleAccordionToggle("flag")}
          disableGutters
          elevation={0}
          square
          sx={{
            backgroundColor: "transparent",
            borderBottom: "1px solid #ccc",
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: "normal" }}>
              Filter by Flag
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {flagOptions.map((flag) => (
                <FormControlLabel
                  key={flag}
                  control={
                    <Checkbox
                      checked={selectedFlags[flag]}
                      onChange={handleFlagCheckboxChange}
                      name={flag}
                    />
                  }
                  label={flag.charAt(0).toUpperCase() + flag.slice(1)}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        {/* Price Filter */}
        <Accordion
          expanded={expandedPanels.includes("price")}
          onChange={() => handleAccordionToggle("price")}
          disableGutters
          elevation={0}
          square
          sx={{
            backgroundColor: "transparent",
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: "normal" }}>
              Filter by Price
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                name="minPrice"
                id="min-price"
                label="$ Min Price"
                type="number"
                value={minPrice}
                onChange={(e) => handlePriceChange("min", e.target.value)}
                size="small"
              />
              <TextField
                name="maxPrice"
                id="max-price"
                label="$ Max Price"
                type="number"
                value={maxPrice}
                onChange={(e) => handlePriceChange("max", e.target.value)}
                size="small"
              />
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2, mr: 6 }}>
          <TextField
            id="sort-by"
            name="sort"
            label="Sort by"
            select
            size="small"
            value={sort}
            onChange={handleSortChange}
            sx={{ width: 200 }}
          >
            {sortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={2} // spacing={2} equivalent for Box
        >
          {status === "loading"
            ? Array.from(new Array(10)).map((_, index) => (
              <Box key={index} sx={{ width: 250 }}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                >
                  <Skeleton variant="rectangular" width={250} height={250} />
                  <Skeleton variant="text" width={200} sx={{ mt: 1 }} />
                  <Skeleton variant="text" width={100} />
                </Box>
              </Box>
            ))
            : products.length === 0 ? (
              <Box sx={{ width: "100%" }}>
                <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                  No products found for selected filters.
                </Typography>
              </Box>
            ) : (
              products.map((product) => (
                <Box key={product._id} sx={{ width: 250 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: 250,
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
                          src={product.image?.[0] || "default_image_url"}
                          alt={product.name}
                          height="250"
                          width="250"
                          style={{ display: "block", width: "100%", height: "auto" }}
                        />
                      </Link>

                      <Box
                        className="icon-container"
                        sx={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          display: "flex",
                          flexDirection: "column",
                          gap: 1, // 8px gap
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
                            fontSize: "23px",
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
                              "&:hover": { color: "#3b82f6" },
                            }}
                          />
                        </Link>
                      </Box>
                    </Box>

                    <Typography
                      variant="subtitle1"
                      align="left"
                      sx={{ mt: 2, width: "100%" }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      align="left"
                      sx={{ width: "100%" }}
                    >
                      ${product.price?.[0] || "0.00"}
                    </Typography>
                  </Box>
                </Box>
              ))
            )}
        </Box>


        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            sx={{ minWidth: "40px" }}
          >
            <ArrowBackIos />
          </Button>
          <Typography sx={{ alignSelf: "center", mx: 2 }}>
            Page {currentPage} of {totalPages}
          </Typography>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            sx={{ minWidth: "40px" }}
          >
            <ArrowForwardIos />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;



