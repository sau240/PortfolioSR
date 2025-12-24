"use client";

import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import { Edit2, ExternalLink, Github, Layout, Lock, LogOut, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techstack: "",
    github: "",
    live: "",
    imageUrl: "" 
  });

  const isAdmin = user?.email === "sv695177@gmail.com";

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setUser(user));
    fetchProjects();
    return () => unsub();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const colRef = collection(db, "portfolio", "_meta", "projects");
      const snap = await getDocs(colRef);
      setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) { console.error("Error fetching:", err); }
    setLoading(false);
  };

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) { console.error("Login failed:", error); }
  };

  const handleDelete = async (id) => {
    if (!isAdmin) return;
    if (confirm("Move this project to the void? (Permanent delete)")) {
      try {
        await deleteDoc(doc(db, "portfolio", "_meta", "projects", id));
        fetchProjects();
      } catch (err) { console.error(err); }
    }
  };

  const openEdit = (p) => {
    setEditingProject(p);
    setFormData({
      title: p.title || "",
      description: p.description || "",
      techstack: Array.isArray(p.techstack) ? p.techstack.join(", ") : p.techstack || "",
      github: p["github link"] || p.github || "",
      live: p.live || "",
      imageUrl: p.imageUrl || ""
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    const data = {
      title: formData.title,
      description: formData.description,
      techstack: formData.techstack,
      "github link": formData.github,
      live: formData.live,
      imageUrl: formData.imageUrl 
    };
    try {
      if (editingProject) {
        await updateDoc(doc(db, "portfolio", "_meta", "projects", editingProject.id), data);
      } else {
        await addDoc(collection(db, "portfolio", "_meta", "projects"), data);
      }
      setIsModalOpen(false);
      setFormData({ title: "", description: "", techstack: "", github: "", live: "", imageUrl: "" });
      fetchProjects();
    } catch (err) { console.error(err); }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#010403]">
      <div className="w-12 h-12 border-2 border-[#d4af37]/20 border-t-[#d4af37] rounded-full animate-spin" />
    </div>
  );

  return (
    <section id="projects" className="relative z-10 w-full min-h-screen bg-[#010403] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-emerald-500">Works</span>
          </h2>
          <div className="w-12 h-[1px] bg-[#d4af37]/50 mx-auto mt-6" />

          {isAdmin && (
            <motion.button 
              whileHover={{ scale: 1.05 }}
              onClick={() => { 
                setEditingProject(null); 
                setFormData({ title: "", description: "", techstack: "", github: "", live: "", imageUrl: "" }); 
                setIsModalOpen(true); 
              }}
              className="mt-10 flex items-center gap-2 mx-auto px-6 py-2 border border-[#d4af37]/30 text-[#d4af37] text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-[#d4af37]/5 transition-all"
            >
              <Plus size={16} /> Archive New Project
            </motion.button>
          )}
        </div>

        <div className="space-y-40">
          {projects.map((project, index) => {
            const stack = Array.isArray(project.techstack) ? project.techstack : (project.techstack || "").split(",");
            return (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col ${index % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 lg:gap-20 items-center`}
              >
                {/* Visual Image Container */}
                <div className="w-full lg:w-3/5 group relative">
                  <div className="absolute -inset-2 bg-emerald-500/10 rounded-sm blur-2xl opacity-0 group-hover:opacity-100 transition duration-700" />
                  <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-white/5 bg-zinc-900 shadow-2xl">
                    {project.imageUrl ? (
                      <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-zinc-950">
                        <Layout size={60} className="text-zinc-800" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-[#010403]/40 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                </div>

                {/* Info Container */}
                <div className="w-full lg:w-2/5 space-y-6">
                  <div className="space-y-2 text-left">
                    <p className="text-[10px] text-emerald-500 font-bold tracking-[0.3em] uppercase">Project 0{index + 1}</p>
                    <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{project.title}</h3>
                  </div>

                  <p className="text-zinc-400 leading-relaxed text-sm font-light text-left">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {stack.map((tech, i) => (
                      <span key={i} className="text-[10px] font-bold tracking-widest uppercase text-zinc-500 border-b border-zinc-800 pb-1">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-8 pt-6">
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                      <ExternalLink size={14} className="text-emerald-500" /> 
                      <span className="group-hover:text-emerald-400 transition-colors">Access Live</span>
                    </a>
                    <a href={project["github link"] || project.github} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                      <Github size={14} className="text-[#d4af37]" /> 
                      <span className="group-hover:text-[#d4af37] transition-colors">Source Code</span>
                    </a>
                  </div>

                  {isAdmin && (
                    <div className="flex gap-4 mt-8 pt-8 border-t border-white/5">
                      <button onClick={() => openEdit(project)} className="p-2 text-zinc-500 hover:text-emerald-400 transition-colors"><Edit2 size={16} /></button>
                      <button onClick={() => handleDelete(project.id)} className="p-2 text-zinc-500 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Luxury Admin Button */}
      <button 
        onClick={user ? () => signOut(auth) : handleLogin}
        className="fixed bottom-8 right-8 p-4 rounded-sm bg-zinc-900/80 border border-white/5 backdrop-blur-md text-[#d4af37] z-50 shadow-2xl hover:border-[#d4af37]/50 transition-all"
      >
        {user ? <LogOut size={18} /> : <Lock size={18} />}
      </button>

      {/* Modal - Aligned with Theme */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="bg-[#050a08] border border-[#d4af37]/20 p-10 rounded-sm w-full max-w-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-[10px] font-bold text-white uppercase tracking-[0.3em]">Project Manifest</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white"><X size={24} /></button>
              </div>
              <form onSubmit={handleSave} className="space-y-6 text-left">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold">Screenshot URL</label>
                  <input className="w-full bg-zinc-950 border border-white/10 rounded-sm p-4 text-xs text-white focus:border-emerald-500 outline-none" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#d4af37] font-bold">Title</label>
                    <input required className="w-full bg-zinc-950 border border-white/10 rounded-sm p-4 text-xs text-white focus:border-[#d4af37] outline-none" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#d4af37] font-bold">Stack (CSV)</label>
                    <input required className="w-full bg-zinc-950 border border-white/10 rounded-sm p-4 text-xs text-white focus:border-[#d4af37] outline-none" value={formData.techstack} onChange={e => setFormData({...formData, techstack: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Description</label>
                  <textarea required rows={4} className="w-full bg-zinc-950 border border-white/10 rounded-sm p-4 text-xs text-white focus:border-emerald-500 outline-none resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">GitHub</label>
                    <input className="w-full bg-zinc-950 border border-white/10 rounded-sm p-4 text-xs text-white focus:border-emerald-500 outline-none" value={formData.github} onChange={e => setFormData({...formData, github: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Live</label>
                    <input className="w-full bg-zinc-950 border border-white/10 rounded-sm p-4 text-xs text-white focus:border-emerald-500 outline-none" value={formData.live} onChange={e => setFormData({...formData, live: e.target.value})} />
                  </div>
                </div>
                <button type="submit" className="w-full py-4 bg-[#d4af37] hover:bg-[#b8952d] text-[#010403] rounded-sm font-bold uppercase tracking-widest text-[10px] mt-4 transition-all">
                  {editingProject ? "Update Entry" : "Commit to Archive"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}