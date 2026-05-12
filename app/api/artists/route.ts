import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const genre = searchParams.get("genre");
  const city = searchParams.get("city");
  const available = searchParams.get("available");
  const search = searchParams.get("search");
  const minFee = searchParams.get("minFee");
  const maxFee = searchParams.get("maxFee");
  const eventType = searchParams.get("eventType");

  const where: any = {};

  if (genre && genre !== "all") where.genre = genre;
  if (city && city !== "all") where.city = city;
  if (available !== null && available !== "all") where.available = available === "true";
  if (minFee) where.fee = { ...(where.fee || {}), gte: Number(minFee) };
  if (maxFee) where.fee = { ...(where.fee || {}), lte: Number(maxFee) };
  if (eventType && eventType !== "all") {
    where.eventTypes = { contains: eventType };
  }
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { genre: { contains: search, mode: "insensitive" } },
      { city: { contains: search, mode: "insensitive" } },
      { bio: { contains: search, mode: "insensitive" } },
    ];
  }

  const artists = await prisma.artist.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(artists);
}

export async function POST(request: Request) {
  const body = await request.json();
  const artist = await prisma.artist.create({ data: body });
  return NextResponse.json(artist, { status: 201 });
}
