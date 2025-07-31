// redux/slice/commentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const addComment = createAsyncThunk(
  'comments/add',
  async ({ tweetId, content, token }, thunkAPI) => {
    console.log("📤 API İsteği:", { tweetId, content });
    try {
      const res = await axios.post(`${BASE_URL}/comments/${tweetId}`, { content }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("✅ API cevabı:", res.data);
      return res.data.comment;
    } catch (err) {
      console.error("❌ API hatası:", err.response?.data || err.message);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


// ✅ Tüm yorumları getir
export const fetchAllComments = createAsyncThunk(
  'comments/fetchAll',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${BASE_URL}/comments`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ Belirli bir tweet'in yorumlarını getir
export const fetchCommentsByTweet = createAsyncThunk(
  'comments/fetchByTweet',
  async (tweetId, thunkAPI) => {
    try {
      const res = await axios.get(`${BASE_URL}/comments/tweet/${tweetId}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ Yorum sil
export const deleteComment = createAsyncThunk(
  'comments/delete',
  async ({ commentId, token }, thunkAPI) => {
    try {
      await axios.delete(`${BASE_URL}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return commentId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ Bir tweet'e ait yorum sayısı
export const fetchCommentCount = createAsyncThunk(
  'comments/fetchCount',
  async (tweetId, thunkAPI) => {
    try {
      const res = await axios.get(`${BASE_URL}/comments/count/${tweetId}`);
      return { tweetId, count: res.data.commentCount };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    allComments: [],
    tweetComments: {},
    counts: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearCommentErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        const comment = action.payload;
        const tweetId = comment.tweet;
        if (!state.tweetComments[tweetId]) state.tweetComments[tweetId] = [];
        state.tweetComments[tweetId].unshift(comment);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchAllComments.fulfilled, (state, action) => {
        state.allComments = action.payload;
      })

      .addCase(fetchCommentsByTweet.fulfilled, (state, action) => {
        const tweetId = action.payload[0]?.tweet || 'unknown';
        state.tweetComments[tweetId] = action.payload;
      })

      .addCase(deleteComment.fulfilled, (state, action) => {
        const id = action.payload;
        for (const tweetId in state.tweetComments) {
          state.tweetComments[tweetId] = state.tweetComments[tweetId].filter(c => c._id !== id);
        }
      })

      .addCase(fetchCommentCount.fulfilled, (state, action) => {
        const { tweetId, count } = action.payload;
        state.counts[tweetId] = count;
      });
  },
});

export const { clearCommentErrors } = commentSlice.actions;
export default commentSlice.reducer;
