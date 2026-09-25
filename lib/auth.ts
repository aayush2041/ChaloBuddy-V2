import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { prisma } from "./db";

const COOKIE = "chalobuddy_session";
const secret = () => process.env.SESSION_SECRET || "development-only-change-me";
const hashToken = (token: string) => crypto.createHmac("sha256", secret()).update(token).digest("hex");

export async function hashPassword(password: string) { return bcrypt.hash(password, 12); }
export async function verifyPassword(password: string, hash: string) { return bcrypt.compare(password, hash); }

export async function createSession(userId: string) {
  const token = crypto.randomBytes(32).toString("hex");
  await prisma.session.create({ data: { tokenHash: hashToken(token), userId, expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) } });
  const jar = await cookies();
  jar.set(COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });
}

export async function destroySession() {
  const jar = await cookies(); const token = jar.get(COOKIE)?.value;
  if (token) await prisma.session.deleteMany({ where: { tokenHash: hashToken(token) } });
  jar.delete(COOKIE);
}

export async function getCurrentUser() {
  try {
    const token = (await cookies()).get(COOKIE)?.value;
    if (!token) return null;
    const session = await prisma.session.findUnique({ where: { tokenHash: hashToken(token) }, include: { user: { include: { profile: true, verification: true } } } });
    if (!session || session.expiresAt < new Date()) return null;
    return session.user;
  } catch { return null; }
}
