from paysponge import SpongeWallet

from _env import load_dotenv, require_env, sponge_base_url
from agentphone import run_agentphone_example

load_dotenv()

CREATE_NUMBER_IF_NONE = False
EXISTING_NUMBER_ID = None
SEND_TEXT = False
TO_NUMBER = "+14155551234"
MESSAGE_BODY = "Hello from the Sponge SDK starter via AgentPhone MPP."

wallet = SpongeWallet.connect(
    api_key=require_env("SPONGE_API_KEY"),
    base_url=sponge_base_url(),
)


def mpp_fetch(**kwargs):
    return wallet.mpp_fetch(
        **kwargs,
        chain="tempo",
    )


run_agentphone_example(
    base_url="https://api.agentphone.ai/mpp",
    paid_fetch=mpp_fetch,
    example_name="sponge-sdk-starter-mpp",
    existing_number_id=EXISTING_NUMBER_ID,
    create_number_if_none=CREATE_NUMBER_IF_NONE,
    send_text=SEND_TEXT,
    to_number=TO_NUMBER,
    message_body=MESSAGE_BODY,
)
