import os

from paysponge import SpongeWallet

from _env import load_dotenv, require_env, sponge_base_url

load_dotenv()

if os.environ.get("RUN_TRANSFER") != "true":
    print("Transfer is disabled. Set RUN_TRANSFER=true after reviewing the recipient and amount.")
    raise SystemExit(0)

wallet = SpongeWallet.connect(
    api_key=require_env("SPONGE_API_KEY"),
    base_url=sponge_base_url(),
)

tx = wallet.transfer(
    chain=os.environ.get("TRANSFER_CHAIN", "base"),
    to=require_env("TRANSFER_TO"),
    amount=os.environ.get("TRANSFER_AMOUNT", "1"),
    currency=os.environ.get("TRANSFER_CURRENCY", "USDC"),
)

print("Transfer submitted")
print(tx)
