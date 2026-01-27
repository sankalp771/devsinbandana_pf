"use client";

import { drops as fallbackDrops } from "@/lib/data";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Drop {
    day: number;
    topic: string;
    description: string;
    stack: string[];
    date: string;
    commit: string;
    commitMsg?: string;
    commit_msg?: string;
}

export function DailyDrop() {
    const [dbDrops, setDbDrops] = useState<Drop[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDrops() {
            try {
                const res = await fetch('/api/drops');
                if (!res.ok) throw new Error(`HTTP_${res.status}`);

                const contentType = res.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error("NOT_JSON_RESPONSE");
                }

                const data = await res.json();

                if (data && Array.isArray(data)) {
                    setDbDrops(data.map((d: Record<string, unknown>) => ({
                        ...(d as unknown as Drop),
                        commit: (d.commitMsg as string) || (d.commit_msg as string) || "initial_commit"
                    } as Drop)));
                }
            } catch (err) {
                console.error("Fetch error:", err);
                // Fallback is handled by the displayDrops logic automatically
            }
            setLoading(false);
        }
        fetchDrops();
    }, []);

    const displayDrops = dbDrops.length > 0 ? dbDrops : (fallbackDrops as unknown as Drop[]).sort((a, b) => b.day - a.day);

    if (loading) {
        return (
            <div className="bg-asphalt py-20 px-6 text-center font-mono text-neon-green animate-pulse">
                &gt; SYNCING_WITH_LEDGER...
            </div>
        );
    }

    return (
        <section className="bg-asphalt py-20 px-6 md:px-12 border-t border-street-gray/10">
            <div className="container mx-auto max-w-4xl">
                <div className="mb-12 flex items-end gap-4 border-b border-street-gray/20 pb-4">
                    <h2 className="text-4xl md:text-5xl font-glitch text-spray-cyan leading-none">
                        THE DROP
                    </h2>
                    <span className="font-mono text-neon-green mb-1 text-sm">
                        {"// DAILY_LOG_LEDGER"}
                    </span>
                </div>

                <div className="space-y-8">
                    {displayDrops.map((drop, index) => (
                        <motion.div
                            key={drop.day}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group"
                        >
                            {/* Connector Line */}
                            {index !== displayDrops.length - 1 && (
                                <div className="absolute left-[27px] top-16 bottom-[-32px] w-[2px] bg-street-gray/20 group-hover:bg-spray-pink/50 transition-colors" />
                            )}

                            <div className="flex gap-6 md:gap-8">
                                {/* Day Badge */}
                                <div className="flex-shrink-0">
                                    <div className="w-14 h-14 bg-concrete border-2 border-street-gray flex items-center justify-center rounded-sm group-hover:border-spray-pink group-hover:text-spray-pink transition-colors">
                                        <span className="font-glitch text-xl text-white group-hover:text-spray-pink">{drop.day}</span>
                                    </div>
                                </div>

                                {/* Content Card */}
                                <div className="flex-grow bg-concrete/30 p-6 rounded-sm border border-street-gray/10 hover:border-spray-cyan/30 transition-all backdrop-blur-sm">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                                        <h3 className="text-xl font-bold font-mono text-white group-hover:text-spray-cyan transition-colors">
                                            {drop.topic}
                                        </h3>
                                        <span className="text-xs font-mono text-street-gray bg-asphalt px-2 py-1 rounded">
                                            {drop.date}
                                        </span>
                                    </div>

                                    <p className="text-street-gray font-mono mb-4 text-sm leading-relaxed">
                                        {drop.description}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-street-gray/10">
                                        <div className="flex gap-2">
                                            {drop.stack.map((tech) => (
                                                <span key={tech} className="text-[10px] uppercase font-bold text-asphalt bg-neon-green px-2 py-[2px] rounded-sm">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="ml-auto text-xs font-mono text-spray-pink/80">
                                            &gt; {drop.commit}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
