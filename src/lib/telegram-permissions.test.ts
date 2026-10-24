import { describe, expect, it } from "vitest";
import { hasTelegramCommandAccess, isTelegramAdministrator } from "./telegram-permissions";

describe("Telegram command permissions", () => {
  it("allows verified creators and administrators, not ordinary or restricted members", () => {
    expect(isTelegramAdministrator("creator")).toBe(true);
    expect(isTelegramAdministrator("administrator")).toBe(true);
    for (const status of ["member", "restricted", "left", "kicked", undefined]) {
      expect(isTelegramAdministrator(status)).toBe(false);
    }
  });

  it("retains Bobby's explicitly authorized sender access", () => {
    expect(hasTelegramCommandAccess({ userId: 813867061, explicitlyAuthorized: true, administrator: false })).toBe(true);
  });

  it("does not trust a group chat alone", () => {
    expect(hasTelegramCommandAccess({ userId: 123, explicitlyAuthorized: false, administrator: false })).toBe(false);
  });

  it("rejects missing, bot, or anonymous group senders even with admin-like claims", () => {
    const base = { userId: 123, explicitlyAuthorized: false, administrator: true };
    expect(hasTelegramCommandAccess({ ...base, userId: undefined })).toBe(false);
    expect(hasTelegramCommandAccess({ ...base, isBot: true })).toBe(false);
    expect(hasTelegramCommandAccess({ ...base, hasSenderChat: true })).toBe(false);
  });
});