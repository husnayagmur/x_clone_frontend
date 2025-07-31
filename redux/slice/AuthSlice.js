// redux/slice/AuthSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

// ✅ Kayıt
export const registerUser = createAsyncThunk(
  'auth/register',
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/register`, formData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Kayıt başarısız');
    }
  }
);

// ✅ Giriş
export const loginUser = createAsyncThunk(
  'auth/login',
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/login`, formData);
      localStorage.setItem('token', res.data.token);
      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Giriş başarısız');
    }
  }
);

// ✅ Şifremi Unuttum
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/forgot-password`, { email });
      return res.data.message;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Kod gönderilemedi');
    }
  }
);

// ✅ Kod ile Şifre Sıfırlama
export const resetPasswordWithCode = createAsyncThunk(
  'auth/resetPasswordWithCode',
  async ({ email, code, newPassword }, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/reset-password-with-code`, {
        email,
        code,
        newPassword,
      });
      return res.data.message;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Şifre sıfırlanamadı');
    }
  }
);

// ✅ Şifre Değiştir
export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async ({ userId, oldPassword, newPassword }, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/change-password`, {
        userId,
        oldPassword,
        newPassword,
      });
      return res.data.message;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Şifre değiştirilemedi');
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
  message: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem('token');
      state.user = null;
    },
    clearMessages: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // forgot password
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.message = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.error = action.payload;
      })

      // reset password
      .addCase(resetPasswordWithCode.fulfilled, (state, action) => {
        state.message = action.payload;
      })
      .addCase(resetPasswordWithCode.rejected, (state, action) => {
        state.error = action.payload;
      })

      // change password
      .addCase(changePassword.fulfilled, (state, action) => {
        state.message = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logoutUser, clearMessages } = authSlice.actions;
export default authSlice.reducer;
