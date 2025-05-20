import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./slices/authSlice"
import cartReducer from "./slices/cartSlice"
import productsReducer from "./slices/productSlice"
import wishlistReducer from './slices/wishlistSlice';
import orderReducer from './slices/orderSlice';
import displayProductsReducer from './slices/displayProductSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productsReducer,
    wishlist: wishlistReducer,
    order: orderReducer,
    DisplayProducts: displayProductsReducer,
  },
});

export default store;