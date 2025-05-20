import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';

import {
  getCartAmount,
  getFinalCartAmount,
  setDeliveryType
} from '../../redux/slices/cartSlice';

const CartTotal = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const deliveryType = useSelector((state) => state.cart.deliveryType);
  const deliveryFees = useSelector((state) => state.cart.deliveryFees);
  const baseAmount = useSelector(getCartAmount);
  const finalTotal = useSelector(getFinalCartAmount);
  const currency = '$';

  const itemCount = Object.values(cartItems).reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const handleDeliveryChange = (e) => {
    dispatch(setDeliveryType(e.target.value));
  };

  return (
    <Box
      sx={{
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: {
          xs: 'auto',        
        },
        backgroundColor: 'white',
        padding: 3
      }}
    >

      <Typography color="text.secondary" variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
        Order Summary
      </Typography>

      <Box display="flex" justifyContent="space-between">
        <Typography>Items ({itemCount})</Typography>
        <Typography>{currency}{baseAmount.toFixed(2)}</Typography>
      </Box>

      <Divider sx={{ mb: 2, mt: 2 }} />

      <Box>
        <Typography variant="body2" sx={{ mb: 3 }}>
          SHIPPING
        </Typography>
        <FormControl fullWidth>
          <InputLabel>Delivery Type</InputLabel>
          <Select
            value={deliveryType}
            label="Delivery Type"
            onChange={handleDeliveryChange}
          >
            {Object.entries(deliveryFees).map(([key, fee]) => (
              <MenuItem key={key} value={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)} Delivery ({currency}{fee.toFixed(2)})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Divider sx={{ mb: 2, mt: 2 }} />

      <Box display="flex" justifyContent="space-between">
        <Typography fontWeight="bold">Total</Typography>
        <Typography fontWeight="bold">{currency}{finalTotal.toFixed(2)}</Typography>
      </Box>
    </Box>
  );
};

export default CartTotal;
