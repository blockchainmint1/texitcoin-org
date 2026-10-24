import { describe, it as test } from "node:test";
import { strict as assert } from "node:assert";
import { currentLegalCostTotal } from "./legal-costs";

describe("current out-of-pocket legal costs", () => {
  test("a stale total cannot override Bobby's confirmed costs above $5 million", () => {
    assert.equal(currentLegalCostTotal(2_704_000), null);
    assert.equal(currentLegalCostTotal(5_000_000), null);
  });

  test("a current total above $5 million is preserved", () => {
    assert.equal(currentLegalCostTotal(5_125_250), 5_125_250);
  });

  test("invalid totals do not become current costs", () => {
    for (const value of [undefined, null, "5125250", NaN, Infinity, -1]) {
      assert.equal(currentLegalCostTotal(value), null);
    }
  });
});