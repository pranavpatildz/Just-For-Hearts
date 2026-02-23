import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { requireRole } from "@/src/lib/require-role";

export async function GET(req: NextRequest) {
  const { error } = await requireRole(req, ["ADMIN", "SUPER_ADMIN"]);
  if (error) return error;

  const programs = await prisma.program.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(programs);
}

export async function POST(req: NextRequest) {
  const { error } = await requireRole(req, ["ADMIN", "SUPER_ADMIN"]);
  if (error) return error;

  const data = await req.json();

  const program = await prisma.program.create({
    data,
  });

  return NextResponse.json(program);
}