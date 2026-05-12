import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const artist = await prisma.artist.findUnique({
    where: { id },
    include: {
      availability: { orderBy: { date: "asc" }, take: 30 },
      events: { orderBy: { date: "desc" }, take: 5, include: { venue: true } },
    },
  });
  if (!artist) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(artist);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const artist = await prisma.artist.update({ where: { id }, data: body });
  return NextResponse.json(artist);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.artist.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
