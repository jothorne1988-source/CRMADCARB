import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { to, message } = await req.json();
  const url = `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`;
  const params = new URLSearchParams({
    To: `whatsapp:${to}`,
    From: process.env.TWILIO_WHATSAPP_FROM || "",
    Body: message,
  });
  const res = await fetch(url, {
    method: "POST",
    headers: { "Authorization": "Basic " + Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString("base64") },
    body: params
  });
  const json = await res.json();
  return NextResponse.json(json);
}
