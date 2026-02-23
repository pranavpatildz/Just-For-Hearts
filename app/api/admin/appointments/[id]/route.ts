import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { requireRole } from "@/src/lib/require-role";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { error } = requireRole(req, ["ADMIN", "SUPER_ADMIN"]);
  if (error) return error;

  const { status } = await req.json();

  const appointment = await prisma.appointment.update({
    where: { id: params.id },
    data: { status },
  });

  return NextResponse.json(appointment);
}