import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const venues = await prisma.venue.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(venues);
}

export async function POST(request: Request) {
  const body = await request.json();
  const venue = await prisma.venue.create({ data: body });
  return NextResponse.json(venue, { status: 201 });
}
