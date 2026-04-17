import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const GetStarted = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#0B0E14] text-[white] min-h-screen w-full flex flex-col justify-between items-center p-[30px] gap-[100px]">
      <div className="absolute">
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <div className="flex justify-center items-center gap-3.75">
        <i
          className="fa-solid fa-water text-[30px]"
          style={{ color: "#97a9ff" }}
        ></i>
        <p className="text-[#97a9ff] font-bold text-[30px]">CryptoWave</p>
      </div>
      <div>
        <h1 className="text-[60px]  font-semibold w-[80%] mx-auto bg-linear-to-b from-[#95a7ff] to-[#8ea1ff] bg-clip-text text-transparent text-center">
          Ride the Wave of <p>Future Finance</p>
        </h1>
        <p className="text-[#a9abb3] text-[20px] w-[65%] mx-auto mt-5 mb-[30px]  text-center">
          CryptoWave empowers you to securely buy, trade, and manage digital
          assets with real-time asset control.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="px-10 py-2 text-[black] rounded-full bg-linear-to-tr from-[#8198fe] to-[#4a6efe] cursor-pointer font-medium flex justify-center items-center mx-auto gap-2.5"
        >
          <p> GET STARTED</p>
          <i className="fa-solid fa-arrow-right" style={{ color: "#000" }}></i>
        </button>
      </div>
      <div>
        <p className="text-[#676767]">
          © 2026 CryptoWave. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default GetStarted;
