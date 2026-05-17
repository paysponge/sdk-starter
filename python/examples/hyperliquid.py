from typing import Any

from paysponge import SpongeWallet

from _env import load_dotenv, require_env, sponge_base_url

load_dotenv()

wallet = SpongeWallet.connect(
    api_key=require_env("SPONGE_API_KEY"),
    base_url=sponge_base_url(),
)


def hyperliquid(**kwargs: Any) -> Any:
    if hasattr(wallet, "hyperliquid"):
        return wallet.hyperliquid(**kwargs)
    return wallet._request("POST", "/api/hyperliquid", body=kwargs)


status = hyperliquid(action="status")
markets = hyperliquid(action="markets", limit=5)
positions = hyperliquid(action="positions")
orders = hyperliquid(action="orders")

print("Hyperliquid status")
print(status)

print("Hyperliquid markets")
print(markets)

print("Hyperliquid positions")
print(positions)

print("Hyperliquid open orders")
print(orders)
