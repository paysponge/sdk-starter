import type { SpongeWallet } from "@paysponge/sdk";
import { requireEnv } from "./env.js";

export type PaidFetchOptions = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: unknown;
};

export type PaidFetch = (options: PaidFetchOptions) => Promise<unknown>;

export type AgentPhoneConfig = {
  baseUrl: string;
  fetchPaid: PaidFetch;
  exampleName: string;
  createNumberIfNone: boolean;
  sendText: boolean;
  toNumber: string;
  messageBody: string;
};

type AgentPhoneAgent = {
  id: string;
  name: string;
  numbers?: AgentPhoneNumber[] | null;
};

type AgentPhoneNumber = {
  id: string;
  phoneNumber: string;
  status: string;
  agentId?: string | null;
};

type ListResponse<T> = {
  data: T[];
};

export async function runAgentPhoneExample(config: AgentPhoneConfig) {
  const agentPhoneApiKey = requireEnv("AGENTPHONE_API_KEY");

  const request = async <T>(
    path: string,
    options: {
      method?: "GET" | "POST" | "PATCH" | "DELETE";
      body?: unknown;
    } = {},
  ): Promise<T> => {
    return config.fetchPaid({
      url: `${config.baseUrl}${path}`,
      method: options.method ?? "GET",
      headers: {
        Authorization: `Bearer ${agentPhoneApiKey}`,
        "Content-Type": "application/json",
      },
      body: options.body,
    }) as Promise<T>;
  };

  const agents = await request<ListResponse<AgentPhoneAgent>>("/v1/agents");
  let agent = agents.data.find((item) => item.name === config.exampleName);

  if (!agent) {
    agent = await request<AgentPhoneAgent>("/v1/agents", {
      method: "POST",
      body: {
        name: config.exampleName,
        description: "Created by the Sponge SDK starter AgentPhone example",
        voiceMode: "hosted",
        enableMessaging: true,
        systemPrompt: "You are a concise assistant reachable by phone and text.",
      },
    });
  }

  console.log("AgentPhone agent");
  console.log({ id: agent.id, name: agent.name });

  const numbers = await request<ListResponse<AgentPhoneNumber>>("/v1/numbers");
  let number =
    numbers.data.find((item) => item.agentId === agent.id && item.status !== "released") ??
    numbers.data.find((item) => item.status !== "released");

  if (!number) {
    if (!config.createNumberIfNone) {
      console.log("No reusable AgentPhone number found. Set CREATE_NUMBER_IF_NONE=true in this file to provision one.");
      return;
    }

    number = await request<AgentPhoneNumber>("/v1/numbers", {
      method: "POST",
      body: {
        country: "US",
        agentId: agent.id,
      },
    });
  }

  if (number.agentId !== agent.id) {
    await request(`/v1/agents/${agent.id}/numbers`, {
      method: "POST",
      body: {
        numberId: number.id,
      },
    });
  }

  console.log("AgentPhone number");
  console.log({ id: number.id, phoneNumber: number.phoneNumber });

  if (!config.sendText) {
    console.log("Text sending is disabled. Set SEND_TEXT=true in this file after reviewing TO_NUMBER and MESSAGE_BODY.");
    return;
  }

  const message = await request("/v1/messages", {
    method: "POST",
    body: {
      agent_id: agent.id,
      number_id: number.id,
      to_number: config.toNumber,
      body: config.messageBody,
    },
  });

  console.log("Sent message");
  console.log(message);
}
