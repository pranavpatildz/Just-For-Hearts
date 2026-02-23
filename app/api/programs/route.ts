import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
  const programs = await prisma.program.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(programs);
}
