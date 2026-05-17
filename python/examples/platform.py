import time

from paysponge import SpongePlatform

from _env import load_dotenv, require_env, sponge_base_url

load_dotenv()

platform = SpongePlatform.connect(
    api_key=require_env("SPONGE_MASTER_KEY"),
    base_url=sponge_base_url(),
)

agent = platform.create_agent(
    name=f"starter-agent-{int(time.time())}",
    description="Created from the Sponge Python starter pack",
    daily_spending_limit="10",
)

print("Created agent")
print({"id": agent.id, "name": getattr(agent, "name", None)})
