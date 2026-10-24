/** Report-only CSP discovers embed needs without breaking the site or editor. */
export function withSecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  if (!headers.has("X-Content-Type-Options")) headers.set("X-Content-Type-Options", "nosniff");
  if (!headers.has("Referrer-Policy")) headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  if (!headers.has("Permissions-Policy")) headers.set("Permissions-Policy", "geolocation=(), payment=(), usb=()");
  if ((headers.get("Content-Type") ?? "").includes("text/html") && !headers.has("Content-Security-Policy-Report-Only")) {
    headers.set("Content-Security-Policy-Report-Only", "object-src 'none'; base-uri 'self'");
  }
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}