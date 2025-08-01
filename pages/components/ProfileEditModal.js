import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProfile } from '@/redux/slice/UserSlice'; // Import updateProfile action

const ProfileEditModal = ({ onClose, userId, profile }) => {
  const dispatch = useDispatch();
  const [bio, setBio] = useState(profile?.bio || '');
  const [username, setUsername] = useState(profile?.username || '');
  const [avatar, setAvatar] = useState(null); // For file upload
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('bio', bio);
    formData.append('username', username);
    if (avatar) formData.append('avatar', avatar);

    try {
      setLoading(true);
      await dispatch(updateProfile({ userId, formData, token: localStorage.getItem('token') }));
      onClose(); // Close modal after successful update
    } catch (err) {
      setError('Profil güncellenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-700/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96 text-black"> {/* Added text-black here */}
        <h2 className="text-xl font-bold mb-4">Profili Düzenle</h2>

        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="mb-4">
            <label className="block text-black text-sm font-semibold">Ad</label> {/* Added text-black */}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Adınızı yazın"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">Biyografi</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Biyografinizi yazın..."
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">Avatar</label>
            <input
              type="file"
              onChange={handleAvatarChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-1 rounded-md"
            >
              Kapat
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-1 rounded-md"
            >
              {loading ? "Güncelleniyor..." : "Güncelle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;
