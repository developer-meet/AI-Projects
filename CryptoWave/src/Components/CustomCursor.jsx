import { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    // 1. Center the cursor div on the mouse point using GSAP (removes CSS conflict)
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    // 2. Initialize quickTo OUTSIDE the mousemove function for performance
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power3" });

    const onMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div
      ref={cursorRef}
      id="main-cursor"
      // Removed -translate-x-1/2 and changed color to Hacker Green
      className="custom-cursor fixed top-0 left-0 w-5 h-5 bg-[#00FF41] rounded-full pointer-events-none z-[9999] shadow-[0_0_15px_#00FF41]"
    />
  );
};

export default CustomCursor;
