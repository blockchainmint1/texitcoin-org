import { describe, expect, test } from "bun:test";
import { currentLegalCostTotal } from "./legal-costs";

describe("current out-of-pocket legal costs", () => {
  test("a stale total cannot override Bobby's confirmed costs above $5 million", () => {
    expect(currentLegalCostTotal(2_704_000)).toBeNull();
    expect(currentLegalCostTotal(5_000_000)).toBeNull();
  });

  test("a current total above $5 million is preserved", () => {
    expect(currentLegalCostTotal(5_125_250)).toBe(5_125_250);
  });

  test("invalid totals do not become current costs", () => {
    for (const value of [undefined, null, "5125250", NaN, Infinity, -1]) {
      expect(currentLegalCostTotal(value)).toBeNull();
    }
  });
});