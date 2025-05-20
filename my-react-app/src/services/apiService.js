import axiosAPIInstance from "../axiosInstance";

const AUTH_ENDPOINT = {
  LOGIN_API: "auth/login/",
  REGISTER_API: "auth/register/",
  LOGOUT_API: "auth/logout",
  AUTH_USER: "auth/is-auth",
  FORGOT_PASSWORD: "auth/forgot-password",
  SEND_FORGOT_OTP: "auth/send-forgot-password-otp",
  VERIFY_FORGOT_OTP: "auth/verify-forgot-password-otp",
  GET_CART: "cart/get",
  ADD_CART: "cart/add",
  UPDATE_CART: "cart/update",
  GET_USER: "user/data",
  ADD_WISHLIST: "wishlist/add",
  REMOVE_WISHLIST: "wishlist/remove",
  GET_WISHLIST: "wishlist/get",
  LIST_PRODUCT: "product/list",
  DISPLAY_PRODUCT: "product/display",
  PLACE_ORDER: "order/place",
  USER_ORDER: "order/userorders",
  VERIFY_RAZORPAY: "order/verifyRazorpay",
  PLACE_ORDER_RAZORPAY: "order/razorpay",
  FILTER: "product/filter"
}

export const UserLoginAPI = async (payload) => {
  return axiosAPIInstance.post(AUTH_ENDPOINT.LOGIN_API, payload);
};

export const UserRegisterAPI = async (payload) => {
  return axiosAPIInstance.post(AUTH_ENDPOINT.REGISTER_API, payload);
};

export const LogoutAPI = async () => {
  return axiosAPIInstance.post(AUTH_ENDPOINT.LOGOUT_API);
};

export const AuthUserAPI = async () => {
  return axiosAPIInstance.get(AUTH_ENDPOINT.AUTH_USER);
};

export const ForgotPasswordAPI = async (payload) => {
  return axiosAPIInstance.post(AUTH_ENDPOINT.FORGOT_PASSWORD, payload);
};
export const SendForgotPasswordAPI = async (payload) => {
  return axiosAPIInstance.post(AUTH_ENDPOINT.SEND_FORGOT_OTP, payload);
};
export const VerifyForgotPasswordAPI = async (payload) => {
  return axiosAPIInstance.post(AUTH_ENDPOINT.VERIFY_FORGOT_OTP, payload);
};

export const GetUserCartAPI = async () => {
  return axiosAPIInstance.get(AUTH_ENDPOINT.GET_CART);
};

export const AddCartAPI = async (payload) => {
  return axiosAPIInstance.post(AUTH_ENDPOINT.ADD_CART, payload);
};

export const UpdateCartAPI = async (payload) => {
  return axiosAPIInstance.post(AUTH_ENDPOINT.UPDATE_CART, payload);
};

export const GetUserAPI = async (payload) => {
  return axiosAPIInstance.get(AUTH_ENDPOINT.GET_USER, payload);
};

export const AddWishlistPI = async (payload) => {
  return axiosAPIInstance.post(AUTH_ENDPOINT.ADD_WISHLIST, payload);
};

export const RemoveWishlistAPI = async (payload) => {
  return axiosAPIInstance.post(AUTH_ENDPOINT.REMOVE_WISHLIST, payload);
};

export const GetUserWishlistAPI = async (payload) => {
  return axiosAPIInstance.post(AUTH_ENDPOINT.GET_WISHLIST, payload);
};

export const ListProductAPI = async (page = 1, limit = 8) => {
  return axiosAPIInstance.get(AUTH_ENDPOINT.LIST_PRODUCT, {
    params: { page, limit },
  });
};
export const DisplayProductAPI = async () => {
  return axiosAPIInstance.get(AUTH_ENDPOINT.DISPLAY_PRODUCT);
};

export const PlaceOrderAPI = async (payload) => {
  return axiosAPIInstance.post(AUTH_ENDPOINT.PLACE_ORDER, payload);
};
export const UserOrderAPI = async (payload) => {
  return axiosAPIInstance.post(AUTH_ENDPOINT.USER_ORDER, payload);
};
export const VerifyRazorpayAPI = async (payload) => {
  return axiosAPIInstance.post(AUTH_ENDPOINT.VERIFY_RAZORPAY, payload);
};
export const PlaceOrderRazorpayAPI = async (payload) => {
  return axiosAPIInstance.post(AUTH_ENDPOINT.PLACE_ORDER_RAZORPAY, payload);
};

export const FilterAPI = async ({
  category,
  hotsales,
  bestseller,
  newarrival,
  minPrice,
  maxPrice,
  page = 1,
  limit = 8,
  sort = "relevant",
}) => {
  return axiosAPIInstance.get(AUTH_ENDPOINT.FILTER, {
    params: {
      category: Array.isArray(category) ? category.join(",") : category,
      hotsales,
      bestseller,
      newarrival,
      minPrice,
      maxPrice,
      page,
      limit,
      sort,
    },
  });
};


