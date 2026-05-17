from paysponge import SpongeWallet

from _env import load_dotenv, require_env, sponge_base_url

load_dotenv()

SEND_TRANSFER = False
TRANSFER = {
    "chain": "base",
    "to": "0x0000000000000000000000000000000000000000",
    "amount": "1",
    "currency": "USDC",
}

if not SEND_TRANSFER:
    print(
        "Transfer is disabled. Edit examples/transfer.py and set "
        "SEND_TRANSFER=True after reviewing the recipient and amount."
    )
    raise SystemExit(0)

wallet = SpongeWallet.connect(
    api_key=require_env("SPONGE_API_KEY"),
    base_url=sponge_base_url(),
)

tx = wallet.transfer(
    chain=TRANSFER["chain"],
    to=TRANSFER["to"],
    amount=TRANSFER["amount"],
    currency=TRANSFER["currency"],
)

print("Transfer submitted")
print(tx)
