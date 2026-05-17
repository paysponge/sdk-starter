from collections.abc import Callable
from typing import Any

PaidFetch = Callable[..., Any]


def run_agentphone_example(
    *,
    base_url: str,
    paid_fetch: PaidFetch,
    example_name: str,
    existing_number_id: str | None,
    create_number_if_none: bool,
    send_text: bool,
    to_number: str,
    message_body: str,
) -> None:
    def request(path: str, *, method: str = "GET", body: dict[str, Any] | None = None):
        return paid_fetch(
            url=f"{base_url}{path}",
            method=method,
            headers={
                "Content-Type": "application/json",
            },
            body=body,
        )

    agent = request(
        "/v1/agents",
        method="POST",
        body={
            "name": example_name,
            "description": "Created by the Sponge SDK starter AgentPhone example",
            "voiceMode": "hosted",
            "enableMessaging": True,
            "systemPrompt": "You are a concise assistant reachable by phone and text.",
        },
    )

    print("AgentPhone agent")
    print({"id": agent["id"], "name": agent["name"]})

    number_id = existing_number_id
    phone_number = None

    if number_id is None:
        if not create_number_if_none:
            print("No existing number configured. Set EXISTING_NUMBER_ID or CREATE_NUMBER_IF_NONE=True in this file.")
            return

        number = request(
            "/v1/numbers",
            method="POST",
            body={
                "country": "US",
                "agentId": agent["id"],
            },
        )
        number_id = number["id"]
        phone_number = number["phoneNumber"]

    request(
        f"/v1/agents/{agent['id']}/numbers",
        method="POST",
        body={"numberId": number_id},
    )

    print("AgentPhone number")
    print({"id": number_id, "phoneNumber": phone_number})

    if not send_text:
        print(
            "Text sending is disabled. Set SEND_TEXT=True in this file after "
            "reviewing TO_NUMBER and MESSAGE_BODY."
        )
        return

    message = request(
        "/v1/messages",
        method="POST",
        body={
            "agent_id": agent["id"],
            "number_id": number_id,
            "to_number": to_number,
            "body": message_body,
        },
    )

    print("Sent message")
    print(message)
