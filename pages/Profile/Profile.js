import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "@/redux/slice/UserSlice";
import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa";
import ProfileEditModal from "../components/ProfileEditModal"; // Import Profile Edit Modal
import Image from "next/image";
import TweetCard from "../components/TweetCard";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { profile, tweetCount, followerCount, followingCount, tweets } = useSelector(
    (state) => state.users
  );

  const [showEditModal, setShowEditModal] = useState(false); // Modal state

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserProfile(user.id));
    }
  }, [user, dispatch]);

  const joinDate = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("tr-TR", {
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="text-white bg-black min-h-screen w-full border border-gray-800">
      <div className="flex flex-row items-center gap-3 px-4 py-2">
        <FaArrowLeft size={20} />
        <div>
          <span className="block text-white font-bold">{profile?.username || "Kullanıcı"}</span>
          <span className="block text-zinc-400">{tweetCount || 0} Gönderi</span>
        </div>
      </div>

      <div className="relative w-full h-52 bg-gray-800">
        <Image
          src={profile?.coverPhoto || "/profile.jpg"}
          alt="Profil"
          width={1200}
          height={300}
          className="object-cover w-full h-full"
        />
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
          <button
            onClick={() => setShowEditModal(true)} // Open modal on click
            className="border border-gray-600 rounded-full px-4 py-1 text-sm hover:bg-[#181818]"
          >
            Profili düzenle
          </button>
        </div>
      </div>

      <div className="px-4 mt-4">
        <h1 className="text-xl font-bold">{profile?.username || "Kullanıcı"}</h1>
        <p className="text-gray-500">@{profile?.email?.split("@")[0]}</p>
        <p className="text-blue-400 mt-1">{profile?.bio || "Biyografi yok"}</p>

        <div className="flex items-center gap-1 text-gray-500 text-sm mt-2">
          <FaCalendarAlt className="text-xs" />
          <span>{joinDate ? `${joinDate} tarihinde katıldı` : "Katılım tarihi yok"}</span>
        </div>

        <div className="flex gap-2 mt-2 text-sm">
          <span className="font-semibold text-white">{followingCount ?? 0}</span>
          <span className="text-gray-500">Takip edilen</span>
          <span className="font-semibold text-white ml-4">{followerCount ?? 0}</span>
          <span className="text-gray-500">Takipçi</span>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-800">
        {tweets?.length > 0 ? (
          tweets.map((tweet) => (
            <TweetCard
              key={tweet._id}
              tweetId={tweet._id}
              name={profile?.username}
              username={profile?.email?.split("@")[0]}
              date={new Date(tweet.createdAt).toLocaleDateString("tr-TR", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
              text={tweet.content}
              likes={tweet.likes}
              retweets={tweet.retweets}
              views={183}
              avatar={profile?.avatar || "/profile.jpg"}
              commentCount={tweet.commentCount || 0}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center py-6">Henüz hiç tweet atılmamış.</p>
        )}
      </div>

      {/* Profile Edit Modal */}
      {showEditModal && (
        <ProfileEditModal
          onClose={() => setShowEditModal(false)} // Close modal
          userId={user.id} // Pass userId to update profile
          profile={profile}
        />
      )}
    </div>
  );
};

export default Profile;
