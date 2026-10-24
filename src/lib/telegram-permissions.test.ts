import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { hasTelegramCommandAccess, isTelegramAdministrator } from "./telegram-permissions";

describe("Telegram command permissions", () => {
  it("allows verified creators and administrators, not ordinary or restricted members", () => {
    assert.equal(isTelegramAdministrator("creator"), true);
    assert.equal(isTelegramAdministrator("administrator"), true);
    for (const status of ["member", "restricted", "left", "kicked", undefined]) {
      assert.equal(isTelegramAdministrator(status), false);
    }
  });

  it("retains Bobby's explicitly authorized sender access", () => {
    assert.equal(hasTelegramCommandAccess({ userId: 813867061, explicitlyAuthorized: true, administrator: false }), true);
  });

  it("does not trust a group chat alone", () => {
    assert.equal(hasTelegramCommandAccess({ userId: 123, explicitlyAuthorized: false, administrator: false }), false);
  });

  it("rejects missing, bot, or anonymous group senders even with admin-like claims", () => {
    const base = { userId: 123, explicitlyAuthorized: false, administrator: true };
    assert.equal(hasTelegramCommandAccess({ ...base, userId: undefined }), false);
    assert.equal(hasTelegramCommandAccess({ ...base, isBot: true }), false);
    assert.equal(hasTelegramCommandAccess({ ...base, hasSenderChat: true }), false);
  });
});