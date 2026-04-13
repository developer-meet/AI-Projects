import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import crptoDp from "../assets/cryptoDP.jpeg";

const Dashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || !user.isLoggedIn) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white flex flex-col items-center justify-center gap-5">
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <h1 className="text-2xl font-bold">Welcome {user?.name} 👋</h1>

      <img
        src={user?.picture || crptoDp}
        alt="profile"
        className="w-[100px] h-[100px] rounded-full border-2 border-[#8ea2ff]"
      />

      <p>Email: {user?.email}</p>

      <button
        onClick={() => {
          localStorage.removeItem("user");
          toast.success("Logout Successful");
          navigate("/");
        }}
        className="mt-5 px-6 py-2 bg-red-500 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
