import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export interface AuthPayload {
  id: string;
  role: string;
}

export function verifyAdmin(request: NextRequest): AuthPayload | null {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as AuthPayload;

    return decoded;
  } catch (error) {
    return null;
  }
}