import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { requireRole } from "@/src/lib/require-role";

export async function GET(req: NextRequest) {
  const { error } = await requireRole(req, ["ADMIN", "SUPER_ADMIN"]);
  if (error) return error;

  const appointments = await prisma.appointment.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(appointments);
}
