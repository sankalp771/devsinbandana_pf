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
    } catch (error: any) {
        console.error("CRITICAL API ERROR /api/drops (GET):", error);
        return NextResponse.json({ error: "FAILED_TO_FETCH_DROPS", details: error.message }, { status: 500 });
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
    } catch (error: any) {
        console.error("CRITICAL API ERROR /api/drops (POST):", error);
        return NextResponse.json({ error: "FAILED_TO_SAVE_DROP", details: error.message }, { status: 500 });
    }
}
