"use client";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, User } from "lucide-react";
import { useState } from "react";
import { db } from "../../firebase";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await addDoc(collection(db, "portfolio", "_meta", "messages"), {
        ...formData,
        sentAt: serverTimestamp(),
      });
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="relative z-10 py-24 bg-[#010403]">
      <div className="max-w-4xl mx-auto px-6">
        {/* Professional Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-white tracking-tight"
          >
            Get In <span className="text-gradient-primary">Touch</span>
          </motion.h2>
          <div className="w-12 h-1 bg-emerald-600 mx-auto mt-6" /> {/* Minimalist Accent Line */}
          <p className="text-zinc-500 mt-6 font-medium tracking-[0.2em] uppercase text-[10px]">
            Inquiries & Collaborations
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-12 rounded-sm border-white/5"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name Input */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.2em] ml-1">
                  Full Name
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" size={16} />
                  <input
                    required
                    type="text"
                    className="w-full bg-zinc-950/50 border border-white/5 rounded-sm p-4 pl-12 text-sm text-white focus:border-emerald-500/50 outline-none transition-all placeholder:text-zinc-700"
                    placeholder="e.g. Alexander Pierce"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.2em] ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" size={16} />
                  <input
                    required
                    type="email"
                    className="w-full bg-zinc-950/50 border border-white/5 rounded-sm p-4 pl-12 text-sm text-white focus:border-emerald-500/50 outline-none transition-all placeholder:text-zinc-700"
                    placeholder="email@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.2em] ml-1">
                Project Details
              </label>
              <div className="relative group">
                <MessageSquare className="absolute left-4 top-5 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" size={16} />
                <textarea
                  required
                  rows={4}
                  className="w-full bg-zinc-950/50 border border-white/5 rounded-sm p-4 pl-12 text-sm text-white focus:border-emerald-500/50 outline-none resize-none transition-all placeholder:text-zinc-700"
                  placeholder="Describe your objectives..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
            </div>

            {/* Professional Submit Button */}
            <button
              disabled={status === "sending"}
              type="submit"
              className={`w-full py-4 rounded-sm font-semibold tracking-[0.15em] uppercase text-xs flex items-center justify-center gap-3 transition-all duration-500 ${
                status === "success" 
                ? "bg-emerald-500 text-white" 
                : "bg-emerald-800/80 hover:bg-emerald-700 text-emerald-50 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] active:scale-[0.99]"
              }`}
            >
              {status === "sending" ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : status === "success" ? (
                "Acknowledgement Received"
              ) : (
                <>
                  <Send size={14} /> Initialize Message
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}