import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { notes } = await req.json();
  // Simple heuristic if no AI key is present
  const base = /referral|roof|south|budget|ready/i.test(notes || "") ? 60 : 40;
  let score = base + Math.floor(Math.random()*40);

  // OPTIONAL: real AI
  if (process.env.OPENAI_API_KEY) {
    try {
      const prompt = `Rate solar lead 0-100 based on:
      ${notes}`;
      // Minimal fetch without SDK to keep template light
      const r = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
        body: JSON.stringify({ model: "gpt-4o-mini", messages: [{ role: "user", content: prompt }], temperature: 0 })
      });
      const j = await r.json();
      const txt = j?.choices?.[0]?.message?.content || "50";
      const m = txt.match(/(\d{1,3})/);
      if (m) score = Math.min(100, Math.max(0, parseInt(m[1],10)));
    } catch {}
  }

  return NextResponse.json({ score });
}
