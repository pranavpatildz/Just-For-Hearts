import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const message = await prisma.contactMessage.create({
    data,
  });

  return NextResponse.json(message);
}