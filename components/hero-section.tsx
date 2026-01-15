"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GlitchText } from "@/components/ui/glitch-text";
import { Github, Twitter, Linkedin, Terminal } from "lucide-react";

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-asphalt px-6 py-12 md:px-12">
            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(10,255,0,0.03),transparent_70%)]" />
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-street-gray/20 to-transparent opacity-50" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-street-gray/20 to-transparent opacity-50" />
            </div>

            <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">

                {/* Text Area */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col gap-6 text-center md:text-left items-center md:items-start"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-street-gray/30 bg-concrete/50 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                        <span className="text-xs font-mono text-street-gray tracking-wider">SYSTEM_ONLINE // V.1.0</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-glitch leading-none text-white tracking-wide">
                        <span className="block mb-2">100 DAYS.</span>
                        <span className="block mb-2 text-neon-green">100 COMMITS.</span>
                        <GlitchText text="NO CAP." className="text-spray-cyan" />
                    </h1>

                    <p className="text-lg md:text-xl font-mono text-street-gray max-w-lg leading-relaxed">
                        From the streets to the main branch. The <span className="text-white bg-spray-pink/20 px-1">Bandana Coder</span> journey starts now.
                        Witness the grind, check the code, watch the skills level up.
                    </p>

                    <div className="flex flex-wrap gap-4 mt-4">
                        <a
                            href="https://github.com/sankalp771/devsinbandana_pf"
                            target="_blank"
                            className="flex items-center gap-3 px-8 py-4 bg-neon-green text-asphalt font-bold font-mono text-lg rounded-sm hover:skew-x-[-10deg] transition-transform shadow-[4px_4px_0px_#fff]"
                        >
                            <Terminal size={20} />
                            CHECK_CODE
                        </a>
                        <a
                            href="https://www.instagram.com/devsinbandana/"
                            target="_blank"
                            className="flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-street-gray text-white font-bold font-mono text-lg rounded-sm hover:bg-spray-pink hover:border-spray-pink hover:text-black transition-colors"
                        >
                            HOLLA_AT_ME
                        </a>
                    </div>

                    <div className="flex gap-6 mt-8 text-street-gray">
                        <Github className="w-6 h-6 hover:text-white cursor-pointer transition-colors" />
                        <Twitter className="w-6 h-6 hover:text-spray-cyan cursor-pointer transition-colors" />
                        <Linkedin className="w-6 h-6 hover:text-spray-pink cursor-pointer transition-colors" />
                    </div>
                </motion.div>

                {/* Visual Area - Avatar */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="relative flex justify-center"
                >
                    <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] group">
                        {/* Spray paint effect behind */}
                        <div className="absolute -inset-10 bg-spray-cyan/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Sticker Border wrapper - rotated */}
                        <div className="relative w-full h-full p-2 bg-white rotate-3 shadow-[8px_8px_0px_var(--color-spray-pink)] transition-transform group-hover:rotate-0 duration-300">
                            <div className="relative w-full h-full bg-asphalt overflow-hidden border border-black">
                                <Image
                                    src="/bandana-coder.png"
                                    alt="Bandana Coder"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                {/* Overlay Glitch / Scanlines */}
                                <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif')] opacity-10 mix-blend-overlay pointer-events-none" />
                                <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-transparent to-transparent opacity-60" />
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                            className="absolute -bottom-6 -right-6 bg-asphalt border-2 border-neon-green p-4 rotate-[-6deg] shadow-[4px_4px_0px_var(--color-neon-green)]"
                        >
                            <div className="font-glitch text-2xl text-white">DAY {Math.floor((new Date().getTime() - new Date('2026-01-01').getTime()) / (1000 * 60 * 60 * 24)) + 1}</div>
                        </motion.div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
