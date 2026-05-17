import { SpongePlatform } from "@paysponge/sdk";
import { requireEnv, spongeBaseUrl } from "./env.js";

const platform = await SpongePlatform.connect({
  apiKey: requireEnv("SPONGE_MASTER_KEY"),
  baseUrl: spongeBaseUrl(),
});

const { agent, apiKey } = await platform.createAgent({
  name: `starter-agent-${Date.now()}`,
  description: "Created from the Sponge TypeScript starter pack",
  dailySpendingLimit: "10",
});

console.log("Created agent");
console.log({ id: agent.id, name: agent.name });

const wallet = await platform.connectAgent({
  apiKey,
  agentId: agent.id,
});

console.log("Agent addresses");
console.log(await wallet.getAddresses());
