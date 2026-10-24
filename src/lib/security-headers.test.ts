import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { withSecurityHeaders } from "./security-headers";

describe("non-breaking response headers", () => {
  it("preserves response status, content and existing policy", async () => {
    const response = withSecurityHeaders(new Response("ok", { status: 201, headers: { "Content-Type": "text/html", "Referrer-Policy": "no-referrer" } }));
    assert.equal(response.status, 201);
    assert.equal(await response.text(), "ok");
    assert.equal(response.headers.get("Referrer-Policy"), "no-referrer");
    assert.equal(response.headers.get("X-Content-Type-Options"), "nosniff");
  });
  it("does not enforce CSP or frame restrictions that would block previews or videos", () => {
    const response = withSecurityHeaders(new Response("ok", { headers: { "Content-Type": "text/html" } }));
    assert.equal(response.headers.has("Content-Security-Policy"), false);
    assert.equal(response.headers.has("X-Frame-Options"), false);
    assert.equal(response.headers.get("Content-Security-Policy-Report-Only"), "object-src 'none'; base-uri 'self'");
  });
});