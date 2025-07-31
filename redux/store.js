import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/AuthSlice';
import commentReducer from './slice/CommentSlice';
import tweetReducer from './slice/TweetSlice'
import userReducer from './slice/UserSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
      comments: commentReducer,
       tweets: tweetReducer,
       users:userReducer
  },
});
