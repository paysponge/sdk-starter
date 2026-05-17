import asyncio

from claude_agent_sdk import ClaudeAgentOptions, query
from paysponge import SpongeWallet

from _env import load_dotenv, require_env, sponge_base_url


async def main() -> None:
    load_dotenv()

    wallet = SpongeWallet.connect(
        api_key=require_env("SPONGE_API_KEY"),
        base_url=sponge_base_url(),
    )
    mcp = wallet.mcp()

    async for message in query(
        prompt="Check my Sponge wallet balance and summarize it briefly.",
        options=ClaudeAgentOptions(
            mcp_servers={
                "wallet": {
                    "type": "http",
                    "url": mcp.url,
                    "headers": mcp.headers,
                },
            },
            allowed_tools=["mcp__wallet__*"],
        ),
    ):
        print(message)


asyncio.run(main())
