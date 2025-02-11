"use client";
import { useRef, Suspense } from "react";
import Earth from "../components/Earth";
import TextContent from "../components/TextContent";
import { useScroll, useTransform, motion } from "framer-motion";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Hold section in place while model is animating
  const translateY = useTransform(
    scrollYProgress,
    [0, 0.7, 1], // Delay movement until progress reaches ~70%
    ["0vh", "0vh", "-100vh"]
  );

  // Radial gradient background (luxurious feel)
  const gradientBackground = {
    backgroundImage:
      "radial-gradient(circle, rgba(5, 5, 10, 0.98) 10%, rgba(8, 8, 20, 0.95) 30%, rgba(12, 12, 35, 0.9) 60%, rgba(15, 20, 50, 0.85) 85%, rgba(0, 20, 110, 0.8) 100%)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  // Glassmorphism effect applied to sections
  const glassStyle = {
    background: "rgba(255, 255, 255, 0.1)", // Semi-transparent
    backdropFilter: "blur(15px)", // Frosted glass effect
    WebkitBackdropFilter: "blur(15px)", // Safari support
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    padding: "20px",
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div ref={containerRef} style={{ height: "300vh", ...gradientBackground }}>
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          y: translateY,
        }}
      >
        <section style={glassStyle}>
          <Suspense fallback={null}>
            <Earth progress={scrollYProgress} />
            <TextContent progress={scrollYProgress} />
          </Suspense>
        </section>
      </motion.div>
    </div>
  );
}