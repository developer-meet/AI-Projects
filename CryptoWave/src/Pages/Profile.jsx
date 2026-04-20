import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  FiLogOut,
  FiMail,
  FiShield,
  FiStar,
  FiActivity,
  FiSettings,
} from "react-icons/fi";
import crptoDp from "../assets/cryptoDP.jpeg";
import LogoutModal from "../Components/LogoutModal";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [watchlistCount, setWatchlistCount] = useState(0);

  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlistCount(savedWatchlist.length);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logout Successful");
    navigate("/");
  };

  return (
    <div className="flex text-white bg-[#0B0E14] h-screen overflow-hidden font-sans selection:bg-[#97a9ff]/30">
      <Toaster position="top-right" />

      <div className="w-[300px] bg-[#11151C] hidden lg:block border-r border-white/5 flex-shrink-0">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar ">
        <Header title="User Profile" />

        <main className="p-8 max-w-5xl mx-auto w-full">
          <div className=" mb-10  rounded-[40px] border border-white/10 bg-[#111827]  p-10">
            <div className=" flex flex-col md:flex-row items-center gap-10">
              <div className="">
                <div className=" bg-gradient-to-tr from-[#97a9ff] to-[#8930FF] rounded-[42px] opacity-20 blur-md"></div>
                <img
                  src={user?.picture || crptoDp}
                  alt="profile"
                  className="w-40 h-40 rounded-[50%] border-4 border-[#0B0E14] object-cover"
                />
              </div>

              <div className="text-center md:text-left flex-1">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h1 className="text-4xl font-black tracking-tight">
                    {user?.name || "Crypto User"}
                  </h1>
                  <span className="bg-[#97a9ff]/20 text-[#97a9ff] text-[10px] uppercase font-black px-3 py-1 rounded-full border border-[#97a9ff]/30 tracking-widest">
                    PRO
                  </span>
                </div>
                <p className="text-gray-400 flex items-center justify-center md:justify-start gap-2 mb-6 font-medium">
                  <FiMail className="text-[#97a9ff]" /> {user?.email}
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="px-6 py-2.5 bg-red-500/10 text-red-500 border border-red-500/20 font-bold rounded-2xl hover:bg-red-500/20 transition-all active:scale-95 flex items-center gap-2"
                  >
                    <FiLogOut /> Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#111827]/30 border border-white/5 p-6 rounded-[32px] hover:border-[#97a9ff]/30 transition-all group">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center text-yellow-500 mb-4 group-hover:scale-110 transition-transform">
                <FiStar size={24} />
              </div>
              <p className="text-3xl font-black mb-1">{watchlistCount}</p>
              <p className="text-xs uppercase font-bold text-gray-500 tracking-widest">
                Coins Watchlisted
              </p>
            </div>

            <div className="bg-[#111827]/30 border border-white/5 p-6 rounded-[32px] hover:border-[#97a9ff]/30 transition-all group">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-500 mb-4 group-hover:scale-110 transition-transform">
                <FiShield size={24} />
              </div>
              <p className="text-3xl font-black mb-1">Level 2</p>
              <p className="text-xs uppercase font-bold text-gray-500 tracking-widest">
                Security Verified
              </p>
            </div>

            <div className="bg-[#111827]/30 border border-white/5 p-6 rounded-[32px] hover:border-[#97a9ff]/30 transition-all group">
              <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500 mb-4 group-hover:scale-110 transition-transform">
                <FiActivity size={24} />
              </div>
              <p className="text-3xl font-black mb-1">Active</p>
              <p className="text-xs uppercase font-bold text-gray-500 tracking-widest">
                Account Status
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-[10px] text-gray-600 uppercase tracking-[0.4em] font-bold">
              © 2026 CryptoWave. All rights reserved.
            </p>
          </div>
        </main>
      </div>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default Profile;
