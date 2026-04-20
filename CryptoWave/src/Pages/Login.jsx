import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter email!");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Enter a valid email");
      return;
    }

    if (!password) {
      toast.error("Please enter password!");
      return;
    }

    if (!repeatPassword) {
      toast.error("Please repeat password!");
      return;
    }

    if (password == email) {
      toast.error("Email and Passwords are same, Please Change!");
      return;
    }

    if (password !== repeatPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        email: email,
        isLoggedIn: true,
      }),
    );

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Login successful 🚀");
      navigate("/dashboard");
    }, 500);

    navigate("/dashboard");
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          },
        );

        const userData = await res.json();
        console.log(userData);

        localStorage.setItem(
          "user",
          JSON.stringify({
            id: userData.sub,
            name: userData.name,
            email: userData.email,
            picture: userData.picture,
            isLoggedIn: true,
          }),
        );

        toast.success("Google Login Successful 🚀");
        navigate("/dashboard");
      } catch (error) {
        toast.error("Failed to fetch user data");
      }
    },

    onError: () => {
      toast.error("Google Login Failed ❌");
    },
  });

  return (
    <>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <div className="bg-[#0B0E14] text-[white] min-h-screen w-full flex flex-col justify-between items-center p-[30px] gap-[100px]">
        <div className="flex justify-center items-center gap-3.75">
          <i
            className="fa-solid fa-water text-[30px]"
            style={{ color: "#97a9ff" }}
          ></i>
          <p className="text-[#97a9ff] font-bold text-[30px]">CryptoWave</p>
        </div>
        <div className=" w-full">
          <form
            action=""
            onSubmit={handleSubmit}
            className="w-[50%] mx-auto p-[30px] rounded-2xl bg-[rgba(255,255,255,0.05)] backdrop-blur-[12px] border-[1px] border-[rgba(255,255,255,0.1)]  [box-shadow:0_10px_40px_rgba(0,_0,_0,_0.4)] max-sm:w-[100%] max-sm:p-[25px]:"
          >
            <p className="text-[24px] mb-[25px]">Login</p>

            <div className="flex flex-col gap-[20px] mb-[20px]">
              <label htmlFor="" className="">
                <p className="text-[14px]">Your Email:</p>
                <input
                  className="w-full px-[5px] py-[10px] bg-transparent border-b-[1px] border-[#555] text-[white] text-[15px] outline-none [transition:0.3s] focus:border-[#8ea2ff]"
                  placeholder="Enter Your email"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className="relative">
                <p>Password:</p>
                <input
                  className="w-full px-[5px] py-[10px] bg-transparent border-b-[1px] border-[#555] text-white text-[15px] outline-none focus:border-[#8ea2ff]"
                  placeholder="Enter Your password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <span
                  className="absolute right-[10px] top-[35px] cursor-pointer text-[#aaa]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </label>
              <label className="relative">
                <p>Repeat Password:</p>

                <input
                  className="w-full px-[5px] py-[10px] bg-transparent border-b-[1px] border-[#555] text-white text-[15px] outline-none focus:border-[#8ea2ff]"
                  placeholder="Repeat password"
                  type={showRepeatPassword ? "text" : "password"}
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />

                <span
                  className="absolute right-[10px] top-[35px] cursor-pointer text-[#aaa]"
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                >
                  {showRepeatPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </label>
            </div>

            <div className="my-[30px]">
              <button
                type="submit"
                className="w-full p-[10px] rounded-[10px] border-[none] bg-[linear-gradient(90deg,_#7f8cff,_#9aa7ff)] text-[white] text-[14px] cursor-pointer flex items-center justify-center gap-[10px] [transition:0.3s] hover:-translate-y-0.5 hover:[box-shadow:0_5px_15px_rgba(127,140,255,0.4)]"
              >
                Submit
              </button>
            </div>

            <div className="my-[30px] flex items-center px-[10px]">
              <div className="flex-[1] h-px bg-[#444]"></div>
              <p className="px-[20px] text-[#888]">or</p>
              <div className="flex-[1] h-px bg-[#444]"></div>
            </div>

            <div className="">
              <button
                type="button"
                onClick={() => googleLogin()}
                className="w-full p-[10px] rounded-[10px] border-[none] bg-[linear-gradient(90deg,_#7f8cff,_#9aa7ff)] text-[white] text-[14px] cursor-pointer flex items-center justify-center gap-[10px] [transition:0.3s] hover:-translate-y-0.5 hover:[box-shadow:0_5px_15px_rgba(127,140,255,0.4)]"
              >
                <FcGoogle className="text-[30px]" />
                Sign in with Google
              </button>
            </div>
          </form>
        </div>
        <div>
          <p className="text-[#676767]">
            © 2026 CryptoWave. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
