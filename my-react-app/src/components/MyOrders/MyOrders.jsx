import {
  Box,
  Typography,
  Divider,
  Paper,
  Button,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userOrder } from "../../redux/slices/orderSlice";
import { toast } from "react-toastify";

const MyOrders = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const currency = "₹";

  const { userOrderData, loading, error } = useSelector((state) => state.order);

  const [showAll, setShowAll] = useState(false);
  const visibleCount = showAll ? Infinity : 2;

  const orderData = useMemo(() => {
    if (!userOrderData?.orders) return [];
    return userOrderData.orders
      .flatMap((order) =>
        order.items.map((item) => ({
          ...item,
          status: order.status,
          payment: order.payment,
          paymentMethod: order.paymentMethod,
          date: order.date,
          finalAmount: order.amount,
        }))
      )
      .reverse();
  }, [userOrderData]);

  useEffect(() => {
    if (token) {
      dispatch(userOrder({ token }));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(typeof error === "string" ? error : "Something went wrong.");
    }
  }, [error]);

  const visibleOrders = orderData.slice(0, visibleCount);

  return (
    <>
      <Typography variant="h5" textAlign="center" mb={2} mt={10}>
        MY ORDERS
      </Typography>

      <Box width="100%">
        <Divider sx={{ mb: 4 }} />

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : orderData.length === 0 ? (
          <Typography>No orders found.</Typography>
        ) : (
          <>
            {visibleOrders.map((item, index) => (
              <Paper
                key={index}
                elevation={2}
                sx={{
                  p: 2,
                  mb: 3,
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                {/* Left section */}
                <Box display="flex" gap={2} flexDirection={{ xs: "column", sm: "row" }} width={{ md: "60%" }}>
                  <Avatar
                    variant="rounded"
                    src={item.image?.[0]}
                    alt={item.name}
                    sx={{ width: 80, height: 80 }}
                  />
                  <Box>
                    <Typography fontWeight="600">{item.name}</Typography>
                    <Box display="flex" gap={2} flexWrap="wrap" mt={1}>
                      <Typography>Price: {currency}{item.price}</Typography>
                      <Typography>Qty: {item.quantity}</Typography>
                    </Box>
                    <Typography variant="body2" mt={1} color="text.secondary">
                      Date:{" "}
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }).format(new Date(item.date))}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Payment: {item.paymentMethod}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Amount: {currency}{item.finalAmount} Including all Charges
                    </Typography>
                  </Box>
                </Box>

                {/* Right section */}
                <Box
                  display="flex"
                  flexDirection={{ xs: "column", sm: "row" }}
                  alignItems="center"
                  gap={2}
                  mt={{ xs: 2, md: 0 }}
                  justifyContent="flex-end"
                  width={{ md: "40%" }}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor: "green",
                      }}
                    />
                    <Typography variant="body2">{item.status}</Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => dispatch(userOrder({ token }))}
                  >
                    Track Order
                  </Button>
                </Box>
              </Paper>
            ))}

            {/* Show More / Show Less Button */}
            {orderData.length > 2 && (
              <Button
                variant="text"
                onClick={() => setShowAll(!showAll)}
                sx={{
                  display: "block",
                  mx: "auto",
                  mt: 2,
                  color: "blue",
                  textTransform: "none",
                }}
              >
                {showAll ? "Show Less" : "Show More"}
              </Button>
            )}

          </>
        )}
      </Box>
    </>
  );
};

export default MyOrders;
