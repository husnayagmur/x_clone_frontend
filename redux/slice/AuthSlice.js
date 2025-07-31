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
      localStorage.setItem('token', res.data.token);  // Token'ı localStorage'a kaydediyoruz
      return res.data;  // Kullanıcı verilerini geri döndürüyoruz
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
  token: null,
  loading: false,
  error: null,
  message: null,
};

// Token'ı client-side'da almak için useEffect ile çağırma yapılacak
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      if (typeof window !== 'undefined') { // client-side'da olduğumuzu kontrol edelim
        localStorage.removeItem('token');  // Token'ı localStorage'dan siliyoruz
      }
      state.user = null;
      state.token = null;  // Token'ı Redux'tan da siliyoruz
    },
    clearMessages: (state) => {
      state.message = null;
      state.error = null;
    },
    setToken: (state, action) => {
      state.token = action.payload; // Token'ı Redux'a kaydediyoruz
    }
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
        state.user = action.payload.user;
        state.token = action.payload.token;  // Token'ı burada Redux'a kaydediyoruz
        if (typeof window !== 'undefined') { // client-side kontrolü
          localStorage.setItem('token', action.payload.token);  // Token'ı localStorage'da tutuyoruz
        }
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

export const { logoutUser, clearMessages, setToken } = authSlice.actions;
export default authSlice.reducer;
