/** Bobby's confirmed minimum as of October 24, 2026; older feeds must not override it. */
export const CONFIRMED_LEGAL_COST_FLOOR_USD = 5_000_000;

export function currentLegalCostTotal(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) && value > CONFIRMED_LEGAL_COST_FLOOR_USD
    ? value
    : null;
}