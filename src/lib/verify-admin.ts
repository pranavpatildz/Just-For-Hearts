import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export interface AuthPayload {
  id: string;
  role: string;
}

export async function verifyAdmin(): Promise<AuthPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token) return null;

    return jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as AuthPayload;
  } catch {
    return null;
  }
}