import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const JWT_SECRET = process.env.JWT_SECRET as string

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET not defined in environment variables")
}

// 👇 Make sure this is exported exactly like this
export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10)
}

export async function comparePassword(
  password: string,
  hashed: string
) {
  return await bcrypt.compare(password, hashed)
}

export function generateToken(payload: {
  id: string
  role: string
}) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  })
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET)
}