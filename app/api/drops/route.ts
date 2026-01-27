export const runtime = "nodejs";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    console.log("GET /api/drops initiated");
    try {
        const drops = await prisma.drop.findMany({
            orderBy: {
                day: 'desc'
            }
        });
        return NextResponse.json(drops);
    } catch (error: unknown) {
        console.error("CRITICAL API ERROR /api/drops (GET):", error);
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
        return NextResponse.json({ error: "FAILED_TO_FETCH_DROPS", details: errorMessage }, { status: 500 });
    }
}

export async function POST(req: Request) {
    console.log("POST /api/drops initiated");
    try {
        const body = await req.json();
        const { day, topic, description, stack, commitMsg } = body;

        const dayCount = day || Math.floor((new Date().getTime() - new Date('2026-01-01').getTime()) / (1000 * 60 * 60 * 24)) + 1;

        const newDrop = await prisma.drop.create({
            data: {
                day: dayCount,
                topic: topic || "Daily Drop",
                description: description || "",
                stack: Array.isArray(stack) ? stack : [],
                commitMsg: commitMsg || "",
                date: new Date()
            }
        });

        return NextResponse.json(newDrop);
    } catch (error: unknown) {
        console.error("CRITICAL API ERROR /api/drops (POST):", error);
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
        return NextResponse.json({ error: "FAILED_TO_SAVE_DROP", details: errorMessage }, { status: 500 });
    }
}
