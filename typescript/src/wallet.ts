import { SpongeWallet } from "@paysponge/sdk";
import { requireEnv, spongeBaseUrl } from "./env.js";

const wallet = await SpongeWallet.connect({
  apiKey: requireEnv("SPONGE_API_KEY"),
  baseUrl: spongeBaseUrl(),
});

const agent = await wallet.getAgent();
const addresses = await wallet.getAddresses();
const balances = await wallet.getBalances();

console.log("Agent");
console.log({ id: agent.id, name: agent.name });

console.log("Addresses");
console.log(addresses);

console.log("Balances");
console.log(balances);
