import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CustomCursor from "../Components/CustomCursor";

const NotFound = () => {
  const navigate = useNavigate();
  const container = useRef();
  const canvasRef = useRef();

  const { contextSafe } = useGSAP({ scope: container });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(2, 2, 2, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00FF41";
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const onWrapperEnter = contextSafe(() => {
    gsap.to(".custom-cursor", { scale: 3.5, backgroundColor: "#00FF41", mixBlendMode: "normal", boxShadow: "0 0 20px #00FF41" });
    gsap.to(".glitch-404", { skewX: 20, duration: 0.1, repeat: -1, yoyo: true });
    gsap.to(".reveal-item", { opacity: 1, y: 0, stagger: 0.1, duration: 0.4 });
    gsap.to(".home-btn", { opacity: 1, pointerEvents: "auto", y: 0, duration: 0.4 });
  });

  const onWrapperLeave = contextSafe(() => {
    gsap.to(".custom-cursor", { scale: 1, boxShadow: "none" });
    gsap.to(".glitch-404", { skewX: 0, duration: 0.1 });
  });

  return (
    <div ref={container} className="bg-[#020202] text-[#00FF41] min-h-screen w-full flex flex-col justify-center items-center overflow-hidden cursor-none relative font-mono">
      <CustomCursor />
      <canvas ref={canvasRef} className="absolute inset-0 opacity-20 pointer-events-none" />

      <div className="relative z-20 flex flex-col items-center" onMouseEnter={onWrapperEnter} onMouseLeave={onWrapperLeave}>
        <h1 className="glitch-404 text-[240px] font-black leading-none tracking-tighter">404</h1>

        <div className="text-center mt-[-20px]">
          <div className="space-y-2 mb-8">
            <p className="reveal-item opacity-0">&gt; STATUS: <span className="text-white">NODE_NOT_FOUND</span></p>
            <p className="reveal-item opacity-0">&gt; ERROR_CODE: <span className="text-white">0x00000404</span></p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="home-btn opacity-0 pointer-events-none px-8 py-3 border border-[#00FF41] bg-[#00FF41]/10 text-[#00FF41] uppercase tracking-[0.2em] font-bold relative overflow-hidden group hover:bg-[#00FF41] hover:text-black transition-all duration-300"
          >
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-100" />
            <span className="relative z-10">Terminal.Abort()</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;