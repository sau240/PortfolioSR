"use client";

import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { Briefcase, Code2, Cpu, Database, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

// 1. IMPORT YOUR IMAGE HERE
import profileImg from "../image/Gemini_Generated_Image_8ozsl68ozsl68ozs.png";

export default function About() {
  const [bio, setBio] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ref = doc(db, "portfolio", "about");
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setBio(snap.data().bio);
        }
      } catch {
        setBio("I build intelligent, scalable digital products where clean engineering meets real-world impact.");
      }
    };
    fetchData();
  }, []);

  return (
    <section
      id="about"
      className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center bg-[#010403] py-24 px-6 overflow-hidden"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-20 left-10 opacity-[0.03] select-none pointer-events-none">
        <h2 className="text-[12rem] font-bold text-white leading-none">ORIGIN</h2>
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20 z-10"
      >
        <p className="text-[10px] text-emerald-500 font-bold tracking-[0.5em] uppercase mb-4">The Narrative</p>
        <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-emerald-500">Me</span>
        </h2>
        <div className="h-[1px] w-12 bg-[#d4af37]/50 mx-auto mt-6" />
      </motion.div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
        
        {/* Visual Identity Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative group"
        >
          <div className="absolute -inset-4 bg-[#d4af37]/5 rounded-sm blur-3xl opacity-0 group-hover:opacity-100 transition duration-1000" />
          
          <div className="relative aspect-[4/5] rounded-sm border border-white/5 bg-zinc-900 overflow-hidden shadow-2xl">
            {/* 2. UPDATED IMAGE TAG */}
            <img 
              src={profileImg.src} // Use .src if using Next.js, or just profileImg if using standard React
              alt="Profile Aesthetic"
              className="w-full h-full object-cover grayscale brightness-50 contrast-125 group-hover:grayscale-0 group-hover:brightness-90 transition-all duration-1000 ease-in-out scale-110 group-hover:scale-100"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#010403] via-[#010403]/20 to-transparent" />
            
            <div className="absolute bottom-8 left-8 right-8">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles size={14} className="text-[#d4af37]" />
                <span className="text-[10px] text-white/50 tracking-[0.3em] uppercase font-bold">System Identity</span>
              </div>
              <p className="text-[#d4af37] font-mono text-lg tracking-wider">{"<Saurav />"}</p>
            </div>
          </div>
        </motion.div>

        {/* Content Block */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-10"
        >
          <div className="relative">
             <span className="absolute -top-8 -left-6 text-7xl text-white/5 font-serif select-none">“</span>
             <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-light first-letter:text-4xl first-letter:text-[#d4af37] first-letter:font-serif first-letter:mr-2">
               {bio || "I am an AI & Full-Stack Developer dedicated to synthesizing complex algorithms with elegant user interfaces. My work focuses on bridging the gap between high-performance backend logic and intuitive digital experiences."}
             </p>
          </div>

          {/* Luxury Skill Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Code2, title: "Full-Stack", desc: "Next.js, Tailwind, Flask" },
              { icon: Database, title: "Data & ML", desc: "Python, Pandas, ML Models" },
              { icon: Cpu, title: "Architecture", desc: "MERN Stack, Scalability" },
              { icon: Briefcase, title: "Freelance", desc: "Strategic Development" },
            ].map((item, i) => (
              <div
                key={i}
                className="group p-5 rounded-sm border border-white/5 bg-white/[0.02] hover:bg-emerald-500/[0.03] hover:border-emerald-500/30 transition-all duration-500"
              >
                <item.icon className="text-[#d4af37] group-hover:text-emerald-400 mb-3 transition-colors" size={20} strokeWidth={1.5} />
                <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-1">
                  {item.title}
                </h4>
                <p className="text-zinc-500 text-[10px] uppercase tracking-widest">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Group */}
          <div className="flex flex-wrap gap-6 pt-4">
            <motion.a
              href="#contact"
              whileHover={{ y: -2 }}
              className="px-10 py-4 bg-emerald-800 hover:bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-all shadow-xl"
            >
              Start a Project
            </motion.a>
            <motion.a
              href="/"
              whileHover={{ y: -2 }}
              className="px-10 py-4 border border-[#d4af37]/30 text-[#d4af37] text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#d4af37]/5 transition-all backdrop-blur-sm"
            >
              Return Home
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}