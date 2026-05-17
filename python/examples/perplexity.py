from paysponge import SpongeWallet

from _env import load_dotenv, require_env, sponge_base_url

load_dotenv()

PERPLEXITY_BASE_URL = "https://pplx.x402.paysponge.com"

wallet = SpongeWallet.connect(
    api_key=require_env("SPONGE_API_KEY"),
    base_url=sponge_base_url(),
)
agent_id = wallet.get_agent().id

response = wallet.x402_fetch(
    url=f"{PERPLEXITY_BASE_URL}/search",
    method="POST",
    headers={"Content-Type": "application/json"},
    body={
        "query": "What is Sponge wallet SDK?",
        "max_results": 3,
    },
    preferred_chain="base",
    agent_id=agent_id,
)

data = response.get("data", response) if isinstance(response, dict) else response
results = data.get("results", []) if isinstance(data, dict) else []

print("Perplexity search results")
for result in results:
    print({"title": result.get("title"), "url": result.get("url")})
