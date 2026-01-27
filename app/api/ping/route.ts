export const runtime = "nodejs";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await prisma.$queryRaw`SELECT 1`;
        return NextResponse.json({
            status: "OK",
            database: "CONNECTED",
            timestamp: new Date().toISOString()
        });
    } catch (error: unknown) {
        console.error("DB_PING_ERROR:", error);
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
        return NextResponse.json({
            status: "ERROR",
            database: "DISCONNECTED",
            error: errorMessage
        }, { status: 500 });
    }
}
