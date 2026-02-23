import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { requireRole } from "@/src/lib/require-role";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { error } = requireRole(req, ["ADMIN", "SUPER_ADMIN"]);
  if (error) return error;

  const data = await req.json();

  const doctor = await prisma.doctor.update({
    where: { id: params.id },
    data,
  });

  return NextResponse.json(doctor);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { error } = requireRole(req, ["SUPER_ADMIN"]);
  if (error) return error;

  await prisma.doctor.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ message: "Deleted" });
}
