import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "./verify-admin";

export async function requireRole(
  request: NextRequest,
  allowedRoles: string[]
) {
  const user = await verifyAdmin();

  if (!user) {
    return {
      error: NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      ),
      user: null,
    };
  }

  if (!allowedRoles.includes(user.role)) {
    return {
      error: NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      ),
      user: null,
    };
  }

  return { error: null, user };
}