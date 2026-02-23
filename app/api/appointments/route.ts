import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { appointmentSchema } from "@/src/lib/validators";
import { success, errorResponse } from "@/src/lib/api-response";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = appointmentSchema.safeParse(body);

  if (!parsed.success) {
    return errorResponse("Invalid appointment data", 400);
  }

  const appointment = await prisma.appointment.create({
    data: {
      ...parsed.data,
      status: "PENDING",
    },
  });

  return success(appointment, "Appointment created");
}