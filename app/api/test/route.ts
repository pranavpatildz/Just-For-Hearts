export const runtime = "nodejs"

import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
  const program = await prisma.program.upsert({
    where: { slug: "test-program" },
    update: {},
    create: {
      title: "Test Program",
      slug: "test-program",
      description: "Testing DB connection",
      content: "If you see this in DB, backend works!",
    }
  });

  return NextResponse.json(program);
}
