import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedTweets } from "@/redux/slice/TweetSlice";
import TweetCard from "@/pages/components/TweetCardHome"; // TweetCard'ı import ettik

const Home = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

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
      setText(""); // input temizle
    } else {
      alert("Tweet gönderilirken bir hata oluştu.");
    }
  };

  return (
    <div className="bg-black text-white border-b border-gray-800 flex relative">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-16 sm:w-20 lg:w-72 bg-gray-800 z-10">
        {/* Sidebar içerikleri buraya gelecek */}
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-16 sm:ml-20 lg:ml-72">
        <div className="flex border-b border-gray-800 justify-between text-sm font-semibold px-4 py-3">
          <button className="text-white px-4 py-2 border-b-2 border-blue-500">Sana özel</button>
          <button className="text-gray-500 px-4 py-2">Takip</button>
        </div>

        <div className="flex gap-3 px-4 mt-2">
          <img
            src="/profile.jpg"
            className="w-10 h-10 rounded-full object-cover"
            alt="profile"
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Neler oluyor?"
            className="w-full resize-none bg-black placeholder-gray-500 outline-none mt-1 text-sm"
            rows={2}
          />
        </div>

        <div className="flex justify-between items-center px-4 py-3">
          <button
            onClick={handleTweetSubmit}
            className={`px-4 py-1 rounded-full font-semibold ${
              text.trim() ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-700 text-gray-300 cursor-not-allowed"
            }`}
            disabled={!text.trim()}
          >
            Gönderi yayınla
          </button>
        </div>

        <div className="px-4 py-3 mt-4 text-blue-500 text-sm hover:underline cursor-pointer border border-gray-800 flex justify-center items-center">
          35 gönderiyi göster
        </div>

        <div className="divide-y divide-gray-800">
          {loading ? (
            <p className="text-gray-400 text-center py-4">Yükleniyor...</p>
          ) : (
            feedTweets.map((tweet) => (
              <TweetCard
                key={tweet._id}
                tweetId={tweet._id}
                name={tweet.author?.name}
                username={tweet.author?.username}
                date={new Date(tweet.createdAt).toLocaleString()}
                text={tweet.content}
                likes={tweet.likes}
                retweets={tweet.retweets}
                views={tweet.views}
                avatar={tweet.author?.avatar}
                commentCount={tweet.commentCount}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
