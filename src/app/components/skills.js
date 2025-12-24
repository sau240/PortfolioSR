"use client";

import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import { Cpu, Edit2, Globe, Layout, Plus, Terminal, Wrench, X } from "lucide-react";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";

const iconMap = {
  // Using consistent Emerald-500 for a professional, unified look
  frontend: <Layout className="text-emerald-500" size={20} />,
  backend: <Cpu className="text-emerald-500" size={20} />,
  aiml: <Terminal className="text-emerald-500" size={20} />,
  tools: <Wrench className="text-emerald-500" size={20} />,
};

export default function Skills() {
  const [skillGroups, setSkillGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [formData, setFormData] = useState({ id: "", skills: "" });

  const isAdmin = user?.email === "sv695177@gmail.com";

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setUser(user));
    fetchSkills();
    return () => unsub();
  }, []);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const colRef = collection(db, "portfolio", "_meta", "skills");
      const snap = await getDocs(colRef);
      const data = snap.docs.map(doc => ({
        id: doc.id,
        skillsList: Array.isArray(doc.data().title) ? doc.data().title : []
      }));
      setSkillGroups(data);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    const docId = formData.id.toLowerCase().replace(/\s+/g, '');
    const skillsArray = formData.skills.split(",").map(s => s.trim()).filter(s => s !== "");
    try {
      const docRef = doc(db, "portfolio", "_meta", "skills", docId);
      await setDoc(docRef, { title: skillsArray }, { merge: true });
      setIsModalOpen(false);
      fetchSkills();
    } catch (err) { alert("Error saving changes."); }
  };

  if (loading) return null;

  return (
    <section id="skills" className="relative z-10 py-24 bg-[#010403]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-white tracking-tight"
          >
            Technical <span className="text-gradient-primary">Stack</span>
          </motion.h2>
          <div className="w-12 h-1 bg-emerald-600 mx-auto mt-6" />
          
          {isAdmin && (
            <motion.button 
              whileHover={{ scale: 1.05 }}
              onClick={() => { setEditingGroup(null); setFormData({ id: "", skills: "" }); setIsModalOpen(true); }}
              className="mt-8 flex items-center gap-2 mx-auto px-6 py-2 border border-emerald-500/30 text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10 transition-all text-[10px] font-bold tracking-widest uppercase rounded-sm"
            >
              <Plus size={14} /> Add Category
            </motion.button>
          )}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map((group) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="group relative p-8 glass-card rounded-sm flex flex-col h-full"
            >
              {isAdmin && (
                <button 
                  onClick={() => {
                    setEditingGroup(group);
                    setFormData({ id: group.id, skills: group.skillsList.join(", ") });
                    setIsModalOpen(true);
                  }}
                  className="absolute top-4 right-4 p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 border border-white/10 rounded-sm text-zinc-400 hover:text-emerald-400"
                >
                  <Edit2 size={12} />
                </button>
              )}

              <div className="flex items-center gap-4 mb-8">
                <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-sm">
                  {iconMap[group.id] || <Globe className="text-emerald-500" size={20} />}
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">{group.id}</h3>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto">
                {group.skillsList.map((skill, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 bg-zinc-950 border border-white/5 rounded-sm text-[11px] font-medium text-zinc-400 group-hover:border-emerald-500/30 group-hover:text-emerald-200 transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Admin Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }} 
              className="bg-[#050a08] border border-emerald-500/20 p-8 rounded-sm w-full max-w-md shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em]">
                  {editingGroup ? 'Modify Category' : 'New Classification'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold ml-1">Identifier</label>
                  <input 
                    disabled={!!editingGroup}
                    placeholder="e.g., backend" 
                    className="w-full bg-zinc-950 border border-white/10 rounded-sm p-4 text-sm text-white focus:border-emerald-500 outline-none transition-all"
                    value={formData.id}
                    onChange={e => setFormData({...formData, id: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold ml-1">Skill Set (CSV)</label>
                  <textarea 
                    placeholder="Go, Rust, PostgreSQL..." 
                    rows={4}
                    className="w-full bg-zinc-950 border border-white/10 rounded-sm p-4 text-sm text-white focus:border-emerald-500 outline-none resize-none transition-all"
                    value={formData.skills}
                    onChange={e => setFormData({...formData, skills: e.target.value})}
                  />
                </div>

                <button type="submit" className="btn-primary w-full py-4 text-[10px] font-bold uppercase tracking-[0.2em]">
                  Apply Changes
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}