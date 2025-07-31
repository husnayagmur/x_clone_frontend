// redux/slice/tweetSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// ✅ 1. Tweet oluştur
export const createTweet = createAsyncThunk(
  'tweets/createTweet',
  async ({ content, token }, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/tweets`, { content }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data.tweet;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ 2. Tüm tweetleri getir
export const fetchAllTweets = createAsyncThunk(
  'tweets/fetchAllTweets',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${BASE_URL}/tweets`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ 3. Belirli bir kullanıcının tweetlerini getir
export const fetchUserTweets = createAsyncThunk(
  'tweets/fetchUserTweets',
  async (userId, thunkAPI) => {
    try {
      const res = await axios.get(`${BASE_URL}/tweets/user/${userId}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ 4. Tweet beğeni toggle
export const toggleLike = createAsyncThunk(
  'tweets/toggleLike',
  async ({ tweetId, token }, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/tweets/${tweetId}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return { tweetId, message: res.data.message };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ 5. Retweet toggle
export const toggleRetweet = createAsyncThunk(
  'tweets/toggleRetweet',
  async ({ tweetId, token }, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/tweets/${tweetId}/retweet`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return { tweetId, message: res.data.message };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ 6. Beğeni sayısı
export const fetchLikeCount = createAsyncThunk(
  'tweets/fetchLikeCount',
  async (tweetId, thunkAPI) => {
    try {
      const res = await axios.get(`${BASE_URL}/tweets/${tweetId}/like-count`);
      return { tweetId, count: res.data.likeCount };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ 7. Retweet bilgisi
export const fetchRetweetInfo = createAsyncThunk(
  'tweets/fetchRetweetInfo',
  async (tweetId, thunkAPI) => {
    try {
      const res = await axios.get(`${BASE_URL}/tweets/${tweetId}/retweet-count`);
      return { tweetId, ...res.data };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const tweetSlice = createSlice({
  name: 'tweets',
  initialState: {
    tweets: [],
    userTweets: [],
    likeCounts: {},
    retweetInfo: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearTweetState: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Tweet oluştur
      .addCase(createTweet.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTweet.fulfilled, (state, action) => {
        state.loading = false;
        state.tweets.unshift(action.payload);
      })
      .addCase(createTweet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Tüm tweetleri getir
      .addCase(fetchAllTweets.fulfilled, (state, action) => {
        state.tweets = action.payload;
      })

      // ✅ Kullanıcı tweetlerini getir
      .addCase(fetchUserTweets.fulfilled, (state, action) => {
        state.userTweets = action.payload;
      })

      // ✅ Like işlemi
      .addCase(toggleLike.fulfilled, (state, action) => {
        const { tweetId, message } = action.payload;
        const tweet = state.tweets.find(t => t._id === tweetId);
        if (tweet) {
          if (message === 'Beğenildi') {
            tweet.likes.push('you'); // frontend'te senin userId’nle değiştir
          } else {
            tweet.likes = tweet.likes.filter(id => id !== 'you');
          }
        }
      })

      // ✅ Retweet işlemi
      .addCase(toggleRetweet.fulfilled, (state, action) => {
        const { tweetId, message } = action.payload;
        const tweet = state.tweets.find(t => t._id === tweetId);
        if (tweet) {
          if (message === 'Retweet yapıldı') {
            tweet.retweets.push('you');
          } else {
            tweet.retweets = tweet.retweets.filter(id => id !== 'you');
          }
        }
      })

      // ✅ Like count
      .addCase(fetchLikeCount.fulfilled, (state, action) => {
        const { tweetId, count } = action.payload;
        state.likeCounts[tweetId] = count;
      })

      // ✅ Retweet info
      .addCase(fetchRetweetInfo.fulfilled, (state, action) => {
        const { tweetId, retweetCount, retweetedUsers } = action.payload;
        state.retweetInfo[tweetId] = {
          count: retweetCount,
          users: retweetedUsers,
        };
      });
  }
});

export const { clearTweetState } = tweetSlice.actions;
export default tweetSlice.reducer;
