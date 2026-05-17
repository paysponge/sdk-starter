from typing import Any

from paysponge import SpongeWallet

from _env import load_dotenv, require_env, sponge_base_url

load_dotenv()

wallet = SpongeWallet.connect(
    api_key=require_env("SPONGE_API_KEY"),
    base_url=sponge_base_url(),
)


def polymarket(**kwargs: Any) -> Any:
    if hasattr(wallet, "polymarket"):
        return wallet.polymarket(**kwargs)
    return wallet._request("POST", "/api/polymarket", body=kwargs)


status = polymarket(action="status")
markets = polymarket(action="search_markets", query="crypto", limit=5)
positions = polymarket(action="positions")
orders = polymarket(action="orders")

print("Polymarket status")
print(status)

print("Polymarket markets")
print(markets)

print("Polymarket positions")
print(positions)

print("Polymarket open orders")
print(orders)
