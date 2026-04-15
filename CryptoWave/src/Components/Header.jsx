import { useState, useEffect } from "react";
import axios from "axios";
import crptoDp from "../assets/cryptoDP.jpeg";

const Header = () => {
  const [marketData, setMarketData] = useState({ change: 0, loading: true });
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchMarketStatus = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/global",
        );
        const changePercentage =
          response.data.data.market_cap_change_percentage_24h_usd;
        setMarketData({
          change: changePercentage.toFixed(2),
          loading: false,
        });
      } catch (error) {
        console.error("Error fetching market data:", error);
        setMarketData({ change: 0, loading: false });
      }
    };

    fetchMarketStatus();
    const interval = setInterval(fetchMarketStatus, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-[#1f2937] bg-[#0b0e14]/50 backdrop-blur-md sticky top-0 z-40">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-white tracking-tight">
          Dashboard
        </h1>
        {marketData.loading ? (
          <p className="text-[11px] text-gray-500 animate-pulse uppercase tracking-widest font-semibold">
            Fetching Market Stats...
          </p>
        ) : (
          <p
            className={`text-[11px] uppercase tracking-widest font-bold flex items-center gap-1 ${
              marketData.change >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
            Market is {marketData.change >= 0 ? "up" : "down"}{" "}
            {Math.abs(marketData.change)}% today
          </p>
        )}
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 pl-2 group cursor-pointer active:scale-95 transition-transform">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-white leading-none mb-1 group-hover:text-[#97a9ff] transition-colors">
              {user?.name || "Crypto User"}
            </p>
            <p className="text-[11px] text-gray-500 leading-none">
              {user?.email}
            </p>
          </div>

          <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-[#97a9ff] to-purple-500 shadow-lg shadow-[#97a9ff20]">
            <img
              src={user?.picture || crptoDp}
              alt="profile"
              className="w-10 h-10 rounded-full border-2 border-[#0b0e14] object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
