import { useState } from "react";
import {
  FaImage,
  FaEyeSlash,
  FaSlidersH,
  FaSmile,
  FaCamera,
  FaLocationArrow,
} from "react-icons/fa";
import { MdGif } from "react-icons/md";
import TweetCard from "../components/TweetCard";
const Home = () => {
  const [text, setText] = useState("");

  return (
    <div className="bg-black text-white border-b border-gray-800  border border-gray-800">
      {/* Sekmeler */}
     <div className="flex border-b border-gray-800 justify-between text-sm font-semibold px-4 py-3">
        <button className="text-white px-4 py-2 border-b-2 border-blue-500">
          Sana özel
        </button>
        <button className="text-gray-500 px-4 py-2">Takip</button>
      </div>

      {/* Kullanıcı input */}
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
          className="w-full resize-none bg-black placeholder-gray-500 outline-none mt-1"
          rows={2}
        />
      </div>

      {/* Alt ikonlar ve buton */}
      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex gap-4 text-blue-500 text-lg">
          <FaImage />
          <MdGif />
          <FaEyeSlash />
          <FaSlidersH />
          <FaSmile />
          <FaCamera />
          <FaLocationArrow />
        </div>

        <button
          className={`px-4 py-1 rounded-full font-semibold ${
            text.trim()
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-700 text-gray-300 cursor-not-allowed"
          }`}
          disabled={!text.trim()}
        >
          Gönderi yayınla
        </button>
      </div>
      <div className="px-4 py-3 mt-4 text-blue-500 text-sm hover:underline cursor-pointer border bordery-gray-800 flex justify-center items-center">
        35 gönderiyi göster
      </div>
       <div className="mt-6 border-t border-gray-800">
              <TweetCard
                name="HüSna"
                username="husnaygmr"
                date="7 Ağu 2024"
                text={`"testestest"`}
                likes={2}
                views={183}
                avatar="/profile.jpg"
              />
              <TweetCard
                name="HüSna"
                username="husnaygmr"
                date="4 Ağu 2024"
                text={`"testestestestest"`}
                hashtag="#test"
                likes={0}
                views={195}
                avatar="/profile.jpg"
              />
            </div>
    </div>
  );
};

export default Home;
