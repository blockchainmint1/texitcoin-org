import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { matchesPreviewSecret } from "./secret-comparison";

describe("draft preview access", () => {
  const token = "test-only-draft-token-123456789";
  it("allows only the exact configured secret", () => {
    assert.equal(matchesPreviewSecret(token, token), true);
    assert.equal(matchesPreviewSecret(token, `${token}x`), false);
    assert.equal(matchesPreviewSecret(token, "preview"), false);
  });
  it("rejects missing, short, oversized and non-string secrets", () => {
    assert.equal(matchesPreviewSecret(undefined, token), false);
    assert.equal(matchesPreviewSecret("short", "short"), false);
    assert.equal(matchesPreviewSecret(token, null), false);
    assert.equal(matchesPreviewSecret(token, "x".repeat(1025)), false);
  });
});