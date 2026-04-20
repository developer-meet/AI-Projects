import { FaExclamationTriangle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/40 backdrop-blur-[4px] transition-all">
      <div className="relative bg-[#111827]/80 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl w-[90%] max-w-[400px] transform transition-all scale-100 animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
        >
          <IoClose size={24} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="bg-red-500/20 p-4 rounded-full mb-4">
            <FaExclamationTriangle className="text-red-500 text-3xl" />
          </div>

          <h2 className="text-white text-xl font-bold mb-2">End Session?</h2>

          <p className="text-gray-400 mb-8">
            Are you sure you want to log out of{" "}
            <span className="text-[#97a9ff]">CryptoWave</span>? You'll need to
            sign in again to access your dashboard.
          </p>

          <div className="flex gap-4 w-full">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors border border-white/10 active:scale-[0.98] cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-3 px-4 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold transition-all shadow-lg shadow-red-500/20 active:scale-95 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
