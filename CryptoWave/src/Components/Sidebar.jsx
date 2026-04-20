import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaStar, FaExclamationTriangle } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import LogoutModal from "./LogoutModal";

const Sidebar = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logout Successful");
    navigate("/");
  };
  return (
    <div className="sticky top-0 h-screen flex flex-col justify-between gap-16 border-r border-[#1f2937] p-5">
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

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default Sidebar;
