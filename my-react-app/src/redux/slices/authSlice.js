import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
    UserLoginAPI, 
    UserRegisterAPI, 
    LogoutAPI, 
    ForgotPasswordAPI,
    SendForgotPasswordAPI,
    VerifyForgotPasswordAPI,
    AuthUserAPI 
} from "../../services/apiService";


export const loginUser = createAsyncThunk(
    'auth/login',
    async (payload, { rejectWithValue }) => {
      try {
        const response = await UserLoginAPI(payload);
  
        if (!response.data.success) {
          return rejectWithValue(response.data.message);
        }
  
        const { token } = response.data;
        localStorage.setItem('token', token);
  
        const authResponse = await AuthUserAPI();
        if (!authResponse.data.success) {
          return rejectWithValue('User authentication failed.');
        }
  
        return response.data; 
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  );


  export const registerUser = createAsyncThunk('auth/register', async (payload, { rejectWithValue }) => {
    try {

      const response = await UserRegisterAPI(payload);
  
      if (!response.data.success) {
        return rejectWithValue(response.data.message);
      }
  
      const { token } = response.data;
      localStorage.setItem('token', token);
  
      const authResponse = await AuthUserAPI();
      if (!authResponse.data.success) {
        return rejectWithValue('User authentication failed.');
      }
  
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  });
  

export const forgotPassword = createAsyncThunk('auth/forgot-password', async (payload, { rejectWithValue }) => {
    try {
        const response = await ForgotPasswordAPI(payload); 
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message); 
    }
});

export const sendForgotPasswordOTP = createAsyncThunk('auth/send-forgot-password-otp', async (payload, { rejectWithValue }) => {
    try {
        const response = await SendForgotPasswordAPI(payload); 
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const verifyForgotPasswordOTP = createAsyncThunk('auth/verify-forgot-password-otp', async (payload, { rejectWithValue }) => {
    try {
        const response = await VerifyForgotPasswordAPI(payload); 
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        const response = await LogoutAPI();
        return response.data; 
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
            
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(sendForgotPasswordOTP.pending, (state) => {
                state.loading = true;
            })
            .addCase(sendForgotPasswordOTP.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(sendForgotPasswordOTP.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(verifyForgotPasswordOTP.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyForgotPasswordOTP.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(verifyForgotPasswordOTP.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
