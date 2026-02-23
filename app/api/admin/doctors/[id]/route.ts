import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { requireRole } from "@/src/lib/require-role";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { error } = await requireRole(req, ["ADMIN", "SUPER_ADMIN"]);
  if (error) return error;

  const data = await req.json();
  const resolvedParams = await context.params;

  const doctor = await prisma.doctor.update({
    where: { id: resolvedParams.id },
    data,
  });

  return NextResponse.json(doctor);
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { error } = await requireRole(req, ["SUPER_ADMIN"]);
  if (error) return error;

  const resolvedParams = await context.params;
  await prisma.doctor.delete({
    where: { id: resolvedParams.id },
  });

  return NextResponse.json({ message: "Deleted" });
}
