import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { FaPlus, FaCheck } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const [coins, setCoins] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || !user.isLoggedIn) {
      navigate("/");
    }
    fetchCoins();
    // Load existing watchlist from localstorage
    const savedWatchlist = JSON.parse(
      localStorage.getItem("watchlist") || "[]",
    );
    setWatchlist(savedWatchlist);
  }, []);

  const fetchCoins = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=24h",
      );
      const data = await res.json();
      setCoins(data);
    } catch (err) {
      console.error("Error fetching coins:", err);
    }
  };

  const addToWatchlist = (coin) => {
    const savedWatchlist = JSON.parse(
      localStorage.getItem("watchlist") || "[]",
    );

    const isAlreadyThere = savedWatchlist.find((c) => c.id === coin.id);

    if (isAlreadyThere) {
      toast.error(`${coin.name} is already in watchlist`);
      return;
    }

    const newWatchlist = [...watchlist, coin];
    setWatchlist(newWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(newWatchlist));
    toast.success(`${coin.name} added to Watchlist!`);
  };

  return (
    <div className="flex text-white">
      <Toaster />
      <div className="w-[300px] h-screen sticky top-0 bg-[#11151C]">
        <Sidebar />
      </div>
      <div className="flex-1 min-h-screen bg-[#0B0E14]">
        <Header title="Market Dashboard" />
        <div className="p-8">
          <div className="overflow-x-auto bg-[#111827]/30 rounded-2xl border border-white/5 shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-white/5">
                  <th className="p-5">#</th>
                  <th className="p-5">Name</th>
                  <th className="p-5">Price</th>
                  <th className="p-5">24h Change</th>
                  <th className="p-5">Market Cap</th>
                  <th className="p-5">Last 7 Days</th>
                  <th className="p-5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {coins.map((coin, index) => (
                  <tr
                    key={coin.id}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="p-5 text-gray-500 text-sm">{index + 1}</td>
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="flex flex-col">
                          <span className="font-bold text-sm">{coin.name}</span>
                          <span className="text-[10px] text-gray-500 uppercase tracking-widest">
                            {coin.symbol}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-5 font-medium text-sm">
                      ${coin.current_price.toLocaleString()}
                    </td>
                    <td
                      className={`p-5 text-sm font-bold ${coin.price_change_percentage_24h > 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {coin.price_change_percentage_24h?.toFixed(2)}%
                    </td>
                    <td className="p-5 text-gray-400 text-sm">
                      ${coin.market_cap.toLocaleString()}
                    </td>
                    <td className="p-5 w-[120px]">
                      {/* Simplified SVG Mini Graph */}
                      <svg width="100" height="30" viewBox="0 0 100 30">
                        <polyline
                          fill="none"
                          stroke={
                            coin.price_change_percentage_24h > 0
                              ? "#4ade80"
                              : "#f87171"
                          }
                          strokeWidth="2"
                          points={coin.sparkline_in_7d.price
                            .map(
                              (p, i) =>
                                `${i * (100 / 168)},${30 - ((p - Math.min(...coin.sparkline_in_7d.price)) / (Math.max(...coin.sparkline_in_7d.price) - Math.min(...coin.sparkline_in_7d.price))) * 30}`,
                            )
                            .join(" ")}
                        />
                      </svg>
                    </td>
                    <td className="p-5 text-center">
                      <button
                        onClick={() => addToWatchlist(coin)}
                        className="p-2 rounded-lg bg-[#97a9ff10] text-[#97a9ff] hover:bg-[#97a9ff] hover:text-black transition-all cursor-pointer"
                      >
                        {watchlist.some((c) => c.id === coin.id) ? (
                          <FaCheck />
                        ) : (
                          <FaPlus />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full text-center pt-8">
            <p className="text-[#676767]">
              © 2026 CryptoWave. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
