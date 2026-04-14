import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import crptoDp from "../assets/cryptoDP.jpeg";
import Sidebar from "../Components/Sidebar";

const Dashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || !user.isLoggedIn) {
      navigate("/");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logout Successful");
    navigate("/");
  };

  return (
    <div className="flex">
      <div className="w-[300px] bg-[#11151C]">
        <Sidebar />
      </div>
      <div className="flex-1">
        <div className="min-h-screen h-ful bg-[#0B0E14]"></div>
      </div>
    </div>
  );
};

export default Dashboard;
