import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 gap-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[url('/noise.png')]"></div>

      <div className="z-10 flex flex-col items-center gap-4 text-center">
        <h1 className="text-6xl md:text-8xl font-glitch text-neon-green tracking-widest animate-pulse">
          STREET<br />CODE<br />CHRONICLES
        </h1>
        <p className="text-xl md:text-2xl font-mono text-street-gray mt-4 border-l-4 border-spray-pink pl-4">
          // 100 DAYS. 100 COMMITS. NO CAP.
        </p>
      </div>

      <div className="z-10 mt-12 p-1 border border-street-gray/20 bg-asphalt/50 backdrop-blur-sm">
        <div className="text-xs font-mono text-spray-cyan p-2">
           > SYSTEM.INIT()...<br />
           > CONNECTING TO UNDERGROUND...<br />
           > LOADING ASSETS...
        </div>
      </div>
    </main>
  );
}
