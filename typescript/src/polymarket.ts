import { SpongeWallet } from "@paysponge/sdk";
import { requireEnv, spongeBaseUrl } from "./env.js";

const wallet = await SpongeWallet.connect({
  apiKey: requireEnv("SPONGE_API_KEY"),
  baseUrl: spongeBaseUrl(),
});

const status = await wallet.polymarket({ action: "status" });
const markets = await wallet.polymarket({
  action: "search_markets",
  query: "crypto",
  limit: 5,
});
const positions = await wallet.polymarket({ action: "positions" });
const orders = await wallet.polymarket({ action: "orders" });

console.log("Polymarket status");
console.log(status);

console.log("Polymarket markets");
console.log(markets);

console.log("Polymarket positions");
console.log(positions);

console.log("Polymarket open orders");
console.log(orders);
