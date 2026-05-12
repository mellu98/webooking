import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const req = await prisma.bookingRequest.findUnique({
    where: { id },
    include: { artist: true, venue: true },
  });
  if (!req) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(req);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const updated = await prisma.bookingRequest.update({
    where: { id },
    data: body,
    include: { artist: true, venue: true },
  });
  return NextResponse.json(updated);
}
