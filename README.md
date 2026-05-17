# Sponge SDK Starter

Starter examples for the Sponge TypeScript and Python SDKs.

Use `SpongeWallet` for one agent acting with its own wallet. Use `SpongePlatform` for backend code that creates and manages agents.

## Setup

```bash
cp .env.example .env
```

Get an agent API key from https://wallet.paysponge.com, then set it as `SPONGE_API_KEY` in `.env`.

Use a `sponge_live_...` key for wallet examples. Use `SPONGE_MASTER_KEY` only for platform examples that create and manage agents.

## TypeScript

```bash
cd typescript
npm install
npm run wallet
npm run platform
```

Optional examples:

```bash
npm run transfer
npm run agentphone:x402
npm run agentphone:mpp
npm run mcp:claude
```

The transfer example exits without sending funds unless you edit `typescript/src/transfer.ts` and set `SEND_TRANSFER=true`.

The AgentPhone examples use x402 or MPP directly. They create an AgentPhone agent, attach `EXISTING_NUMBER_ID` or provision a number when `CREATE_NUMBER_IF_NONE=true`, and can send a text when `SEND_TEXT=true`. The catalog currently exposes paid create-agent, create-number, and attach-number routes; `POST /v1/messages` must be registered as a paid route before the text step can succeed through x402 or MPP.

## Python

With `uv`:

```bash
cd python
uv sync
uv run python examples/wallet.py
uv run python examples/platform.py
```

Or with `pip`:

```bash
cd python
python -m venv .venv
source .venv/bin/activate
pip install -e .
python examples/wallet.py
python examples/platform.py
```

Optional examples:

```bash
uv run python examples/transfer.py
uv run python examples/agentphone_x402.py
uv run python examples/agentphone_mpp.py
uv sync --extra claude
uv run python examples/mcp_claude.py
```

With `pip`:

```bash
python examples/transfer.py
python examples/agentphone_x402.py
python examples/agentphone_mpp.py
pip install -e ".[claude]"
python examples/mcp_claude.py
```

The transfer example exits without sending funds unless you edit `python/examples/transfer.py` and set `SEND_TRANSFER=True`.

The AgentPhone examples use x402 or MPP directly. They create an AgentPhone agent, attach `EXISTING_NUMBER_ID` or provision a number when `CREATE_NUMBER_IF_NONE=True`, and can send a text when `SEND_TEXT=True`. The catalog currently exposes paid create-agent, create-number, and attach-number routes; `POST /v1/messages` must be registered as a paid route before the text step can succeed through x402 or MPP.

## Docs

- SDK overview: https://docs.paysponge.com/wallet/sdk
- Wallet SDK: https://docs.paysponge.com/wallet/sdk-wallet
- Platform SDK: https://docs.paysponge.com/wallet/sdk-platform
- TypeScript examples: https://docs.paysponge.com/wallet/typescript-examples
- Python examples: https://docs.paysponge.com/wallet/python-examples
- AgentPhone service: https://catalog.paysponge.com/services/agentphone
- AgentPhone docs: https://docs.agentphone.ai/documentation/
