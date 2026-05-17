import { SpongeWallet } from "@paysponge/sdk";
import { requireEnv, spongeBaseUrl } from "./env.js";

if (process.env.RUN_TRANSFER !== "true") {
  console.log("Transfer is disabled. Set RUN_TRANSFER=true after reviewing the recipient and amount.");
  process.exit(0);
}

const wallet = await SpongeWallet.connect({
  apiKey: requireEnv("SPONGE_API_KEY"),
  baseUrl: spongeBaseUrl(),
});

type TransferOptions = Parameters<typeof wallet.transfer>[0];

const tx = await wallet.transfer({
  chain: (process.env.TRANSFER_CHAIN ?? "base") as TransferOptions["chain"],
  to: requireEnv("TRANSFER_TO"),
  amount: process.env.TRANSFER_AMOUNT ?? "1",
  currency: (process.env.TRANSFER_CURRENCY ?? "USDC") as TransferOptions["currency"],
});

console.log("Transfer submitted");
console.log(tx);
