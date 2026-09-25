import { NextResponse } from "next/server";
export function ok<T>(data: T, init?: ResponseInit) { return NextResponse.json({ success: true, data }, init); }
export function fail(code: string, message: string, status = 400) { return NextResponse.json({ success: false, error: { code, message } }, { status }); }
export async function json<T>(request: Request): Promise<T> { return request.json() as Promise<T>; }
