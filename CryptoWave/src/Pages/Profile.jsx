import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FiLogOut, FiMail, FiShield, FiStar } from "react-icons/fi";
import { FaExclamationTriangle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

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
    <div className="flex text-white bg-[#0B0E14] min-h-screen font-sans selection:bg-[#7f8cff]/30">
      <Toaster position="top-right" />

      {/* Sidebar - Desktop Only */}
      <div className="w-[300px] h-screen sticky top-0 bg-[#11151C] hidden lg:block border-r border-white/5 shadow-2xl">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
        <Header title="My Profile" />

        <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
          {/* Subtle Background Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#7f8cff]/5 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="w-full max-w-md relative group">
            {/* Animated Border Gradient */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7f8cff]/20 via-cyan-500/20 to-purple-500/20 rounded-[40px] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>

            {/* Main Profile Card */}
            <div className="relative bg-[#11151C]/90 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 shadow-2xl">
              {/* Top Section: Avatar & Details */}
              <div className="flex flex-col items-center">
                <div className="relative mb-6">
                  <div className="absolute -inset-2 bg-gradient-to-tr from-[#7f8cff] to-cyan-400 rounded-[35px] blur opacity-10"></div>
                  <img
                    src={
                      user?.picture ||
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=Crypto"
                    }
                    alt="profile"
                    className="relative w-32 h-32 rounded-[32px] border-4 border-[#0B0E14] object-cover shadow-2xl"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-[#11151C] rounded-full animate-pulse"></div>
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-white mb-1">
                  {user?.name || "Crypto Enthusiast"}
                </h2>
                <p className="text-gray-500 text-sm font-medium flex items-center gap-2">
                  <FiMail className="text-[#7f8cff]" /> {user?.email}
                </p>
                <div className="mt-3 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                  <p className="text-[10px] text-gray-400 font-mono uppercase tracking-[0.2em]">
                    ID: {user?.id?.slice(0, 12) || "CW-772910"}
                  </p>
                </div>
              </div>

              {/* Middle Section: Stats Grid */}
              <div className="grid grid-cols-2 gap-4 my-10">
                <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-5 hover:bg-white/[0.05] transition-colors group/stat">
                  <FiStar
                    className="text-yellow-500/80 mb-2 group-hover/stat:scale-110 transition-transform"
                    size={20}
                  />
                  <p className="text-2xl font-bold">{watchlistCount}</p>
                  <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                    Watchlist
                  </p>
                </div>
                <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-5 hover:bg-white/[0.05] transition-colors group/stat">
                  <FiShield
                    className="text-cyan-400/80 mb-2 group-hover/stat:scale-110 transition-transform"
                    size={20}
                  />
                  <p className="text-2xl font-bold">Verified</p>
                  <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                    Account
                  </p>
                </div>
              </div>

              {/* Bottom Section: Actions */}
              <button
                onClick={() => setShowLogoutModal(true)}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 transition-all font-bold group active:scale-[0.98]"
              >
                <FiLogOut
                  className="group-hover:-translate-x-1 transition-transform"
                  size={20}
                />
                <span className="uppercase tracking-widest text-xs">
                  Terminate Session
                </span>
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Logout Modal - Smooth Animation */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="relative bg-[#111827]/95 backdrop-blur-2xl border border-white/10 p-8 rounded-[35px] shadow-2xl w-full max-w-[400px] animate-in zoom-in slide-in-from-bottom-4 duration-300">
            <button
              onClick={() => setShowLogoutModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-gray-500 hover:text-white hover:bg-white/10 transition-all"
            >
              <IoClose size={24} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="bg-red-500/10 p-5 rounded-full mb-5">
                <FaExclamationTriangle className="text-red-500 text-4xl" />
              </div>

              <h2 className="text-white text-2xl font-bold mb-3">
                End Session?
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Are you sure you want to exit{" "}
                <span className="text-[#97a9ff] font-bold">CryptoWave</span>?
                You'll need to log back in to track your watchlist.
              </p>

              <div className="flex gap-4 w-full">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-semibold border border-white/10 transition-all active:scale-95"
                >
                  Stay
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-4 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold transition-all shadow-lg shadow-red-600/20 active:scale-95"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
