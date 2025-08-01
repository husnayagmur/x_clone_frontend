// redux/slice/profileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// ✅ Kullanıcı profilini getir
export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async (userId, thunkAPI) => {
    try {
      const res = await axios.get(`${BASE_URL}/users/${userId}/profile`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ Takip et
export const followUser = createAsyncThunk(
  'profile/followUser',
  async ({ userId, token }, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/users/${userId}/follow`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return { userId, message: res.data.message };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ Takipten çıkar
export const unfollowUser = createAsyncThunk(
  'profile/unfollowUser',
  async ({ userId, token }, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/users/${userId}/unfollow`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return { userId, message: res.data.message };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ Takipçileri getir
export const fetchFollowers = createAsyncThunk(
  'profile/fetchFollowers',
  async (userId, thunkAPI) => {
    try {
      const res = await axios.get(`${BASE_URL}/users/${userId}/followers`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ Profil güncelle (avatar dahil)
export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async ({ userId, formData, token }, thunkAPI) => {
    try {
      const res = await axios.put(`${BASE_URL}/users/${userId}/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data.user; // Backend'den dönen güncellenmiş kullanıcıyı döndür
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


const profileSlice = createSlice({
  name: 'users',
  initialState: {
    profile: null,
    followers: [],
    tweets: [],
    tweetCount: 0,
    followerCount: 0,
    followingCount: 0,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearProfileState: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.user;
        state.tweets = action.payload.tweets;
        state.tweetCount = action.payload.tweetCount;
        state.followerCount = action.payload.followerCount;
        state.followingCount = action.payload.followingCount;
        state.followers = action.payload.followers;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(followUser.fulfilled, (state, action) => {
        state.followerCount += 1;
        state.successMessage = action.payload.message;
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.followerCount -= 1;
        state.successMessage = action.payload.message;
      })

      .addCase(fetchFollowers.fulfilled, (state, action) => {
        state.followers = action.payload;
      })

       .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload; 
        state.successMessage = 'Profil başarıyla güncellendi';
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.avatar;
      });
  }
});

export const { clearProfileState } = profileSlice.actions;
export default profileSlice.reducer;
