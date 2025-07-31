'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginUser,
  registerUser,
  forgotPassword,
  resetPasswordWithCode,
  clearMessages,
} from '@/redux/slice/AuthSlice';

export default function Login({ onLogin }) {
  const dispatch = useDispatch();
  const { loading, error, user, message } = useSelector((state) => state.auth);

  const [view, setView] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleLogin = () => {
    if (!email || !password) return alert('Email ve şifre girin');
    dispatch(loginUser({ email, password }));
  };

  const handleRegister = () => {
    if (!username || !email || !password) return alert('Tüm alanları doldurun');
    dispatch(registerUser({ username, email, password }));
  };

  const handleForgotPassword = () => {
    if (!email) return alert('Email girin');
    dispatch(forgotPassword(email)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setIsCodeSent(true);
      }
    });
  };

  const handleResetPassword = () => {
    if (!email || !resetCode || !newPassword) return alert('Tüm alanları doldurun');
    dispatch(resetPasswordWithCode({ email, code: resetCode, newPassword })).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setEmail('');
        setResetCode('');
        setNewPassword('');
        setIsCodeSent(false);
        setView('login');
      }
    });
  };

  useEffect(() => {
    if (user) onLogin();
  }, [user]);

  useEffect(() => {
    return () => {
      dispatch(clearMessages());
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-md px-6 py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {view === 'login' && 'Giriş Yap'}
          {view === 'register' && 'Kayıt Ol'}
          {view === 'forgot' && 'Şifremi Sıfırla'}
        </h1>

        {(view === 'login' || view === 'register' || view === 'forgot') && (
          <input
            type="email"
            placeholder="E‑posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black border border-gray-700 px-4 py-3 rounded-md text-white mb-4"
          />
        )}

        {view === 'register' && (
          <input
            type="text"
            placeholder="Kullanıcı Adı"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-black border border-gray-700 px-4 py-3 rounded-md text-white mb-4"
          />
        )}

        {(view === 'login' || view === 'register') && (
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black border border-gray-700 px-4 py-3 rounded-md text-white mb-4"
          />
        )}

        {view === 'forgot' && !isCodeSent && (
          <button
            onClick={handleForgotPassword}
            className="w-full bg-white text-black font-semibold py-2 rounded-full mb-4"
          >
            Kod Gönder
          </button>
        )}

        {view === 'forgot' && isCodeSent && (
          <>
            <input
              type="text"
              placeholder="Kod"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              className="w-full bg-black border border-gray-700 px-4 py-3 rounded-md text-white mb-4"
            />
            <input
              type="password"
              placeholder="Yeni Şifre"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-black border border-gray-700 px-4 py-3 rounded-md text-white mb-4"
            />
            <button
              onClick={handleResetPassword}
              className="w-full bg-white text-black font-semibold py-2 rounded-full mb-4"
            >
              Şifreyi Sıfırla
            </button>
          </>
        )}

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {message && <p className="text-green-500 text-sm mb-4">{message}</p>}

        {view === 'login' && (
          <>
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-white text-black font-semibold py-2 rounded-full hover:bg-gray-300 transition disabled:opacity-50"
            >
              {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
            </button>
            <div className="text-center text-sm mt-4">
              <span className="underline cursor-pointer" onClick={() => setView('forgot')}>Şifremi Unuttum</span>{' '}|
              <span className="underline cursor-pointer" onClick={() => setView('register')}> Kaydol</span>
            </div>
          </>
        )}

        {view === 'register' && (
          <>
            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-white text-black font-semibold py-2 rounded-full hover:bg-gray-300 transition disabled:opacity-50"
            >
              {loading ? 'Kaydediliyor...' : 'Kayıt Ol'}
            </button>
            <p className="text-sm text-center mt-4">
              Hesabın var mı?{' '}
              <span className="underline cursor-pointer" onClick={() => setView('login')}>
                Giriş Yap
              </span>
            </p>
          </>
        )}

        {view === 'forgot' && (
          <p className="text-sm text-center mt-4">
            Geri dön?{' '}
            <span className="underline cursor-pointer" onClick={() => {
              setIsCodeSent(false);
              setResetCode('');
              setNewPassword('');
              setView('login');
            }}>
              Giriş Yap
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
