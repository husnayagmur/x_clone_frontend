// components/TweetCardHome.tsx
import React, { useState, useEffect } from 'react';
import { FaRegComment, FaRetweet, FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLike, toggleRetweet, fetchLikeCount, fetchRetweetInfo } from '@/redux/slice/TweetSlice';
import Image from 'next/image';
import ReplyModal from './ReplyModal';

const TweetCardHome = ({
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

  const [showModal, setShowModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(false);

  useEffect(() => {
    if (user?._id) {
      setIsLiked(likes.includes(user._id));
      setIsRetweeted(retweets.includes(user._id));
    }
    dispatch(fetchLikeCount(tweetId));
    dispatch(fetchRetweetInfo(tweetId));
  }, [user, tweetId, dispatch, likes, retweets]);

  const handleLike = () => {
    if (!token) return;
    setIsLiked((prev) => !prev);
    dispatch(toggleLike({ tweetId, token }));
  };

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
          <div className="relative w-10 h-10 overflow-hidden rounded-full shrink-0">
            <Image
              src={avatar ? `/uploads/profile/${avatar}` : '/profile.jpg'}
              alt={name}
              className="object-cover w-full h-full"
              width={120}
              height={120}
            />
          </div>

          {/* İçerik */}
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

export default TweetCardHome;
