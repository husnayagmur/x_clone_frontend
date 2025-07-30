'use client';
import Image from 'next/image';
import { FaCalendarAlt } from 'react-icons/fa';
import TweetCard from '../components/TweetCard';
import { FaArrowLeft } from "react-icons/fa";
const Profile = () => {
  return (
    <div className="text-white bg-black min-h-screen w-full border border-gray-800">
     <div className="flex flex-row items-center gap-3">
  <FaArrowLeft size={20} />

  <div>
    <span className="block text-white font-bold">HüSna</span>
    <span className="block text-zinc-400">30 Gönderi</span>
  </div>
</div>
      <div className="relative w-full h-52 bg-gray-800">
        <Image
          src="/profile.jpg"
          alt="Kapak"
          fill
          className="object-cover"
        />
      </div>
      {/* Profil Fotoğrafı + Düzenle */}
      <div className="relative px-4 pb-4">
       <div className="absolute -top-12 left-4 border-4 border-black rounded-full w-32 h-32 overflow-hidden">
  <Image
    src="/profile.jpg"
    alt="Profil"
    width={128}
    height={128}
    className="object-cover w-full h-full rounded-full"
  />
</div>

        <div className="flex justify-end pt-4">
          <button className="border border-gray-600 rounded-full px-4 py-1 text-sm hover:bg-[#181818]">
            Profili düzenle
          </button>
        </div>
      </div>

      {/* Kullanıcı Bilgileri */}
      <div className="px-4 mt-4">
        <h1 className="text-xl font-bold">HüSna</h1>
        <p className="text-gray-500">@husnaygmr</p>
        <p className="text-blue-400 mt-1">Computer Engineer♡</p>
        <div className="flex items-center gap-1 text-gray-500 text-sm mt-2">
          <FaCalendarAlt className="text-xs" />
          <span>Ağustos 2019 tarihinde katıldı</span>
        </div>
        <div className="flex gap-4 mt-2 text-sm">
          <span className="font-semibold text-white">43</span>
          <span className="text-gray-500">Takip edilen</span>
          <span className="font-semibold text-white ml-4">36</span>
          <span className="text-gray-500">Takipçi</span>
        </div>
      </div>

      {/* Onay Uyarısı */}
      <div className="bg-green-900 text-white rounded-2xl p-4 mt-6 mx-4 flex justify-between items-start">
        <div>
          <p className="font-bold mb-1 flex items-center gap-1">
            Henüz hesabın onaylı değil{' '}
            <span className="text-white">✔</span>
          </p>
          <p className="text-sm text-white">
            Öne çıkarılan yanıtlar, analizler, reklamsız gezinme vb. gibi birçok ayrıcalık için
            onaylı hesap sahibi ol. Profilini hemen yükselt.
          </p>
          <button className="mt-3 bg-white text-black font-semibold px-4 py-1 rounded-full text-sm hover:bg-gray-200">
            Onaylanmış hesap sahibi ol
          </button>
        </div>
        <span className="text-xl font-bold cursor-pointer px-2 hover:text-gray-300">×</span>
      </div>

      {/* Tweet Card'lar */}
      <div className="mt-6 border-t border-gray-800">
        <TweetCard
          name="HüSna"
          username="husnaygmr"
          date="7 Ağu 2024"
          text="jhkdgfhjdghjgdhjg"
          likes={2}
          views={183}
          avatar="/profile.jpg"
        />
        <TweetCard
          name="HüSna"
          username="husnaygmr"
          date="4 Ağu 2024"
          text={`"hasjkgafhjdsgfhjdsghjdgfjh"`}
          hashtag="#aaa"
          likes={0}
          views={195}
          avatar="/profile.jpg"
        />
      </div>
    </div>
  );
};

export default Profile;
