import { createServerFn } from "@tanstack/react-start";

export const getIpfsUrl = createServerFn({ method: "GET" })
  .inputValidator((input: { cid: string }) => {
    if (!input || typeof input.cid !== "string" || !/^[a-zA-Z0-9]+$/.test(input.cid)) {
      throw new Error("Invalid CID");
    }
    if (input.cid.length > 100) throw new Error("CID too long");
    return input;
  })
  .handler(async ({ data }) => {
    const gateway = process.env.IPFS_GATEWAY;
    if (!gateway) throw new Error("IPFS gateway not configured");
    // Normalize: strip trailing slash, ensure scheme
    const base = gateway.replace(/\/$/, "");
    const withScheme = /^https?:\/\//.test(base) ? base : `https://${base}`;
    return { url: `${withScheme}/ipfs/${data.cid}` };
  });
