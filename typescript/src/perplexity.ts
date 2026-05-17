import { SpongeWallet } from "@paysponge/sdk";
import { requireEnv, spongeBaseUrl } from "./env.js";

const PERPLEXITY_BASE_URL = "https://pplx.x402.paysponge.com";

const wallet = await SpongeWallet.connect({
  apiKey: requireEnv("SPONGE_API_KEY"),
  baseUrl: spongeBaseUrl(),
});

const response = await wallet.x402Fetch({
  url: `${PERPLEXITY_BASE_URL}/search`,
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: {
    query: "What is Sponge wallet SDK?",
    max_results: 3,
  },
  preferredChain: "base",
});

const data =
  response && typeof response === "object" && "data" in response
    ? (response as { data: unknown }).data
    : response;
const results =
  data && typeof data === "object" && "results" in data
    ? (data as { results: Array<{ title?: string; url?: string }> }).results
    : [];

console.log("Perplexity search results");
for (const result of results) {
  console.log({ title: result.title, url: result.url });
}
