import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaStar, FaExclamationTriangle } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const Sidebar = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logout Successful");
    navigate("/");
  };
  return (
    <div className="h-full flex flex-col justify-between gap-16 border-r border-[#1f2937] p-5">
      <div>
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-[#97a9ff20] p-2 rounded-lg">
            <i className="fa-solid fa-water text-[22px] text-[#97a9ff]"></i>
          </div>
          <p className="text-[#97a9ff] font-bold text-[22px]">CryptoWave</p>
        </div>

        <ul className="flex flex-col gap-3 text-[15px]">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition duration-200 cursor-pointer ${
                isActive
                  ? "bg-[#97a9ff20] text-[#97a9ff] border-l-4 border-[#97a9ff] shadow-md shadow-[#97a9ff20]"
                  : "text-gray-400 hover:text-[#97a9ff] hover:bg-[#97a9ff10] hover:pl-4 transition-all duration-200"
              }`
            }
          >
            <TbLayoutDashboardFilled className="text-[20px]" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/watchlist"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition duration-200 cursor-pointer ${
                isActive
                  ? "bg-[#97a9ff20] text-[#97a9ff] border-l-4 border-[#97a9ff]"
                  : "text-gray-400 hover:text-[#97a9ff] hover:bg-[#97a9ff10] hover:pl-4 transition-all duration-200"
              }`
            }
          >
            <FaStar className="text-[20px]" />
            <span>Watchlist</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition duration-200 cursor-pointer  ${
                isActive
                  ? "bg-[#97a9ff20] text-[#97a9ff] border-l-4 border-[#97a9ff]"
                  : "text-gray-400 hover:text-[#97a9ff] hover:bg-[#97a9ff10] hover:pl-4 transition-all duration-200"
              }`
            }
          >
            <CgProfile className="text-[20px]" />
            <span>Profile</span>
          </NavLink>
        </ul>
      </div>
      <div className="px-2">
        <button
          onClick={() => setShowLogoutModal(true)}
          className="w-full flex items-center gap-3 p-3 rounded-lg border border-transparent text-red-400 hover:border-red-500/20 hover:bg-red-500/5 transition-all cursor-pointer active:scale-[0.98]"
        >
          <div className="p-2 bg-red-500/10 rounded-md">
            <FiLogOut size={18} />
          </div>
          <span className="font-semibold text-sm tracking-wide uppercase">
            Sign Out
          </span>
        </button>
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[4px] transition-all">
          <div className="relative bg-[#111827]/80 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl w-[90%] max-w-[400px] transform transition-all scale-100 animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setShowLogoutModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              <IoClose size={24} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="bg-red-500/20 p-4 rounded-full mb-4">
                <FaExclamationTriangle className="text-red-500 text-3xl" />
              </div>

              <h2 className="text-white text-xl font-bold mb-2">
                End Session?
              </h2>

              <p className="text-gray-400 mb-8">
                Are you sure you want to log out of{" "}
                <span className="text-[#97a9ff]">CryptoWave</span>? You'll need
                to sign in again to access your dashboard.
              </p>

              <div className="flex gap-4 w-full">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors border border-white/10 active:scale-[0.98] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-3 px-4 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold transition-all shadow-lg shadow-red-500/20 active:scale-95 cursor-pointer"
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

export default Sidebar;
