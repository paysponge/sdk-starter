import { SpongeWallet } from "@paysponge/sdk";
import { requireEnv, spongeBaseUrl } from "./env.js";
import { type PaidFetchOptions, runAgentPhoneExample } from "./agentphone.js";

const CREATE_NUMBER_IF_NONE = false;
const EXISTING_NUMBER_ID = null;
const SEND_TEXT = false;
const TO_NUMBER = "+14155551234";
const MESSAGE_BODY = "Hello from the Sponge SDK starter via AgentPhone MPP.";

const wallet = await SpongeWallet.connect({
  apiKey: requireEnv("SPONGE_API_KEY"),
  baseUrl: spongeBaseUrl(),
});

await runAgentPhoneExample({
  baseUrl: "https://api.agentphone.ai/mpp",
  fetchPaid: (options: PaidFetchOptions) =>
    wallet.mppFetch({
      ...options,
      chain: "tempo",
  }),
  exampleName: "sponge-sdk-starter-mpp",
  existingNumberId: EXISTING_NUMBER_ID,
  createNumberIfNone: CREATE_NUMBER_IF_NONE,
  sendText: SEND_TEXT,
  toNumber: TO_NUMBER,
  messageBody: MESSAGE_BODY,
});
