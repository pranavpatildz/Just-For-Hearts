import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const appointment = await prisma.appointment.create({
    data: {
      ...data,
      status: "PENDING",
    },
  });

  return NextResponse.json(appointment);
}