import { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { FaTrash, FaExclamationTriangle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [coinToDelete, setCoinToDelete] = useState(null);

  // 1. Fetch Fresh Data Function
  const fetchFreshData = async () => {
    const savedData = JSON.parse(localStorage.getItem("watchlist") || "[]");
    if (savedData.length === 0) {
      setWatchlist([]);
      setLoading(false);
      return;
    }

    // Join IDs by comma for the API: "bitcoin,ethereum,tether"
    const ids = savedData.map((coin) => coin.id).join(",");

    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=true&price_change_percentage=24h`,
      );
      const freshData = await res.json();

      // Update state and storage with latest prices
      setWatchlist(freshData);
      localStorage.setItem("watchlist", JSON.stringify(freshData));
    } catch (err) {
      console.error("Error updating watchlist prices:", err);
      // Fallback to old data if API fails
      setWatchlist(savedData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFreshData();
  }, []);

  const confirmDelete = (coin) => {
    setCoinToDelete(coin);
    setShowDeleteModal(true);
  };

  const removeCoin = () => {
    if (!coinToDelete) return;
    const filtered = watchlist.filter((c) => c.id !== coinToDelete.id);
    setWatchlist(filtered);
    localStorage.setItem("watchlist", JSON.stringify(filtered));
    toast.success(`${coinToDelete.name} removed`);
    setShowDeleteModal(false);
    setCoinToDelete(null);
  };

  return (
    <div className="flex text-white bg-[#0B0E14] min-h-screen">
      <Toaster />
      <div className="w-[300px] h-screen sticky top-0 bg-[#11151C] hidden lg:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Header title="My Watchlist" />
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Your Watchlist</h2>
            <button
              onClick={fetchFreshData}
              className="text-xs bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-all cursor-pointer"
            >
              {loading ? "Updating..." : "Refresh Prices"}
            </button>
          </div>

          {loading ? (
            <div className="text-gray-500 text-center py-20">
              Loading latest prices...
            </div>
          ) : watchlist.length === 0 ? (
            <div className="text-gray-500 text-center py-20 bg-[#111827]/20 rounded-2xl border border-dashed border-white/10">
              No coins added yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {watchlist.map((coin) => (
                <div
                  key={coin.id}
                  className="chasing-border-card relative p-[1.5px] rounded-2xl overflow-hidden group transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="relative h-full bg-[#111827] p-6 rounded-2xl z-10">
                    <button
                      onClick={() => confirmDelete(coin)}
                      className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors z-20 cursor-pointer p-1"
                    >
                      <FaTrash size={14} />
                    </button>

                    <div className="flex items-center gap-4 mb-6">
                      <img
                        src={coin.image}
                        className="w-12 h-12"
                        alt={coin.name}
                      />
                      <div>
                        <h3 className="font-bold text-lg uppercase tracking-tight leading-none mb-1">
                          {coin.name}
                        </h3>
                        <span className="text-[10px] text-gray-500 uppercase font-mono tracking-widest bg-white/5 px-2 py-0.5 rounded">
                          {coin.symbol}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">
                          Market Cap
                        </p>
                        <p className="text-sm font-medium">
                          ${coin.market_cap?.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">
                          24h Change
                        </p>
                        <p
                          className={`text-sm font-bold ${coin.price_change_percentage_24h > 0 ? "text-green-400" : "text-red-400"}`}
                        >
                          {coin.price_change_percentage_24h?.toFixed(2)}%
                        </p>
                      </div>
                    </div>

                    <div className="mb-6 h-12 w-full opacity-80">
                      {coin.sparkline_in_7d?.price && (
                        <svg
                          width="100%"
                          height="100%"
                          viewBox="0 0 100 30"
                          preserveAspectRatio="none"
                        >
                          <polyline
                            fill="none"
                            stroke={
                              coin.price_change_percentage_24h > 0
                                ? "#4ade80"
                                : "#f87171"
                            }
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            points={coin.sparkline_in_7d.price
                              .map((p, i) => {
                                const min = Math.min(
                                  ...coin.sparkline_in_7d.price,
                                );
                                const max = Math.max(
                                  ...coin.sparkline_in_7d.price,
                                );
                                return `${i * (100 / (coin.sparkline_in_7d.price.length - 1))},${30 - ((p - min) / (max - min)) * 30}`;
                              })
                              .join(" ")}
                          />
                        </svg>
                      )}
                    </div>

                    <div className="flex justify-between items-end pt-4 border-t border-white/5">
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">
                          Price USD
                        </p>
                        <p className="text-2xl font-black text-[#97a9ff]">
                          ${coin.current_price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal (Hidden logic is same as yours) */}
      {showDeleteModal && (
        /* ... same modal code as your previous message ... */
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="bg-[#111827] border border-white/10 p-8 rounded-3xl w-full max-w-[400px] text-center shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="bg-red-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaExclamationTriangle className="text-red-500 text-2xl" />
            </div>
            <h2 className="text-white text-xl font-bold mb-2">
              Remove {coinToDelete?.name}?
            </h2>
            <p className="text-gray-400 mb-8">
              Are you sure you want to delete this crypto from your list?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 bg-white/5 rounded-xl text-white font-bold cursor-pointer hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={removeCoin}
                className="flex-1 py-3 bg-red-500 rounded-xl text-white font-bold cursor-pointer hover:bg-red-600 transition-all"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
