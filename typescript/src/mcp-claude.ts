import { query } from "@anthropic-ai/claude-agent-sdk";
import { SpongeWallet } from "@paysponge/sdk";
import { requireEnv, spongeBaseUrl } from "./env.js";

const wallet = await SpongeWallet.connect({
  apiKey: requireEnv("SPONGE_API_KEY"),
  baseUrl: spongeBaseUrl(),
});

for await (const message of query({
  prompt: "Check my Sponge wallet balance and summarize it briefly.",
  options: {
    mcpServers: {
      wallet: {
        type: "http",
        ...wallet.mcp(),
      },
    },
    allowedTools: ["mcp__wallet__*"],
  },
})) {
  console.log(message);
}
