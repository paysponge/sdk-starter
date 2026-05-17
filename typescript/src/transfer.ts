import { SpongeWallet } from "@paysponge/sdk";
import { requireEnv, spongeBaseUrl } from "./env.js";

const SEND_TRANSFER = false;
const TRANSFER = {
  chain: "base",
  to: "0x0000000000000000000000000000000000000000",
  amount: "1",
  currency: "USDC",
} as const;

if (!SEND_TRANSFER) {
  console.log("Transfer is disabled. Edit src/transfer.ts and set SEND_TRANSFER=true after reviewing the recipient and amount.");
  process.exit(0);
}

const wallet = await SpongeWallet.connect({
  apiKey: requireEnv("SPONGE_API_KEY"),
  baseUrl: spongeBaseUrl(),
});

type TransferOptions = Parameters<typeof wallet.transfer>[0];

const tx = await wallet.transfer({
  chain: TRANSFER.chain as TransferOptions["chain"],
  to: TRANSFER.to,
  amount: TRANSFER.amount,
  currency: TRANSFER.currency as TransferOptions["currency"],
});

console.log("Transfer submitted");
console.log(tx);
