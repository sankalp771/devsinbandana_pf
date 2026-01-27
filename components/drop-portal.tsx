"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Code, Send, ShieldAlert } from "lucide-react";

interface DropPortalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function DropPortal({ isOpen, onClose, onSuccess }: DropPortalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        day: Math.floor((new Date().getTime() - new Date('2026-01-01').getTime()) / (1000 * 60 * 60 * 24)) + 1,
        date: new Date().toISOString().split('T')[0],
        topic: "",
        description: "",
        stack: "",
        commitMsg: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/drops", {
                method: "POST",
                body: JSON.stringify({
                    ...formData,
                    stack: formData.stack.split(",").map(s => s.trim())
                })
            });
            if (res.ok) {
                onSuccess();
                onClose();
                setFormData({
                    day: Math.floor((new Date().getTime() - new Date('2026-01-01').getTime()) / (1000 * 60 * 60 * 24)) + 1,
                    date: new Date().toISOString().split('T')[0],
                    topic: "",
                    description: "",
                    stack: "",
                    commitMsg: ""
                });
            }
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-2xl bg-asphalt border-2 border-neon-green p-8 rounded-sm shadow-[8px_8px_0px_var(--color-neon-green)] overflow-y-auto max-h-[90vh]"
                    >
                        <button onClick={onClose} className="absolute top-4 right-4 text-street-gray hover:text-white transition-colors">
                            <X size={24} />
                        </button>

                        <div className="mb-6 flex justify-between items-end gap-4">
                            <div>
                                <h2 className="text-3xl font-glitch text-white">MANUAL_LEDGER_ENTRY</h2>
                                <p className="text-xs font-mono text-neon-green mt-1">{"// OVERRIDE_IN_PROGRESS"}</p>
                            </div>
                            <div className="flex flex-col items-end">
                                <label className="text-[10px] text-street-gray uppercase mb-1">Entry_Day</label>
                                <input
                                    type="number"
                                    value={formData.day}
                                    onChange={e => setFormData({ ...formData, day: parseInt(e.target.value) || 0 })}
                                    className="w-16 bg-black border border-neon-green/30 p-2 text-center text-neon-green font-glitch outline-none focus:border-neon-green"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-sm">
                                <div>
                                    <label className="block text-street-gray mb-1 text-[10px] uppercase">Target_Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-2.5 text-neon-green" size={14} />
                                        <input
                                            type="date"
                                            value={formData.date}
                                            onChange={e => setFormData({ ...formData, date: e.target.value })}
                                            className="w-full bg-black border border-street-gray/30 p-2 pl-10 text-white outline-none focus:border-neon-green transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-street-gray mb-1 text-[10px] uppercase">Topic_Header</label>
                                    <input
                                        placeholder="e.g., Schema Migration"
                                        value={formData.topic}
                                        onChange={e => setFormData({ ...formData, topic: e.target.value })}
                                        className="w-full bg-black border border-street-gray/30 p-2 text-white outline-none focus:border-neon-green transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-street-gray mb-1 text-[10px] uppercase">Drop_Summary</label>
                                    <textarea
                                        rows={3}
                                        placeholder="Break down what went down..."
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full bg-black border border-street-gray/30 p-2 text-white outline-none focus:border-neon-green transition-colors resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-street-gray mb-1 text-[10px] uppercase">Stack_List (Comma separated)</label>
                                    <input
                                        placeholder="Next.js, Prisma, AI"
                                        value={formData.stack}
                                        onChange={e => setFormData({ ...formData, stack: e.target.value })}
                                        className="w-full bg-black border border-street-gray/30 p-2 text-white outline-none focus:border-neon-green transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-street-gray mb-1 text-[10px] uppercase">Commit_Hash / Msg</label>
                                    <div className="relative">
                                        <Code className="absolute left-3 top-2.5 text-spray-pink" size={14} />
                                        <input
                                            placeholder="feat: backend architecture"
                                            value={formData.commitMsg}
                                            onChange={e => setFormData({ ...formData, commitMsg: e.target.value })}
                                            className="w-full bg-black border border-street-gray/30 p-2 pl-10 text-white outline-none focus:border-neon-green transition-colors"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-neon-green text-black font-bold py-3 flex items-center justify-center gap-2 hover:bg-white transition-colors"
                                >
                                    {loading ? "LOCKING_IN..." : "AUTHORIZE_DROP"} <Send size={16} />
                                </button>
                            </form>

                            {/* Live Preview */}
                            <div className="hidden md:block">
                                <label className="block text-street-gray mb-4 text-[10px] uppercase tracking-widest text-center border-b border-street-gray/20 pb-2">Live_Visual_Preview</label>
                                <div className="border border-street-gray/20 p-4 bg-concrete/10 rounded-sm">
                                    <div className="flex gap-4 mb-4">
                                        <div className="w-10 h-10 bg-concrete border border-street-gray flex items-center justify-center text-xs font-glitch">{formData.day}</div>
                                        <div>
                                            <div className="text-white font-bold text-sm">{formData.topic || "TOPIC_PLACEHOLDER"}</div>
                                            <div className="text-[10px] text-street-gray font-mono uppercase">{formData.date}</div>
                                        </div>
                                    </div>
                                    <p className="text-street-gray text-xs font-mono leading-relaxed mb-4 min-h-[60px]">
                                        {formData.description || "The grind details will appear here once you start typing..."}
                                    </p>
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {(formData.stack || "TAGS").split(",").map((t, i) => (
                                            <span key={i} className="text-[8px] bg-neon-green text-black px-1 font-bold uppercase">{t.trim() || "?"}</span>
                                        ))}
                                    </div>
                                    <div className="text-[10px] text-spray-pink font-mono">&gt; {formData.commitMsg || "commit: ???"}</div>
                                </div>
                                <div className="mt-8 p-4 border border-spray-cyan/30 text-spray-cyan text-[10px] font-mono leading-tight">
                                    <ShieldAlert size={14} className="mb-2" />
                                    CONFIRM EVERYTHING. ONCE YOU CLICK &apos;AUTHORIZE&apos;, IT&apos;S STORED PERMANENTLY IN THE UNDERGROUND LEDGER.
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

