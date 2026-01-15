export interface DailyDrop {
    day: number;
    date: string;
    topic: string;
    description: string;
    stack: string[]; // e.g., ["Next.js", "Tailwind"]
    commit: string; // e.g., "init: street-code-chronicles"
}

export const drops: DailyDrop[] = [
    {
        day: 1,
        date: "2026-01-01",
        topic: "Portfolio Initialization",
        description: "Kicked off the 100 Days of Code challenge. Built the 'Street Code Chronicles' portfolio with the 'Bandana Coder' aesthetic using Next.js 15 and Tailwind v4.",
        stack: ["Next.js", "TailwindCSS", "Framer Motion"],
        commit: "init: street-code-chronicles project setup"
    },
    {
        day: 2,
        date: "2026-01-02",
        topic: "MediPilot Authentication",
        description: "Integrated Clerk for secure user authentication in MediPilot. Set up Supabase with Prisma ORM to handle patient data and prescriptions.",
        stack: ["Clerk", "Supabase", "Prisma"],
        commit: "feat: auth setup and database schema init"
    },
    {
        day: 3,
        date: "2026-01-03",
        topic: "Virus Eater Lab: Dual Mode",
        description: "Implemented Dual-Mode architecture (Simulation vs On-chain). Deployed the first smart contract on Base Sepolia, though payment integration is still WIP.",
        stack: ["Base Sepolia", "Solidity", "Next.js"],
        commit: "feat: dual mode engine and initial contract deploy"
    },
    {
        day: 4,
        date: "2026-01-04",
        topic: "MediPilot History & Schema",
        description: "Added History Report features to track past uploads. Built robust API routes and finalized the Prisma Schema for medical records.",
        stack: ["Prisma", "API Routes", "PostgreSQL"],
        commit: "backend: history routes and schema finalization"
    },
    {
        day: 5,
        date: "2026-01-05",
        topic: "MediPilot UI & Error Handling",
        description: "Refined the UI with 'Medical Emerald' components. Implemented comprehensive error handling for the report generation pipeline.",
        stack: ["React", "UI Components", "Error Boundary"],
        commit: "ui: report components and global error handling"
    },
    {
        day: 6,
        date: "2026-01-06",
        topic: "MediPilot File Uploads",
        description: "Polished the History Page and built a drag-and-drop File Upload component for processing PDF lab reports.",
        stack: ["React Dropzone", "TailwindCSS"],
        commit: "feat: file upload logic and history ui update"
    },
    {
        day: 7,
        date: "2026-01-07",
        topic: "Virus Lab Payment Fixed",
        description: "Migrated Virus Lab to Bun for speed. Replaced WalletConnect with MetaMask (wagmi), finally fixing the payment/transaction flow.",
        stack: ["Bun", "Wagmi", "MetaMask"],
        commit: "fix: payment flow and migration to bun"
    },
    {
        day: 8,
        date: "2026-01-08",
        topic: "Virus Lab Optimization",
        description: "Code cleanup and optimization. Updated the README and refactored the codebase for better maintainability.",
        stack: ["Refactoring", "Documentation"],
        commit: "refactor: code cleanup and readme update"
    },
    {
        day: 9,
        date: "2026-01-09",
        topic: "Virus Lab Contract Upgrades",
        description: "Enhanced Smart Contract: added 'Exit Game', 'Claim Rewards', and better 'Recall' mechanics. Added new visual effects for battle scenes.",
        stack: ["Solidity", "Smart Contracts", "VFX"],
        commit: "smart-contract: recall logic and visual effects"
    },
    {
        day: 10,
        date: "2026-01-10",
        topic: "The Daily Drop Ledger",
        description: "Implemented the 'Daily Drop' section to track the 100-day journey. Added the dynamic 'Day X' counter to the Hero section effectively automating the streak tracking.",
        stack: ["Next.js", "React", "Framer Motion"],
        commit: "feat: daily drop ledger and dynamic day counter"
    },
    {
        day: 11,
        date: "2026-01-11",
        topic: "MediPilot Deployment & Polish",
        description: "Finalized MediPilot with a secure Next.js + AI integration. Polished the UI with custom branding, set up 'Report History', and fixed Prisma/Vercel deployment issues.",
        stack: ["Vercel", "Prisma", "AI Integration"],
        commit: "deploy: medipilot production build and ui polish"
    },
    {
        day: 12,
        date: "2026-01-12",
        topic: "Chat First Transformation",
        description: "Refactored MediPilot to be 'Chat-First'. Replaced the dashboard with a dynamic Chat UI and implemented a collapsible 'Evidence Drawer' for medical context. Fixed history navigation bugs.",
        stack: ["Next.js", "React", "API Routes"],
        commit: "refactor: chat-first ux and history navigation fixes"
    },
    {
        day: 13,
        date: "2026-01-13",
        topic: "AI Brain Upgrade & PDF Super-Vision",
        description: "Upgraded the AI engine to inject patient history for context-aware answers. Solved PDF parsing issues with a Hybrid Text+Vision engine, ensuring even complex reports are read accurately.",
        stack: ["Mistral AI", "PDF.js", "RAG"],
        commit: "feat: context injection and hybrid pdf processing"
    },
    {
        day: 14,
        date: "2026-01-14",
        topic: "Core Architecture & Intelligence",
        description: "Migrated DB schema for 'Always-On Chat' (decoupling chat from reports). Upgraded Intake Intelligence to extract structured HealthMetrics for Trend Analysis long-term memory.",
        stack: ["PostgreSQL", "Prisma", "Data Modeling"],
        commit: "backend: schema migration and health metrics engine"
    },
    {
        day: 15,
        date: "2026-01-15",
        topic: "UX Polish & Critical Stability",
        description: "Refined UX with a 'Global Health' dashboard, solving the empty state issue. Fixed critical race conditions in chat sessions and hardened the CarePlanViewer against crashes.",
        stack: ["React", "UX Hardening", "Bug Fixes"],
        commit: "fix: race conditions and global dashboard ux"
    }
];
