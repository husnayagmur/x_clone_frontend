"use client";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import TrendSidebar from "./components/TrendSidebar";
import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import Login from "./Auth/Login";

export default function IndexPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // başlangıçta giriş yapılmamış
  const [currentView, setCurrentView] = useState("home");

  // Login componentine login sonrası setIsLoggedIn(true) gönder
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  const Content = currentView === "profile" ? Profile : Home;

  return (
    <div className="min-h-[100svh] bg-black text-white">
      <div className="mx-auto max-w-[1280px] px-4 grid grid-cols-1 lg:grid-cols-[260px_minmax(0,700px)_360px] gap-6 items-start">
        <aside className="sticky top-0 self-start h-fit">
          <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
        </aside>

        <main className="min-w-0">
          <Content />
        </main>

        <aside className="sticky top-0 self-start h-fit">
          <TrendSidebar />
        </aside>
      </div>
    </div>
  );
}

