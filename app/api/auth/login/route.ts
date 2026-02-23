import { NextResponse } from "next/server"
import { prisma } from "@/src/lib/prisma"
import { comparePassword, generateToken } from "@/src/lib/auth"
import { loginSchema } from "@/src/lib/validators";
import { success, errorResponse } from "@/src/lib/api-response";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse("Invalid input", 400);
    }

    const { email, password } = parsed.data;

    const admin = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (!admin) {
      return errorResponse("Invalid credentials", 401);
    }

    const isValid = await comparePassword(password, admin.password);

    if (!isValid) {
      return errorResponse("Invalid credentials", 401);
    }

    const token = generateToken({
      id: admin.id,
      role: admin.role,
    });

    return success({ token }, "Login successful");
  } catch (error) {
    return errorResponse("Login failed", 500);
  }
}
