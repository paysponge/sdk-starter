from _env import load_dotenv, require_env, sponge_base_url
from paysponge import SpongeWallet

load_dotenv()
wallet = SpongeWallet.connect(
    api_key=require_env("SPONGE_API_KEY"),
    base_url=sponge_base_url(),
)

agent = wallet.get_agent()
addresses = wallet.get_addresses()
balances = wallet.get_balances()

print("Agent")
print({"id": agent.id, "name": getattr(agent, "name", None)})

print("Addresses")
print(addresses)

print("Balances")
print(balances)
