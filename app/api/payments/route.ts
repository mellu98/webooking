import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const payments = await prisma.payment.findMany({
    include: { event: { include: { artist: true, venue: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(payments);
}
