"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Code, Home, Mail, Menu, User, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { name: "Home", href: "#home", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Skills", href: "#skills", icon: Code },
  { name: "Projects", href: "#projects", icon: Briefcase },
  { name: "Contact", href: "#contact", icon: Mail },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 1. Toggle Button - Gold Frame */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-8 right-8 z-[60] p-4 rounded-sm bg-[#050a08] border border-[#d4af37]/30 backdrop-blur-md text-[#d4af37] hover:border-[#d4af37] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-500"
      >
        <Menu size={24} strokeWidth={1} />
      </button>

      {/* 2. Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Darkened Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-sm"
            />

            {/* Side Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 h-full w-[340px] z-[80] bg-[#020403] border-l border-[#d4af37]/20 p-12 flex flex-col shadow-[-20px_0_60px_rgba(0,0,0,1)]"
            >
              {/* Close Button - Emerald Pop on Hover */}
              <button
                onClick={() => setIsOpen(false)}
                className="self-end mb-16 p-2 text-[#d4af37]/50 hover:text-emerald-400 hover:rotate-90 transition-all duration-500"
              >
                <X size={30} strokeWidth={1} />
              </button>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-12">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 + 0.3 }}
                    className="group flex items-center gap-6"
                  >
                    {/* The Gold Icon Box with Emerald Inner Glow */}
                    <div className="relative flex items-center justify-center w-12 h-12 border border-[#d4af37]/40 rounded-sm group-hover:border-emerald-500 transition-all duration-700 overflow-hidden">
                      {/* Background Reveal Effect */}
                      <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/10 transition-colors duration-700" />
                      
                      <link.icon 
                        size={18} 
                        className="text-[#d4af37] group-hover:text-emerald-400 group-hover:scale-110 transition-all duration-500 z-10" 
                        strokeWidth={1.5}
                      />
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#d4af37]/40 font-bold tracking-[0.4em] uppercase mb-1">
                        0{idx + 1}
                      </span>
                      <span className="text-sm font-bold uppercase tracking-[0.25em] text-[#d4af37] group-hover:text-white transition-colors duration-500">
                        {link.name}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </nav>

              {/* Footer - Gold Trim */}
              <div className="mt-auto pt-10">
                <div className="h-[1px] w-full bg-gradient-to-r from-[#d4af37]/40 to-transparent mb-8" />
                <p className="text-[9px] text-[#d4af37]/30 font-bold uppercase tracking-[0.5em] leading-relaxed">
                  Design & Engineering <br />
                  <span className="text-emerald-800">Saurav SR — MMXXV</span>
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}