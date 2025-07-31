'use client';
import Image from 'next/image';
import { FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';
import TweetCard from '../components/TweetCard';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserProfile } from '@/redux/slice/UserSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); 
  const {
    profile,
    tweetCount,
    followerCount,
    followingCount,
  } = useSelector((state) => state.users);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserProfile(user.id));
    }
  }, [user, dispatch]);

  const joinDate = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString('tr-TR', {
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <div className="text-white bg-black min-h-screen w-full border border-gray-800">
      <div className="flex flex-row items-center gap-3 px-4 py-2">
        <FaArrowLeft size={20} />
        <div>
          <span className="block text-white font-bold">{profile?.username || 'Kullanıcı'}</span>
          <span className="block text-zinc-400">{tweetCount || 0} Gönderi</span>
        </div>
      </div>

      <div className="relative w-full h-52 bg-gray-800">
        <Image src="/profile.jpg" alt="Kapak" fill className="object-cover" />
      </div>

      <div className="relative px-4 pb-4">
        <div className="absolute -top-12 left-4 border-4 border-black rounded-full w-32 h-32 overflow-hidden">
          <Image
            src={profile?.avatar || "/profile.jpg"}
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

      <div className="px-4 mt-4">
        <h1 className="text-xl font-bold">{profile?.username || 'Kullanıcı'}</h1>
        <p className="text-gray-500">@{profile?.email?.split('@')[0]}</p>
        <p className="text-blue-400 mt-1">{profile?.bio || 'Biyografi yok'}</p>

        <div className="flex items-center gap-1 text-gray-500 text-sm mt-2">
          <FaCalendarAlt className="text-xs" />
          <span>
            {joinDate ? `${joinDate} tarihinde katıldı` : 'Katılım tarihi yok'}
          </span>
        </div>

        <div className="flex gap-2 mt-2 text-sm">
          <span className="font-semibold text-white">{followingCount ?? 0}</span>
          <span className="text-gray-500">Takip edilen</span>
          <span className="font-semibold text-white ml-4">{followerCount ?? 0}</span>
          <span className="text-gray-500">Takipçi</span>
        </div>
      </div>

      <div className="bg-green-900 text-white rounded-2xl p-4 mt-6 mx-4 flex justify-between items-start">
        <div>
          <p className="font-bold mb-1 flex items-center gap-1">
            Henüz hesabın onaylı değil <span className="text-white">✔</span>
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

      <div className="mt-6 border-t border-gray-800">
        <TweetCard
          name={profile?.username}
          username={profile?.email?.split('@')[0]}
          date="7 Ağu 2024"
          text="jhkdgfhjdghjgdhjg"
          likes={2}
          views={183}
          avatar={profile?.avatar || "/profile.jpg"}
        />
      </div>
    </div>
  );
};

export default Profile;
