import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const events = await prisma.event.findMany({
    include: { artist: true, venue: true, request: true },
    orderBy: { date: "desc" },
  });
  return NextResponse.json(events);
}

export async function POST(request: Request) {
  const body = await request.json();
  const event = await prisma.event.create({
    data: body,
    include: { artist: true, venue: true },
  });
  return NextResponse.json(event, { status: 201 });
}
