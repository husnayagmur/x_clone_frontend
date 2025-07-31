'use client';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addComment } from '@/redux/slice/CommentSlice';
import { FaTimes, FaImage, FaChartBar, FaSmile, FaCalendarAlt, FaMapMarkerAlt, FaFileImage } from 'react-icons/fa';

const ReplyModal = ({ onClose, tweetId }) => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  // Redux store'dan user ve token'ı alıyoruz
  const { user, token } = useSelector((state) => state.auth);

  const handleSubmit = async () => {
    if (!content.trim()) {
      console.log("❌ Yorum boş olamaz!");
      return;
    }

    const result = await dispatch(addComment({ tweetId, content, token }));

    if (addComment.fulfilled.match(result)) {
      console.log("✅ Yorum başarıyla eklendi:", result.payload);
      onClose(); // modalı kapat
    } else {
      console.log("❌ Yorum ekleme hatası:", result.payload);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800/80 z-50 flex items-center justify-center">
      <div className="bg-black text-white rounded-2xl w-full max-w-xl p-4 relative">
        {/* Üst Bar */}
        <div className="flex justify-between items-center mb-2">
          <button onClick={onClose} className="text-white text-xl hover:text-gray-400">
            <FaTimes />
          </button>
        </div>

        {/* Tweet Bilgisi (opsiyonel olarak geliştirilebilir) */}
        <div className="text-gray-400 text-sm mb-2">Yanıtla</div>

        {/* Yanıt Giriş */}
        <div className="flex gap-3 mt-4">
          <img
            src={user?.avatar || '/profile.jpg'}
            alt="me"
            className="w-12 h-12 rounded-full object-cover"
          />
          <input
            type="text"
            placeholder="Yanıtını yaz..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-black text-white placeholder-gray-500 w-full outline-none text-lg px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Araçlar */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex gap-4 text-blue-500 text-xl">
            <FaImage className="cursor-pointer" />
            <FaFileImage className="cursor-pointer" />
            <FaChartBar className="cursor-pointer" />
            <FaSmile className="cursor-pointer" />
            <FaCalendarAlt className="cursor-pointer" />
            <FaMapMarkerAlt className="cursor-pointer" />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-600 transition-all duration-300"
          >
            Yanıtla
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplyModal;
