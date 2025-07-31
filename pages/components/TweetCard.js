'use client';
import { useState } from 'react';
import Image from 'next/image';
import { FaRegComment, FaRetweet, FaHeart } from 'react-icons/fa';
import ReplyModal from './ReplyModal';

const TweetCard = ({
  name,
  username,
  date,
  text,
  hashtag,
  likes = 0,
  views = 0,
  avatar,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [retweetCount, setRetweetCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleLike = () => {
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked((v) => !v);
  };

  const handleRetweet = () => {
    setRetweetCount((prev) => (isRetweeted ? prev - 1 : prev + 1));
    setIsRetweeted((v) => !v);
  };

  return (
    <>
      <div className="p-4 border-b border-gray-800 hover:bg-[#16181c] transition">
        <div className="flex gap-3">
          {/* Avatar */}
          <div className="relative w-10 h-10 overflow-hidden rounded-full shrink-0">
            <Image
              src={avatar}
              alt={name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>

          {/* İçerik */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center text-sm text-gray-400">
              <span>
                <span className="text-white font-semibold">{name}</span>{' '}
                @{username} · {date}
              </span>
              <span>···</span>
            </div>

            <div className="text-white mt-1">
              <p className="whitespace-pre-wrap break-words">{text}</p>
              {hashtag && <span className="text-blue-400"> {hashtag}</span>}
            </div>

            <div className="flex gap-6 mt-2 text-sm">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition"
              >
                <FaRegComment />
                1
              </button>

              <button
                type="button"
                onClick={handleRetweet}
                className={`flex items-center gap-1 transition ${
                  isRetweeted ? 'text-green-500' : 'text-gray-500'
                } hover:text-green-500`}
              >
                <FaRetweet />
                {retweetCount}
              </button>

              <button
                type="button"
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

      {showModal && <ReplyModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default TweetCard;