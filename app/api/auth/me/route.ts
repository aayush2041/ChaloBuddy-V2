import { getCurrentUser } from "@/lib/auth"; import { fail, ok } from "@/lib/api";
export async function GET() { const user = await getCurrentUser(); if (!user) return fail("UNAUTHORIZED", "Please sign in", 401); return ok({ id: user.id, name: user.name, email: user.email, profile: user.profile, verification: user.verification }); }
