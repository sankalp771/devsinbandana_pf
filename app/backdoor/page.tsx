"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { GlitchText } from "@/components/ui/glitch-text";
import { Terminal as TerminalIcon, ShieldAlert, Zap, Save, PlusSquare } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { DropPortal } from "@/components/drop-portal";

export default function Backdoor() {
    const [input, setInput] = useState("");
    const [isPortalOpen, setIsPortalOpen] = useState(false);
    const [logs, setLogs] = useState<string[]>([
        "CONNECTED TO THE_STREET_NETWORK...",
        "ACCESS GRANTED... AUTH_LEVEL: MASTER_CHRONICLER",
        "TYPE 'help' FOR COMMANDS."
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    const addLog = (msg: string) => {
        setLogs(prev => [...prev, `> ${msg}`]);
    };

    const handleCommand = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const cmd = input.trim().toLowerCase();
        addLog(input);
        setInput("");

        if (cmd === "help") {
            addLog("COMMANDS:");
            addLog("  ls                - LIST ALL DROPS");
            addLog("  summarize [text]  - AI GENERATE STREET SUMMARY");
            addLog("  enter log         - OPEN VISUAL ENTRY PORTAL");
            addLog("  clear             - WIPE THE TERMINAL");
            addLog("  version           - SYSTEM INFO");
        } else if (cmd === "enter log") {
            addLog("OPENING_VISUAL_OVERRIDE_PORTAL...");
            setIsPortalOpen(true);
        } else if (cmd === "clear") {
            setLogs(["SYSTEM_WIPED... READY."]);
        } else if (cmd === "ls") {
            addLog("FETCHING_LEDGER...");
            const { data } = await supabase.from('drops').select('day, topic').order('day', { ascending: false });
            if (data) {
                data.forEach(d => addLog(`DAY ${d.day}: ${d.topic}`));
            }
        } else if (cmd.startsWith("sync git")) {
            addLog("CONTACTING_GH_ORACLE...");
            addLog("ANALYZING_DIFFS...");
            addLog("GENERATING_STREET_SUMMARY...");
            addLog("NOT_IMPLEMENTED_YET: AI_HOOK_PENDING");
        } else if (cmd.startsWith("summarize ")) {
            const content = input.replace(/^summarize\s+/i, "");
            setIsTyping(true);
            try {
                const res = await fetch("/api/ai/summarize", {
                    method: "POST",
                    body: JSON.stringify({ content })
                });
                const data = await res.json();

                if (!res.ok) {
                    addLog(`ERR: ${data.error || "UNKNOWN_ERROR"}`);
                } else {
                    const summary = data.summary;
                    addLog("AI_SUMMARY:");
                    addLog(summary);
                    addLog("TYPE 'save' TO DROP THIS TO THE LEDGER.");
                    (window as any).pendingSummary = summary;
                }
            } catch (e) {
                addLog("ERR: NETWORK_FAILURE");
            }
            setIsTyping(false);
        } else if (cmd === "save") {
            const summary = (window as any).pendingSummary;
            if (!summary) {
                addLog("ERR: NO_PENDING_SUMMARY");
                return;
            }
            addLog("DROPPING_TO_LEDGER_VIA_PRISMA...");
            try {
                const res = await fetch("/api/drops", {
                    method: "POST",
                    body: JSON.stringify({
                        topic: "Daily Grind Update",
                        description: summary,
                        stack: ["AI", "Prisma", "Next.js"],
                        commitMsg: "feat: automated street drop"
                    })
                });
                if (res.ok) addLog("SUCCESS: DROP_LOCKED_IN_DB");
                else addLog("ERR: SAVE_FAILED");
            } catch (e) {
                addLog("ERR: DB_OFFLINE");
            }
        } else {
            addLog(`ERR: COMMAND_${cmd}_NOT_FOUND`);
        }
    };

    return (
        <>
            <main className="min-h-screen bg-black text-neon-green p-4 font-mono selection:bg-neon-green selection:text-black">
                <div className="max-w-4xl mx-auto border-2 border-neon-green/30 bg-asphalt/50 backdrop-blur-md shadow-[0_0_20px_rgba(10,255,0,0.1)] rounded-sm flex flex-col h-[80vh]">
                    {/* Header */}
                    <div className="border-b border-neon-green/30 p-3 flex items-center justify-between bg-concrete/20">
                        <div className="flex items-center gap-2">
                            <TerminalIcon size={18} className="animate-pulse" />
                            <span className="text-xs font-bold tracking-widest text-white">THE_BACKDOOR_TERMINAL_V.2.0</span>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-spray-pink animate-pulse" />
                            <div className="w-2 h-2 rounded-full bg-spray-cyan" />
                            <div className="w-2 h-2 rounded-full bg-neon-green" />
                        </div>
                    </div>

                    {/* Output */}
                    <div
                        ref={scrollRef}
                        className="flex-grow overflow-y-auto p-6 space-y-2 scrollbar-hide text-sm md:text-base"
                    >
                        {logs.map((log, i) => (
                            <div key={i} className={log.startsWith(">") ? "text-white" : "text-neon-green"}>
                                {log}
                            </div>
                        ))}
                        {isTyping && <div className="animate-pulse">_PROCESSING_DATA...</div>}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleCommand} className="border-t border-neon-green/30 p-4 bg-black">
                        <div className="flex items-center gap-3">
                            <span className="text-neon-green font-bold animate-pulse">#</span>
                            <input
                                autoFocus
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="flex-grow bg-transparent border-none outline-none text-white caret-neon-green placeholder:text-neon-green/20"
                                placeholder="ENTER_COMMAND..."
                            />
                        </div>
                    </form>
                </div>

                <div className="mt-8 flex justify-center opacity-50 text-[10px] tracking-widest text-street-gray">
                    UNAUTHORIZED ACCESS IS PROHIBITED // NO_CAP_ENFORCED
                </div>
            </main>
            <DropPortal
                isOpen={isPortalOpen}
                onClose={() => setIsPortalOpen(false)}
                onSuccess={() => addLog("SUCCESS: LEDGER_UPDATED_LOCALLY")}
            />
        </>
    );
}
