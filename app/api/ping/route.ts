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
    } catch (error: any) {
        console.error("DB_PING_ERROR:", error);
        return NextResponse.json({
            status: "ERROR",
            database: "DISCONNECTED",
            error: error.message
        }, { status: 500 });
    }
}
