/** Authorization decisions use Telegram's verified sender and membership response. */
export function isTelegramAdministrator(status: unknown): boolean {
  return status === "creator" || status === "administrator";
}

export function hasTelegramCommandAccess(input: {
  userId: number | undefined;
  isBot?: boolean;
  hasSenderChat?: boolean;
  explicitlyAuthorized: boolean;
  administrator: boolean;
}): boolean {
  if (!Number.isSafeInteger(input.userId) || input.isBot || input.hasSenderChat) return false;
  return input.explicitlyAuthorized || input.administrator;
}