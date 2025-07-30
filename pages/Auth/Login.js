import React, { useState } from 'react';

export const Login = ({ onLogin }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('husnaygmr0411@gmail.com');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  return (
    <div className="bg-black min-h-screen text-white flex items-center justify-center">
      <div className="w-full max-w-md px-6 py-8">
        {/* X logosu */}
        <div className="flex justify-center mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-8 h-8">
            <path d="M18.87 2h3.66L15.55 10.4l7.5 11.6h-6.46l-4.54-6.99-5.2 6.99H1.17l7.55-10.14L1 2h6.66l4.08 6.2L18.87 2Zm-1.14 18.2h2.01L6.29 3.65H4.15L17.73 20.2Z" />
          </svg>
        </div>

        {step === 1 && (
          <>
            <h1 className="text-2xl font-bold mb-6">X'e giriş yap</h1>

            <button className="w-full flex items-center justify-center bg-white text-black font-medium py-2 rounded-full mb-3">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google" className="w-5 h-5 mr-2" />
              Google ile oturum açın
            </button>

            <button className="w-full flex items-center justify-center bg-white text-black font-medium py-2 rounded-full mb-6">
              <span className="text-sm"></span> Apple ile giriş yap
            </button>

            <div className="text-center text-gray-400 text-sm mb-4">veya</div>

            <input
              type="text"
              placeholder="Telefon numarası, e‑posta veya kullanıcı adı"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-gray-700 px-4 py-3 rounded-md text-white mb-4 focus:outline-none focus:border-gray-400"
            />

            <button
              onClick={() => setStep(2)}
              className="w-full bg-white text-black font-semibold py-2 rounded-full mb-3 hover:bg-gray-200 transition"
            >
              İleri
            </button>

            <button className="w-full border border-gray-600 py-2 rounded-full hover:bg-[#181818] transition mb-6">
              Şifreni mi unuttun?
            </button>

            <div className="text-sm text-gray-500 text-center">
              Henüz bir hesabın yok mu? <a href="#" className="text-blue-500 hover:underline">Kaydol</a>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="text-2xl font-bold mb-6">Şifreni gir</h1>

            <input
              disabled
              value={email}
              className="w-full bg-[#1a1a1a] text-gray-400 px-4 py-3 rounded-md mb-4 cursor-not-allowed border border-gray-700"
            />

            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                placeholder="Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-blue-500 px-4 py-3 rounded-md text-white mb-1 pr-10 focus:outline-none"
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute right-3 top-3 text-gray-400 cursor-pointer"
              >
                👁️
              </span>
            </div>

            <button className="text-sm text-blue-500 hover:underline mb-6">Şifreni mi unuttun?</button>

            <button
              onClick={() => onLogin()}
              className="w-full bg-white text-black font-semibold py-2 rounded-full transition"
            >
              Giriş yap
            </button>

            <div className="text-sm text-gray-500 text-center mt-6">
              Henüz bir hesabın yok mu? <a href="#" className="text-blue-500 hover:underline">Kaydol</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
