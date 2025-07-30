import "@/styles/globals.css";
import Sidebar from "./Sidebar";
import TrendSidebar from "./TrendSidebar";

export default function App({ Component, pageProps }) {
  return (
    <div className="flex bg-black text-white min-h-screen overflow-hidden">
      {/* Sol sabit menü */}
      <div className="fixed left-0 top-0 h-screen z-10">
        <Sidebar />
      </div>

      {/* Ortadaki scroll edilebilir içerik */}
      <div className="flex-1 mx-auto w-full max-w-[600px] h-screen overflow-y-auto px-4 sm:px-6 lg:px-8">
        <Component {...pageProps} />
      </div>

      {/* Sağ sabit menü sadece büyük ekranlarda görünür */}
      <div className="hidden lg:block fixed right-0 top-0 h-screen z-10">
        <TrendSidebar />
      </div>
    </div>
  );
}
