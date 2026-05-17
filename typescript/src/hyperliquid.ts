import { SpongeWallet } from "@paysponge/sdk";
import { requireEnv, spongeBaseUrl } from "./env.js";

const wallet = await SpongeWallet.connect({
  apiKey: requireEnv("SPONGE_API_KEY"),
  baseUrl: spongeBaseUrl(),
});

const status = await wallet.hyperliquid({ action: "status" });
const markets = await wallet.hyperliquid({ action: "markets", limit: 5 });
const positions = await wallet.hyperliquid({ action: "positions" });
const orders = await wallet.hyperliquid({ action: "orders" });

console.log("Hyperliquid status");
console.log(status);

console.log("Hyperliquid markets");
console.log(markets);

console.log("Hyperliquid positions");
console.log(positions);

console.log("Hyperliquid open orders");
console.log(orders);
