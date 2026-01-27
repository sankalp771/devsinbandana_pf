import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { content } = await req.json();

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "meta-llama/llama-3.2-3b-instruct:free", // Stable free model
                messages: [
                    {
                        role: "system",
                        content: "You are 'The Bandana Coder', a gritty, street-smart software engineer who builds high-end tech. Translate raw Git commit messages and code changes into a 'Street Drop' for a 100 Days of Code ledger. Keep it aggressive, professional, and slightly gangsta. Use terms like 'grind', 'perimeter', 'stash', 'no cap', 'solid'. Keep it short (1-2 sentences)."
                    },
                    {
                        role: "user",
                        content: `Summarize this work: ${content}`
                    }
                ]
            })
        });

        const data = await response.json();
        console.log("OpenRouter Response:", JSON.stringify(data, null, 2));

        if (!response.ok) {
            return NextResponse.json({ error: data.error?.message || "OPENROUTER_API_ERROR" }, { status: response.status });
        }

        const summary = data.choices?.[0]?.message?.content || "No summary generated";

        return NextResponse.json({ summary });
    } catch (error: any) {
        console.error("Summarize API Error:", error);
        return NextResponse.json({ error: error.message || "FAILED_TO_PROCESS_DROP" }, { status: 500 });
    }
}
