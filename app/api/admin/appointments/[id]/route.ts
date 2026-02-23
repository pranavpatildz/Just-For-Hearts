import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { requireRole } from "@/src/lib/require-role";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { error } = await requireRole(req, ["ADMIN", "SUPER_ADMIN"]);
  if (error) return error;

  const { status } = await req.json();
  const resolvedParams = await context.params;

  const appointment = await prisma.appointment.update({
    where: { id: resolvedParams.id },
    data: { status },
  });

  return NextResponse.json(appointment);
}