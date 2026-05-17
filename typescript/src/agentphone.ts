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
  existingNumberId: string | null;
  createNumberIfNone: boolean;
  sendText: boolean;
  toNumber: string;
  messageBody: string;
};

type AgentPhoneAgent = {
  id: string;
  name: string;
};

type AgentPhoneNumber = {
  id: string;
  phoneNumber: string;
  status: string;
};

function unwrapPaidResponse<T>(response: unknown): T {
  if (
    response &&
    typeof response === "object" &&
    "ok" in response &&
    (response as { ok?: unknown }).ok === true &&
    "data" in response
  ) {
    return (response as { data: T }).data;
  }
  return response as T;
}

export async function runAgentPhoneExample(config: AgentPhoneConfig) {
  const request = async <T>(
    path: string,
    options: {
      method?: "GET" | "POST" | "PATCH" | "DELETE";
      body?: unknown;
    } = {},
  ): Promise<T> => {
    const response = await config.fetchPaid({
      url: `${config.baseUrl}${path}`,
      method: options.method ?? "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: options.body,
    });
    return unwrapPaidResponse<T>(response);
  };

  const agent = await request<AgentPhoneAgent>("/v1/agents", {
    method: "POST",
    body: {
      name: config.exampleName,
      description: "Created by the Sponge SDK starter AgentPhone example",
      voiceMode: "hosted",
      enableMessaging: true,
      systemPrompt: "You are a concise assistant reachable by phone and text.",
    },
  });

  console.log("AgentPhone agent");
  console.log({ id: agent.id, name: agent.name });

  let numberId = config.existingNumberId;
  let phoneNumber: string | undefined;

  if (!numberId) {
    if (!config.createNumberIfNone) {
      console.log("No existing number configured. Set EXISTING_NUMBER_ID or CREATE_NUMBER_IF_NONE=true in this file.");
      return;
    }

    const number = await request<AgentPhoneNumber>("/v1/numbers", {
      method: "POST",
      body: {
        country: "US",
        agentId: agent.id,
      },
    });
    numberId = number.id;
    phoneNumber = number.phoneNumber;
  }

  await request(`/v1/agents/${agent.id}/numbers`, {
    method: "POST",
    body: {
      numberId,
    },
  });

  console.log("AgentPhone number");
  console.log({ id: numberId, phoneNumber });

  if (!config.sendText) {
    console.log("Text sending is disabled. Set SEND_TEXT=true in this file after reviewing TO_NUMBER and MESSAGE_BODY.");
    return;
  }

  const message = await request("/v1/messages", {
    method: "POST",
    body: {
      agent_id: agent.id,
      number_id: numberId,
      to_number: config.toNumber,
      body: config.messageBody,
    },
  });

  console.log("Sent message");
  console.log(message);
}
