'use client';
import React from 'react';
import { FaTimes, FaImage, FaChartBar, FaSmile, FaCalendarAlt, FaMapMarkerAlt, FaFileImage } from 'react-icons/fa';

const ReplyModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800/80 z-50 flex items-center justify-center">
      <div className="bg-black text-white rounded-2xl w-full max-w-xl p-4 relative">
        
        {/* Üst Bar */}
        <div className="flex justify-between items-center">
          <button onClick={onClose}>
            <FaTimes className="text-white text-xl" />
          </button>
          <span className="text-sm text-blue-500 font-medium cursor-pointer">Taslaklar</span>
        </div>

        {/* Tweet Bilgisi */}
        <div className="flex items-start gap-3 mt-4">
          <img
            src="/ophelia.jpg"
            alt="user"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">Ophelia</span>
              <img src="/verified.svg" alt="verified" className="w-4 h-4" />
              <span className="text-gray-400 text-sm">@opheliart_1 · 29 Tem</span>
            </div>
            <div className="text-sm mt-1 leading-tight">
              <p className="text-white">pic.x.com/aADmj3oKyN</p>
              <p className="text-blue-500">@opheliart_1</p>
              <p className="text-gray-500">adlı kullanıcıya yanıt olarak</p>
            </div>
          </div>
        </div>

        {/* Yanıt Giriş */}
        <div className="flex gap-3 mt-6">
          <img
            src="/profile.jpg"
            alt="me"
            className="w-10 h-10 rounded-full object-cover"
          />
          <input
            type="text"
            placeholder="Yanıtını gönder"
            className="bg-black text-white placeholder-gray-500 w-full outline-none text-lg"
          />
        </div>

        {/* Araçlar */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex gap-4 text-blue-500 text-lg">
            <FaImage />
            <FaFileImage />
            <FaChartBar />
            <FaSmile />
            <FaCalendarAlt />
            <FaMapMarkerAlt />
          </div>
          <button className="bg-white text-black font-semibold px-4 py-1 rounded-full">
            Yanıtla
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplyModal;
