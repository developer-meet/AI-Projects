import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";

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
      <div className="flex-1 min-h-screen h-full bg-[#0B0E14]">
        <Header />
        <div className=""></div>
      </div>
    </div>
  );
};

export default Dashboard;
