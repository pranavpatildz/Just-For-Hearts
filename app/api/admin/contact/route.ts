import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { requireRole } from "@/src/lib/require-role";

export async function GET(req: NextRequest) {
  const { error } = requireRole(req, ["ADMIN", "SUPER_ADMIN"]);
  if (error) return error;

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(messages);
}