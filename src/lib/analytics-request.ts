export function isSameOriginAnalyticsRequest(request: Request): boolean {
  const origin = request.headers.get("origin");
  const site = request.headers.get("sec-fetch-site");
  if (site && site !== "same-origin" && site !== "none") return false;
  if (!origin) return site === "same-origin";
  try { return new URL(origin).origin === new URL(request.url).origin; }
  catch { return false; }
}