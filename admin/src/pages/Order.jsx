import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Button,
  Paper
} from '@mui/material';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [paymentFilter, setPaymentFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('Newest');
  const [selectedDate, setSelectedDate] = useState('');

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(`${backendUrl}/api/order/list`, {}, { headers: { token } });
      if (response.data.success) {
        const sortedOrders = response.data.orders.reverse();
        setOrders(sortedOrders);
        setFilteredOrders(sortedOrders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success('Order status updated successfully');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  const paymentHandler = async (orderId, paymentStatus) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/payment-status`,
        { orderId, payment: paymentStatus },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success(`Payment status updated to ${paymentStatus ? 'Paid' : 'Unpaid'}`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  const handlePaymentFilterChange = (event) => {
    setPaymentFilter(event.target.value);
    applyFilters(event.target.value, dateFilter, selectedDate);
  };

  const handleDateFilterChange = (event) => {
    setDateFilter(event.target.value);
    applyFilters(paymentFilter, event.target.value, selectedDate);
  };

  const handleDateSelection = (event) => {
    const inputDate = event.target.value;
    setSelectedDate(inputDate);
    applyFilters(paymentFilter, dateFilter, inputDate);
  };

  const applyFilters = (payment, date, selectedDate) => {
    let filtered = [...orders];

    if (payment !== 'All') {
      filtered = filtered.filter(order => order.paymentMethod === payment);
    }

    if (date === 'Oldest') {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    if (selectedDate) {
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.date).toISOString().split('T')[0];
        return orderDate === selectedDate;
      });
    }

    setFilteredOrders(filtered);
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <Box p={4}>
      {/* Header and filters */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        flexWrap="wrap"
        gap={2}
      >
        <Typography variant="h4" fontWeight="bold">Orders</Typography>
        <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
          <FormControl size="small">
            <InputLabel>Payment</InputLabel>
            <Select
              value={paymentFilter}
              onChange={handlePaymentFilterChange}
              label="Payment"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="COD">COD</MenuItem>
              <MenuItem value="Razorpay">Razorpay</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={dateFilter}
              onChange={handleDateFilterChange}
              label="Sort By"
            >
              <MenuItem value="Newest">Newest</MenuItem>
              <MenuItem value="Oldest">Oldest</MenuItem>
            </Select>
          </FormControl>
          <TextField
            size="small"
            type="date"
            label="Select Date"
            InputLabelProps={{ shrink: true }}
            value={selectedDate}
            onChange={handleDateSelection}
          />
        </Box>
      </Box>

      {/* Orders list */}
      <Box display="flex" flexDirection="column" gap={3}>
        {filteredOrders.map((order, index) => (
          <Paper key={index} elevation={2} sx={{ p: 3 }}>
            <Box display="flex" flexWrap="wrap" gap={2} alignItems="flex-start">
              <Box>
                <img src={assets.parcel_icon} alt="Order Icon" width={50} />
              </Box>

              <Box flex="1 1 300px" minWidth={250}>
                <Typography fontWeight="bold">Order Details</Typography>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {order.items.map((item, i) => (
                    <li key={i}>
                      {item.name} x {item.quantity} {item.size && `(${item.size})`}
                    </li>
                  ))}
                </ul>
                <Typography mt={1}>
                  {order.address.firstName} {order.address.lastName}
                </Typography>
                <Typography variant="body2">
                  {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                </Typography>
                <Typography variant="body2">Phone: {order.address.phone}</Typography>
              </Box>

              <Box flex="0 0 150px" minWidth={150}>
                <Typography variant="body2">Items: {order.items.length}</Typography>
                <Typography variant="body2" mt={1}>Method: {order.paymentMethod}</Typography>
                <Typography variant="body2" color={order.payment ? 'green' : 'red'}>
                  Payment: {order.payment ? 'Done' : 'Pending'}
                </Typography>
                <Typography variant="body2">Date: {new Date(order.date).toLocaleDateString()}</Typography>
              </Box>

              <Box flex="0 0 150px" minWidth={150}>
                <Typography variant="h6">
                 Price: {currency}
                 {order.amount}
                </Typography>
              </Box>

              <Box flex="0 0 200px" minWidth={200}>
                <FormControl fullWidth size="small">
                  <Select value={order.status} onChange={(e) => statusHandler(e, order._id)}>
                    <MenuItem value="Order Placed">Order Placed</MenuItem>
                    <MenuItem value="Packing">Packing</MenuItem>
                    <MenuItem value="Shipped">Shipped</MenuItem>
                    <MenuItem value="Out for delivery">Out for delivery</MenuItem>
                    <MenuItem value="Delivered">Delivered</MenuItem>
                  </Select>
                </FormControl>

                {order.paymentMethod === 'COD' && (
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 , backgroundColor: "#447111",
                  "&:hover": {
                    backgroundColor: "#6B9F3C",
                  }, }}
                    color={order.payment ? 'error' : 'primary'}
                    onClick={() => paymentHandler(order._id, !order.payment)}
                  >
                    {order.payment ? 'Mark as Unpaid' : 'Mark as Paid'}
                  </Button>
                )}
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

Orders.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Orders;
