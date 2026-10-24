import { createHash, timingSafeEqual } from "node:crypto";

export function matchesPreviewSecret(expected: string | undefined, supplied: unknown): boolean {
  if (!expected || expected.length < 24 || typeof supplied !== "string" || supplied.length > 1024) return false;
  const digest = (value: string) => createHash("sha256").update(value).digest();
  return timingSafeEqual(digest(expected), digest(supplied));
}