import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(leads);
}

export async function POST(req: Request) {
  const body = await req.json();
  const lead = await prisma.lead.create({ data: body });
  return NextResponse.json(lead);
}
