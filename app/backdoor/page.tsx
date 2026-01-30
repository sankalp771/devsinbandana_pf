"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { DropPortal } from "@/components/drop-portal";

export default function Backdoor() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [authError, setAuthError] = useState(false);
    const [input, setInput] = useState("");
    const [isPortalOpen, setIsPortalOpen] = useState(false);
    const [pendingSummary, setPendingSummary] = useState<string | null>(null);
    const [logs, setLogs] = useState<string[]>([
        "CONNECTED TO THE_STREET_NETWORK...",
        "ACCESS GRANTED... AUTH_LEVEL: MASTER_CHRONICLER",
        "TYPE 'help' FOR COMMANDS."
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Check session storage on load
        const auth = sessionStorage.getItem("backdoor_auth");
        if (auth === "true") {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs, isAuthenticated]);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthError(false);
        try {
            const res = await fetch("/api/auth/backdoor", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: passwordInput })
            });

            if (res.ok) {
                setIsAuthenticated(true);
                sessionStorage.setItem("backdoor_auth", "true");
            } else {
                setAuthError(true);
                setPasswordInput("");
            }
        } catch {
            setAuthError(true);
        }
    };

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
            addLog("  logout            - TERMINATE SESSION");
        } else if (cmd === "logout") {
            sessionStorage.removeItem("backdoor_auth");
            window.location.reload();
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
                    setPendingSummary(summary);
                }
            } catch {
                addLog("ERR: NETWORK_FAILURE");
            }
            setIsTyping(false);
        } else if (cmd === "save") {
            if (!pendingSummary) {
                addLog("ERR: NO_PENDING_SUMMARY");
                return;
            }
            addLog("DROPPING_TO_LEDGER_VIA_PRISMA...");
            try {
                const res = await fetch("/api/drops", {
                    method: "POST",
                    body: JSON.stringify({
                        topic: "Daily Grind Update",
                        description: pendingSummary,
                        stack: ["AI", "Prisma", "Next.js"],
                        commitMsg: "feat: automated street drop"
                    })
                });
                if (res.ok) addLog("SUCCESS: DROP_LOCKED_IN_DB");
                else addLog("ERR: SAVE_FAILED");
            } catch {
                addLog("ERR: DB_OFFLINE");
            }
        } else {
            addLog(`ERR: COMMAND_${cmd}_NOT_FOUND`);
        }
    };

    if (!isAuthenticated) {
        return (
            <main className="min-h-screen bg-black text-neon-green p-4 font-mono flex items-center justify-center">
                <div className="max-w-md w-full border-2 border-neon-green/30 bg-asphalt/50 p-8 rounded-sm shadow-[0_0_30px_rgba(10,255,0,0.15)] overflow-hidden relative">
                    {/* Retro Glitch Lines overlay */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 size-full bg-[length:100%_2px,3px_100%]" />

                    <div className="flex flex-col items-center gap-6 relative z-20">
                        <div className="p-4 border-2 border-neon-green animate-pulse rounded-full">
                            <TerminalIcon size={40} />
                        </div>

                        <div className="text-center space-y-2">
                            <h1 className="text-xl font-black tracking-[0.2em] text-white">SECURE_CHEST_LOCKED</h1>
                            <p className="text-xs text-neon-green/60 uppercase tracking-widest">Identify Yourself or Step Off</p>
                        </div>

                        <form onSubmit={handleAuth} className="w-full space-y-4">
                            <div className="relative group">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neon-green/40 group-focus-within:text-neon-green font-bold text-lg">#</span>
                                <input
                                    autoFocus
                                    type="password"
                                    value={passwordInput}
                                    onChange={(e) => setPasswordInput(e.target.value)}
                                    placeholder="ENTER_SECRET_HANDSHAKE"
                                    className="w-full bg-black/80 border border-neon-green/30 px-8 py-3 outline-none text-white placeholder:text-neon-green/10 focus:border-neon-green/80 transition-all font-bold tracking-widest"
                                />
                            </div>

                            {authError && (
                                <div className="text-[10px] text-spray-pink animate-bounce uppercase tracking-tighter text-center">
                                    [!] ACCESS_DENIED: IDENTITY_UNKNOWN [!]
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-neon-green text-black font-black py-3 uppercase tracking-[0.3em] hover:bg-white transition-colors cursor-pointer active:scale-[0.98]"
                            >
                                CHALLENGE
                            </button>
                        </form>

                        <div className="text-[9px] text-street-gray/50 text-center leading-relaxed font-bold tracking-tighter">
                            IP_LOGGED // BANDANA_ENFORCED<br />
                            V.2.0_KERNEL_STREET_VERSION
                        </div>
                    </div>
                </div>
            </main>
        );
    }

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
                        <div className="flex gap-2 text-[10px] items-center text-white/50 px-2 uppercase tracking-tighter italic">
                            Logged_in_as_Bandana_King
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
