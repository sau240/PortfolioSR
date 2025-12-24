"use client";

import { doc, getDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { db } from "../firebase";

// Components
import About from "./components/aboutme";
import Contact from "./components/contact";
import Projects from "./components/project";
import Skills from "./components/skills";

// Animations & Effects
import { loadSlim } from "@tsparticles/slim";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Particles from "react-tsparticles";

export default function Home() {
  const [about, setAbout] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ref = doc(db, "portfolio", "about");
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setAbout(snap.data().text);
        } else {
          setAbout("I craft high-performance digital experiences with ");
        }
      } catch (err) {
        setAbout("I craft high-performance digital experiences with ");
      }
    };
    fetchData();
  }, []);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <main className="w-full bg-[#010403]">
      <section id="home" className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* Particle Layer - The "Gold Dust" Effect */}
        <div className="absolute inset-0 z-0">
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
              fullScreen: { enable: false },
              fpsLimit: 120,
              particles: {
                number: { value: 40, density: { enable: true, area: 800 } },
                color: { value: "#d4af37" }, // Gold Color
                links: { 
                  enable: true, 
                  distance: 150, 
                  color: "#d4af37", 
                  opacity: 0.05, 
                  width: 1 
                },
                move: { 
                  enable: true, 
                  speed: 0.4, 
                  direction: "top", 
                  random: true, 
                  straight: false, 
                  outModes: "out" 
                },
                size: { value: { min: 1, max: 2 } },
                opacity: { value: { min: 0.1, max: 0.3 } },
              },
              interactivity: {
                events: { onHover: { enable: true, mode: "bubble" } },
                modes: { bubble: { size: 4, distance: 200, duration: 2, opacity: 0.6 } }
              },
            }}
            className="w-full h-full"
          />
          {/* Deep Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#010403]/50 to-[#010403]" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6 max-w-5xl">
          
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center gap-3 px-4 py-1.5 border border-[#d4af37]/20 rounded-full bg-[#d4af37]/5 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#d4af37]">
              Available for new projects
            </span>
          </motion.div>

          {/* Hero Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-9xl font-bold tracking-tighter text-white mb-8 leading-[0.9]"
          >
            Saurav <span className="text-[#d4af37]">SR</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-12"
          />

          {/* Typewriter Description */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl space-y-4"
          >
            <h2 className="text-xl md:text-2xl text-zinc-400 font-light tracking-wide italic font-serif">
              {about || "Architecting digital systems with "}
            </h2>
            
            <div className="text-2xl md:text-4xl font-bold tracking-tight text-white uppercase italic">
              <Typewriter
                words={["AI Precision.", "Full-Stack Mastery.", "Luxury Engineering."]}
                loop
                cursor
                cursorStyle="_"
                cursorColor="#d4af37"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-12 flex flex-col items-center gap-4"
          >
             <span className="text-[10px] uppercase tracking-[0.5em] text-zinc-500 rotate-90 mb-8">Scroll</span>
             <div className="w-[1px] h-12 bg-gradient-to-b from-[#d4af37] to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Page Sections */}
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}