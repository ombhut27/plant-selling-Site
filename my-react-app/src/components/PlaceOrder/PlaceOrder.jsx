import { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CartTotal from '../../components/Cart/CartTotal';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  placeOrder,
  placeOrderRazorpay,
  verifyRazorpay
} from '../../redux/slices/orderSlice';
import { getFinalCartAmount, clearCart } from '../../redux/slices/cartSlice';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const products = useSelector((state) => state.products.products);
  const finalAmount = useSelector(getFinalCartAmount);
  const deliveryType = useSelector((state) => state.cart.deliveryType);

  const [method, setMethod] = useState('cod');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let orderItems = [];

      for (const productId in cartItems) {
        const quantity = cartItems[productId]?.quantity;
        if (quantity > 0) {
          const itemInfo = structuredClone(products.find(p => p._id === productId));
          if (itemInfo) {
            itemInfo.quantity = quantity;
            orderItems.push(itemInfo);
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: finalAmount,
        delivery: { type: deliveryType },
      };

      if (method === 'cod') {
        const res = await dispatch(placeOrder(orderData));
        if (res.payload.success) {
          dispatch(clearCart());
          navigate('/my-orders');
        } else {
          toast.error(res.payload.message || "Order failed");
        }
      } else if (method === 'razorpay') {
        const res = await dispatch(placeOrderRazorpay(orderData));
        if (res.payload.success) {
          initPay(res.payload.order);
        } else {
          toast.error(res.payload.message || "Payment init failed");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Order processing failed.");
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      handler: async (response) => {
        const res = await dispatch(verifyRazorpay(response));
        if (res.payload.success) {
          dispatch(clearCart());
          navigate('/my-orders');
        } else {
          toast.error("Payment verification failed");
        }
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={onSubmitHandler}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          gap: 4,
          minHeight: '80vh',
          mx: { xs: 2, sm: 10 },
          mt: 15,
        }}
      >
        {/* Left Side: Delivery Info */}
        <Box sx={{ flex: 1, maxWidth: '600px' }}>
          <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Delivery Information
          </Typography>

          {/* First Name & Last Name */}
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              required
              id="firstName"
              name="firstName"
              label="First Name"
              variant="outlined"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              variant="outlined"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </Box>

          {/* Email */}
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              required
              id="email"
              name="email"
              label="Email Address"
              type="email"
              variant="outlined"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Box>

          {/* Phone */}
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              required
              id="phone"
              name="phone"
              label="Phone"
              type="number"
              variant="outlined"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </Box>

          {/* Street */}
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              required
              id="street"
              name="street"
              label="Street"
              variant="outlined"
              value={formData.street}
              onChange={handleInputChange}
            />
          </Box>

          {/* City & State */}
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              required
              id="city"
              name="city"
              label="City"
              variant="outlined"
              value={formData.city}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              required
              id="state"
              name="state"
              label="State"
              variant="outlined"
              value={formData.state}
              onChange={handleInputChange}
            />
          </Box>

          {/* Country & Zipcode */}
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              required
              id="country"
              name="country"
              label="Country"
              variant="outlined"
              value={formData.country}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              required
              id="zipcode"
              name="zipcode"
              label="Zipcode"
              type="number"
              variant="outlined"
              value={formData.zipcode}
              onChange={handleInputChange}
            />
          </Box>
        </Box>

        <Divider sx={{ display: { xs: 'block', md: 'none' }, my: 3 }} />
        <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />

        {/* Right Side: Cart Total and Payment */}
        <Box sx={{ width: { xs: '100%', md: '35%' } }}>
          <Box sx={{ mb: 4 }}>
            <CartTotal />
          </Box>

          <FormControl component="fieldset" sx={{ mb: 6 }}>
            <FormLabel component="legend">PAYMENT METHOD</FormLabel>
            <RadioGroup
              row
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              sx={{ flexDirection: { xs: 'column', lg: 'row' }, gap: 2, mt: 2 }}
            >
              <FormControlLabel
                value="razorpay"
                control={<Radio sx={{ color: '#447111', '&.Mui-checked': { color: '#447111' } }} />}
                label={<Box display="flex" alignItems="center"><img src="/razorpay_logo.png" alt="Razorpay" height={20} /></Box>}
              />
              <FormControlLabel
                value="cod"
                control={<Radio sx={{ color: '#447111', '&.Mui-checked': { color: '#447111' } }} />}
                label="Cash on Delivery"
              />
            </RadioGroup>
          </FormControl>

          <Box textAlign="right">
            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{
                backgroundColor: '#447111',
                color: 'white',
                fontWeight: 'bold',
                py: 1.5,
                fontSize: { xs: '0.9rem', sm: '1rem' },
                '&:hover': {
                  backgroundColor: '#6B9F3C',
                },
              }}
            >
              PLACE ORDER
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Back Button */}
      <Box sx={{
        display: 'flex', alignItems: 'center', ml: { md: 9, xs: 0, sm: 0 },
        mt: { xs: 3, sm: 3, md: 0 },
      }}>
        <Button
          startIcon={<ArrowBackIcon />}
          sx={{
            textTransform: 'none',
            color: '#7b61ff',
            fontWeight: 'bold',
          }}
          onClick={() => navigate('/cart')}
        >
          Back
        </Button>
      </Box>
    </>
  );
};

export default PlaceOrder;
