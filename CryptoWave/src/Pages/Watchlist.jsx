import Sidebar from "../Components/Sidebar";

const Watchlist = () => {
  return (
    <div>
      <div className="flex">
        <div className="w-[300px] bg-[#11151C]">
          <Sidebar />
        </div>
        <div className="flex-1">
          <div className="min-h-screen h-full bg-[#0B0E14] "></div>
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
