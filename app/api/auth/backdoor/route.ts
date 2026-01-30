import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { password } = await req.json();
        const secret = process.env.BACKDOOR_PASSWORD;

        if (password === secret) {
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ success: false, error: "INVALID_SECRET_HANDSHAKE" }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ success: false, error: "INTERNAL_ERROR" }, { status: 500 });
    }
}
