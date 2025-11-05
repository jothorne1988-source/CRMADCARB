import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

// Twilio will POST inbound messages here
export async function POST(req: Request) {
  const form = await req.formData();
  const from = String(form.get("From") || "");
  const body = String(form.get("Body") || "");
  const jobId = String(form.get("Body") || "").match(/#JOB:([a-z0-9]+)/i)?.[1];
  if (jobId) {
    await prisma.activity.create({ data: { jobId, kind: "whatsapp", message: `${from}: ${body}` } });
  }
  // TwiML empty OK
  return new NextResponse("", { status: 200 });
}
