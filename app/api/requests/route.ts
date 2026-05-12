import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const artistId = searchParams.get("artistId");
  const venueId = searchParams.get("venueId");
  const sentById = searchParams.get("sentById");
  const managedById = searchParams.get("managedById");

  const where: any = {};
  if (status && status !== "all") where.status = status;
  if (artistId) where.artistId = artistId;
  if (venueId) where.venueId = venueId;
  if (sentById) where.sentById = sentById;
  if (managedById) where.managedById = managedById;

  const requests = await prisma.bookingRequest.findMany({
    where,
    include: { artist: true, venue: true, sentBy: true, managedBy: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(requests);
}

export async function POST(request: Request) {
  const body = await request.json();
  const bookingRequest = await prisma.bookingRequest.create({
    data: body,
    include: { artist: true, venue: true },
  });
  return NextResponse.json(bookingRequest, { status: 201 });
}
