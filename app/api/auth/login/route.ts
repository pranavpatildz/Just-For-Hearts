import { NextRequest } from "next/server"
import { cookies } from "next/headers";
import { prisma } from "@/src/lib/prisma"
import { comparePassword, generateToken } from "@/src/lib/auth"
import { loginSchema } from "@/src/lib/validators";
import { success, errorResponse } from "@/src/lib/api-response";
import { rateLimit } from "@/src/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    const { success: limitReached } = await rateLimit.limit(ip);

    if (!limitReached) {
      return errorResponse("Too many requests", 429);
    }

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

    const cookieStore = await cookies();
    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return success(null, "Login successful");
  } catch (error) {
    return errorResponse("Login failed", 500);
  }
}
