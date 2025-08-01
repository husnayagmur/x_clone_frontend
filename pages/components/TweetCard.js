'use client';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaRegComment, FaRetweet, FaHeart } from 'react-icons/fa';
import {
  toggleLike,
  toggleRetweet,
  fetchLikeCount,
  fetchRetweetInfo,
} from '@/redux/slice/TweetSlice';
import ReplyModal from './ReplyModal';
import Image from 'next/image';

const TweetCard = ({
  tweetId,
  name,
  username,
  date,
  text,
  likes = [],
  retweets = [],
  views = 0,
  avatar,
  commentCount = 0,
}) => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  const likeCount = useSelector((state) => state.tweets.likeCounts[tweetId] || likes.length);
  const retweetInfo = useSelector(
    (state) => state.tweets.retweetInfo[tweetId] || { count: retweets.length }
  );
 const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // avatar ve coverPhoto URL'lerini oluşturuyoruz
  const avatarUrl =
    user?.avatar?.startsWith("/")
      ? `${BASE_URL}${user.avatar}`
      : user?.avatar || "/profile.jpg";

  const [showModal, setShowModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(false);

  useEffect(() => {
    if (user?._id) {
      // User'ın beğendiği tweet'leri kontrol et
      setIsLiked(likes.includes(user._id));
      // User'ın retweet yaptığı tweet'leri kontrol et
      setIsRetweeted(retweets.includes(user._id));
    }
    // Veritabanındaki beğeni ve retweet sayısını al
    dispatch(fetchLikeCount(tweetId));
    dispatch(fetchRetweetInfo(tweetId));
  }, [user, tweetId, dispatch, likes, retweets]);

  // Like işlemi
  const handleLike = () => {
    if (!token) return;
    setIsLiked((prev) => !prev);
    dispatch(toggleLike({ tweetId, token }));
  };

  // Retweet işlemi
  const handleRetweet = () => {
    if (!token) return;
    setIsRetweeted((prev) => !prev);
    dispatch(toggleRetweet({ tweetId, token }));
  };

  return (
    <>
      <div className="p-4 border-b border-gray-800 hover:bg-[#16181c] transition">
        <div className="flex gap-3">
          {/* Avatar */}
          <div className='w-12 h-12'>
           <Image
                    src={avatarUrl} 
                    alt="Profil"
                    width={64}
                    height={64}
                    className="object-cover w-full h-full rounded-full"
                  />
                 </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center text-sm text-gray-400">
              <span>
                <span className="text-white font-semibold">{name}</span> @{username} · {date}
              </span>
              <span>···</span>
            </div>

            <div className="text-white mt-1">
              <p className="whitespace-pre-wrap break-words">{text}</p>
            </div>

            <div className="flex gap-6 mt-2 text-sm">
              {/* Yorum butonu */}
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition"
              >
                <FaRegComment />
                {commentCount}
              </button>

              {/* Retweet */}
              <button
                onClick={handleRetweet}
                className={`flex items-center gap-1 transition ${
                  isRetweeted ? 'text-green-500' : 'text-gray-500'
                } hover:text-green-500`}
              >
                <FaRetweet />
                {retweetInfo.count}
              </button>

              {/* Like */}
              <button
                onClick={handleLike}
                className={`flex items-center gap-1 transition ${
                  isLiked ? 'text-pink-500' : 'text-gray-500'
                } hover:text-pink-500`}
              >
                <FaHeart />
                {likeCount}
              </button>

              <span className="text-gray-500">{views} görüntülenme</span>
            </div>
          </div>
        </div>
      </div>

      {showModal && <ReplyModal onClose={() => setShowModal(false)} tweetId={tweetId} />}
    </>
  );
};

export default TweetCard;
