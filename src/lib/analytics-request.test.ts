import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { isSameOriginAnalyticsRequest } from "./analytics-request";

describe("analytics origin checks", () => {
  const request = (headers: Record<string, string>) => new Request("https://texitcoin.org/api/public/track", { headers });
  it("accepts the site's own browser requests", () => {
    assert.equal(isSameOriginAnalyticsRequest(request({ origin: "https://texitcoin.org", "sec-fetch-site": "same-origin" })), true);
    assert.equal(isSameOriginAnalyticsRequest(request({ "sec-fetch-site": "same-origin" })), true);
  });
  it("rejects external and unverifiable origins", () => {
    assert.equal(isSameOriginAnalyticsRequest(request({ origin: "https://example.com" })), false);
    assert.equal(isSameOriginAnalyticsRequest(request({ "sec-fetch-site": "cross-site" })), false);
    assert.equal(isSameOriginAnalyticsRequest(request({})), false);
  });
});