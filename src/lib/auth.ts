import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "dev_jwt_secret";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(payload: { id: string; role: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function getUser() {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("jfh_user");
  return user ? JSON.parse(user) : null;
}

export function setUser(user: unknown) {
  localStorage.setItem("jfh_user", JSON.stringify(user));
}

export function logout() {
  localStorage.removeItem("jfh_user");
  window.location.href = "/login";
}
