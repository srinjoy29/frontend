import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  loginUser,
  createUser,
  signOut,
  checkAuth,
  resetPasswordRequest,
  resetPassword,
} from './authAPI';

const initialState = {
  loggedInUserToken: null, // this should only contain user identity => 'id'/'role'
  status: 'idle',
  error: null,
  userChecked: false,
  mailSent: false,
  passwordReset: false,
};

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk(
  'user/loginUser',
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginInfo);
      return response.data;
    } catch (error) {
      console.error('Login Error:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const checkAuthAsync = createAsyncThunk('user/checkAuth', async () => {
  try {
    const response = await checkAuth();
    return response.data;
  } catch (error) {
    console.error('Auth Check Error:', error);
  }
});

export const resetPasswordRequestAsync = createAsyncThunk(
  'user/resetPasswordRequest',
  async (email, { rejectWithValue }) => {
    try {
      const response = await resetPasswordRequest(email);
      return response.data;
    } catch (error) {
      console.error('Reset Password Request Error:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const resetPasswordAsync = createAsyncThunk(
  'user/resetPassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await resetPassword(data); // Ensure this function sends correct data
      if (response.status !== 200) {
        throw new Error(response.message || 'Password reset failed');
      }
      return response.data; // Expected successful response structure
    } catch (error) {
      console.error('Reset Password Error:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const signOutAsync = createAsyncThunk('user/signOut', async () => {
  const response = await signOut();
  return response.data;
});

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
        state.error = null;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state) => {
        state.status = 'idle';
        state.loggedInUserToken = null;
        state.error = null;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
        state.userChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state) => {
        state.status = 'idle';
        state.userChecked = true;
      })
      .addCase(resetPasswordRequestAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetPasswordRequestAsync.fulfilled, (state) => {
        state.status = 'idle';
        state.mailSent = true;
        state.error = null;
      })
      .addCase(resetPasswordRequestAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.mailSent = false;
        state.error = action.payload;
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear any previous errors
      })
      .addCase(resetPasswordAsync.fulfilled, (state) => {
        state.status = 'idle';
        state.passwordReset = true; // Password reset successful
        state.error = null;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.passwordReset = false;
        state.error = action.payload; // Capture the error message
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state) => state.auth.userChecked;
export const selectMailSent = (state) => state.auth.mailSent;
export const selectPasswordReset = (state) => state.auth.passwordReset;

export default authSlice.reducer;
