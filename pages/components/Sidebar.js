'use client';

import {
  FaHome, FaSearch, FaBell, FaEnvelope,
  FaUsers, FaBolt, FaUser, FaEllipsisH
} from 'react-icons/fa';
import { PiSparkleFill } from 'react-icons/pi';
import { SiX } from 'react-icons/si';
import Link from 'next/link';
import { useSelector } from 'react-redux';

export default function Sidebar({ currentView, setCurrentView }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <aside className="fixed top-0 left-0 h-screen bg-black text-white px-8 py-6 w-16 sm:w-20 lg:w-72 flex flex-col z-50">
      <div className="flex-1 flex flex-col gap-2 items-center lg:items-start">
        <div className="text-3xl flex items-center justify-center mb-4 lg:ml-2">
          <SiX />
        </div>

        {/* SPA içi yönlendirme: Home & Profile */}
        <SidebarItem
          icon={<FaHome />}
          label="Anasayfa"
          onClick={() => setCurrentView('home')}
          active={currentView === 'home'}
        />
        {/* Diğerleri örnek olarak Link kalsın */}
        <SidebarItem icon={<FaSearch />} label="Keşfet" href="#" />
        <SidebarItem icon={<FaBell />} label="Bildirimler" href="#" badge={3} />
        <SidebarItem icon={<FaEnvelope />} label="Mesajlar" href="#" />
        <SidebarItem icon={<PiSparkleFill />} label="Grok" href="#" />
        <SidebarItem icon={<FaUsers />} label="Topluluklar" href="#" />
        <SidebarItem icon={<SiX />} label="Premium" href="#" />
        <SidebarItem icon={<FaBolt />} label="Onaylı Kuruluşlar" href="#" />
         <SidebarItem
          icon={<FaUser />}
          label="Profil"
          onClick={() => setCurrentView('profile')}
          active={currentView === 'profile'}
        />
        <SidebarItem icon={<FaEllipsisH />} label="Daha fazla" href="#" />

        <button className="bg-white w-full text-black text-sm font-bold rounded-full py-2 px-4 mt-4">
          <span className="block lg:hidden">+</span>
          <span className="hidden lg:block">Gönderi yayınla</span>
        </button>
      </div>

      <div className="mt-auto flex items-center justify-between w-auto px-2 py-2 hover:bg-gray-800 rounded-lg">
        <div className="w-10 h-10 rounded-full bg-gray-800 sm:w-12 sm:h-12"></div>
        <div className="hidden sm:flex flex-col flex-1 ml-3">
          <div className="flex justify-between items-center">
           <h1 className="font-bold text-white text-sm sm:text-base">{user?.username || 'Kullanıcı'}</h1>
            <span className="text-white text-lg">⋯</span>
          </div>
         <span className="text-gray-400 text-xs">{user?.email || 'email@örnek.com'}</span>
        </div>
      </div>
    </aside>
  );
}

function SidebarItem({ icon, label, href, badge, onClick, active }) {
  const base =
    "relative flex items-center gap-4 text-xl px-3 py-2 rounded-full lg:rounded-lg w-full justify-center lg:justify-start transition";
  const state = active ? "bg-white/10 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white";

  // onClick verilmişse buton olarak render et (SPA view değişimi)
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`${base} ${state}`}>
        <div className="relative">
          {icon}
          {badge && (
            <span className="absolute -top-1 -right-1 text-[10px] bg-blue-500 text-white rounded-full px-1.5">
              {badge}
            </span>
          )}
        </div>
        <span className="hidden lg:block text-base">{label}</span>
      </button>
    );
  }

  // Aksi halde Link olarak bırak
  return (
    <Link href={href ?? "#"} className={`${base} ${state}`}>
      <div className="relative">
        {icon}
        {badge && (
          <span className="absolute -top-1 -right-1 text-[10px] bg-blue-500 text-white rounded-full px-1.5">
            {badge}
          </span>
        )}
      </div>
      <span className="hidden lg:block text-base">{label}</span>
    </Link>
  );
}
