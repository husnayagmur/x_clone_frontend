import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedTweets, createTweet, toggleLike, toggleRetweet } from "@/redux/slice/TweetSlice";
import Image from "next/image";
import { FaRegComment, FaRetweet, FaHeart, FaEye } from "react-icons/fa";
import ReplyModal from "../components/ReplyModal"; 

const formatAvatarUrl = (avatar) => {
  if (!avatar || avatar === "undefined") return "/profile.jpg"; 
  if (avatar.startsWith("http")) return avatar;
  const cleanPath = avatar.startsWith("/") ? avatar : "/" + avatar;
  return `http://localhost:3000${cleanPath}`; 
};

const Home = () => {
  const [text, setText] = useState("");
  const [showModal, setShowModal] = useState(false); 
  const [tweetId, setTweetId] = useState(null); 
  const [likedTweets, setLikedTweets] = useState({}); 
  const [retweetedTweets, setRetweetedTweets] = useState({}); 
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);  
  const userEmail = user?.email; 

  useEffect(() => {
    if (token) {
      dispatch(fetchFeedTweets(token));  
    }
  }, [dispatch, token]);

  const { feedTweets, loading } = useSelector((state) => state.tweets);

  const handleTweetSubmit = async () => {
    if (!text.trim()) return;

    const result = await dispatch(createTweet({ content: text, token }));

    if (createTweet.fulfilled.match(result)) {
      alert("Tweet başarıyla gönderildi!");
      setText(""); 
    } else {
      alert("Tweet gönderilirken bir hata oluştu.");
    }
  };

  const openReplyModal = (tweetId) => {
    setTweetId(tweetId);  
    setShowModal(true);  
  };

  const closeReplyModal = () => {
    setShowModal(false); 
    setTweetId(null); 
  };


  const handleLike = (tweetId) => {
    setLikedTweets((prev) => ({ 
      ...prev, 
      [tweetId]: !prev[tweetId]  
    }));
    dispatch(toggleLike({ tweetId, token }));
  };


  const handleRetweet = (tweetId) => {
    setRetweetedTweets((prev) => ({ 
      ...prev, 
      [tweetId]: !prev[tweetId] 
    }));
    dispatch(toggleRetweet({ tweetId, token }));
  };

  return (
    <div className="text-white bg-black min-h-screen w-full border border-gray-800 ">
      <div className="flex-1">
        {/* Header */}
        <div className="flex border-b border-gray-800 justify-between text-sm font-semibold px-4 py-3">
          <button className="text-white px-4 py-2 border-b-2 border-blue-500">Sana özel</button>
          <button className="text-gray-500 px-4 py-2">Takip</button>
        </div>

        {/* Tweet input */}
        <div className="flex gap-3 px-4 mt-2">
          <Image
            src={formatAvatarUrl("/profile.jpg")}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-700"
            alt="profile"
            width={48}
            height={48}
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Neler oluyor?"
            className="w-full resize-none bg-black placeholder-gray-500 outline-none mt-1 text-sm text-white"
            rows={2}
          />
        </div>

        {/* Send Button */}
        <div className="flex justify-between items-center px-4 py-3">
          <button
            onClick={handleTweetSubmit}
            className={`px-4 py-1 rounded-full font-semibold ${text.trim() ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-700 text-gray-300 cursor-not-allowed"}`}
            disabled={!text.trim()}
          >
            Gönderi yayınla
          </button>
        </div>

        {/* Tweet List */}
        <div className="divide-y divide-gray-800">
          {loading ? (
            <p className="text-gray-400 text-center py-4">Yükleniyor...</p>
          ) : (
            feedTweets.map((tweet) => (
              <div key={tweet._id} className="py-2 px-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-white">{tweet.author.username}</p>
                    <p className="text-gray-400 text-xs">{userEmail || "No Email"}</p> 
                  </div>
                </div>
                <p className="mt-2">{tweet.content}</p>
                <div className="text-gray-500 text-xs mt-1">
                  {new Date(tweet.createdAt).toLocaleString()}
                </div>
                <div className="flex gap-4 text-gray-400 text-xs mt-2">
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => openReplyModal(tweet._id)}
                  >
                    <FaRegComment className="mr-1" />
                    <span>{tweet.commentCount || 0}</span>
                  </div>
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => handleRetweet(tweet._id)} 
                  >
                    <FaRetweet className={`mr-1 ${retweetedTweets[tweet._id] ? "text-green-500" : ""}`} />
                    <span>{tweet.retweetCount || 0}</span>
                  </div>
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => handleLike(tweet._id)} 
                  >
                    <FaHeart className={`mr-1 ${likedTweets[tweet._id] ? "text-red-500" : ""}`} /> 
                    <span>{tweet.likeCount || 0}</span>
                  </div>
                  <div className="flex items-center">
                    <span>{tweet.viewCount || 0}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ReplyModal */}
      {showModal && <ReplyModal onClose={closeReplyModal} tweetId={tweetId} />}
    </div>
  );
};

export default Home;
