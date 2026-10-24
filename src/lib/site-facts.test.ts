import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { SITE_FACTS } from "./site-facts";

describe("public TEXITcoin specifications", () => {
  it("reports the published 353,396,296 TXC supply cap", () => {
    assert.equal(SITE_FACTS.supplyCap, 353_396_296);
  });
  it("identifies TXC as its own Scrypt proof-of-work Layer 1", () => {
    assert.equal(SITE_FACTS.network, "TEXITcoin Layer 1 (Scrypt proof-of-work)");
  });
});