'use client';

import { FaEllipsisH } from 'react-icons/fa';
import Image from 'next/image';

const trends = [
  { category: 'Haberler · Gündemdekiler', title: '#Tsunami', count: '166 B gönderi' },
  { category: 'Haberler · Gündemdekiler', title: '#Rusya', count: '11,3 B gönderi' },
  { category: 'Gündemdekiler', title: 'Deprem', count: '46,5 B gönderi' },
  { category: 'Türkiye tarihinde gündemde', title: '#MetinAkdülger' },
];

const TrendSidebar = () => {
  return (
    <aside className="hidden lg:block fixed top-0 right-0 h-screen w-[350px] px-4 py-6 overflow-y-auto bg-black text-white">
      
      {/* Arama */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Ara"
          className="w-full px-4 py-2 rounded-full border border-gray-800  placeholder-gray-400 focus:outline-none"
        />
      </div>

      {/* Premium Kartı */}
      <div className=" rounded-2xl p-4 mb-6 border border-gray-800">
        <h2 className="text-xl font-bold mb-1">Premium'a abone ol</h2>
        <p className="text-sm text-gray-400 mb-3">
          Yeni özellikleri açmak için abone ol ve uygun olman durumunda içerik üreticisi gelir payı kazan.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded-full">
          Abone Ol
        </button>
      </div>

      {/* Trendler */}
      <div className=" rounded-2xl p-4 border border-gray-800">
        <h2 className="text-xl font-bold mb-4">Neler oluyor?</h2>
        {trends.map((trend, index) => (
          <div
            key={index}
            className="mb-4 last:mb-2 hover:bg-gray-800 p-2 rounded-xl cursor-pointer"
          >
            <div className="flex justify-between text-sm text-gray-500">
              <span>{trend.category}</span>
              <FaEllipsisH />
            </div>
            <h3 className="text-white font-bold text-md">{trend.title}</h3>
            {trend.count && (
              <p className="text-sm text-gray-500">{trend.count}</p>
            )}
          </div>
        ))}
        <p className="text-blue-500 hover:underline text-sm mt-2 cursor-pointer">
          Daha fazla göster
        </p>
      </div>

      {/* Kimi Takip Etmeli */}
      <div className=" rounded-2xl p-4 mt-6 border border-gray-800">
        <h2 className="text-xl font-bold mb-4">Kimi takip etmeli</h2>

        {[
          { name: 'İkbal Ayten', username: '@IkbalAyten1', button: 'Takip et', avatar: '/avatar1.jpg' },
          { name: 'Fatma Gül', username: '@kusbakisii', button: 'Geri takip et', note: 'Seni takip ediyor', avatar: '/avatar2.jpg' },
          { name: 'EftalBey', username: '@artikbisaIin', button: 'Takip et', verified: true, avatar: '/avatar3.jpg' },
        ].map((user, index) => (
          <div key={index} className="flex items-center justify-between mb-4 last:mb-2">
            <div className="flex items-center gap-3">
              <Image
                src={user.avatar}
                alt={user.name}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-white">{user.name}</span>
                  {user.verified && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
                      <path d="M22.25 12c0-1.5-.4-2.9-1.1-4.1l1.1-3.4-3.4 1.1C17.5 4.1 15.8 3.5 14 3.3V0h-4v3.3c-1.8.2-3.5.8-4.9 1.6L1.7 4.5l1.1 3.4C1.9 9.1 1.5 10.5 1.5 12c0 1.5.4 2.9 1.1 4.1l-1.1 3.4 3.4-1.1c1.4.9 3.1 1.5 4.9 1.6V24h4v-3.3c1.8-.2 3.5-.8 4.9-1.6l3.4 1.1-1.1-3.4c.7-1.2 1.1-2.6 1.1-4.1zm-12 3l-3-3 1.4-1.4 1.6 1.6 4.6-4.6L16 9l-5.8 6z"/>
                    </svg>
                  )}
                </div>
                <span className="text-gray-400 text-sm">{user.username}</span>
                {user.note && <span className="text-gray-500 text-xs">{user.note}</span>}
              </div>
            </div>

            <button className="bg-white text-black text-sm font-semibold py-1 px-4 rounded-full hover:bg-gray-300">
              {user.button}
            </button>
          </div>
        ))}

        <p className="text-blue-500 hover:underline text-sm cursor-pointer mt-2">
          Daha fazla göster
        </p>
      </div>
    </aside>
  );
};

export default TrendSidebar;
