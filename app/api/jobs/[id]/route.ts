import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function PATCH(_req: Request, { params }: { params: { id: string } }) {
  const data = await _req.json();
  const job = await prisma.job.update({ where: { id: params.id }, data });
  return NextResponse.json(job);
}
