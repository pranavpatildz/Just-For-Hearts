import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { requireRole } from "@/src/lib/require-role";
import { success } from "@/src/lib/api-response";

export async function GET(req: NextRequest) {
  const { error } = await requireRole(req, ["ADMIN", "SUPER_ADMIN"]);
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 1);
  const limit = 10;
  const skip = (page - 1) * limit;

  const doctors = await prisma.doctor.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  return success(doctors);
}

export async function POST(req: NextRequest) {
  const { error } = await requireRole(req, ["ADMIN", "SUPER_ADMIN"]);
  if (error) return error;

  const data = await req.json();

  const doctor = await prisma.doctor.create({
    data,
  });

  return NextResponse.json(doctor);
}
