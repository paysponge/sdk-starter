from collections.abc import Callable
from typing import Any

from _env import require_env

PaidFetch = Callable[..., Any]


def run_agentphone_example(
    *,
    base_url: str,
    paid_fetch: PaidFetch,
    example_name: str,
    create_number_if_none: bool,
    send_text: bool,
    to_number: str,
    message_body: str,
) -> None:
    agentphone_api_key = require_env("AGENTPHONE_API_KEY")

    def request(path: str, *, method: str = "GET", body: dict[str, Any] | None = None):
        return paid_fetch(
            url=f"{base_url}{path}",
            method=method,
            headers={
                "Authorization": f"Bearer {agentphone_api_key}",
                "Content-Type": "application/json",
            },
            body=body,
        )

    agents = request("/v1/agents")
    agent = next((item for item in agents["data"] if item["name"] == example_name), None)

    if agent is None:
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

    numbers = request("/v1/numbers")
    number = next(
        (
            item
            for item in numbers["data"]
            if item.get("agentId") == agent["id"] and item["status"] != "released"
        ),
        None,
    )
    if number is None:
        number = next(
            (item for item in numbers["data"] if item["status"] != "released"),
            None,
        )

    if number is None:
        if not create_number_if_none:
            print(
                "No reusable AgentPhone number found. Set CREATE_NUMBER_IF_NONE=True "
                "in this file to provision one."
            )
            return

        number = request(
            "/v1/numbers",
            method="POST",
            body={
                "country": "US",
                "agentId": agent["id"],
            },
        )

    if number.get("agentId") != agent["id"]:
        request(
            f"/v1/agents/{agent['id']}/numbers",
            method="POST",
            body={"numberId": number["id"]},
        )

    print("AgentPhone number")
    print({"id": number["id"], "phoneNumber": number["phoneNumber"]})

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
            "number_id": number["id"],
            "to_number": to_number,
            "body": message_body,
        },
    )

    print("Sent message")
    print(message)
