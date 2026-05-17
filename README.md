# Sponge SDK Starter

Starter examples for the Sponge TypeScript and Python SDKs.

Use `SpongeWallet` for one agent acting with its own wallet. Use `SpongePlatform` for backend code that creates and manages agents.

## Setup

```bash
cp .env.example .env
```

Get an agent API key from https://wallet.paysponge.com, then set it as `SPONGE_API_KEY` in `.env`.

Use a `sponge_live_...` key for wallet examples. Use `SPONGE_MASTER_KEY` only for platform examples that create and manage agents.

For the AgentPhone examples, create an AgentPhone API key from https://agentphone.ai/settings and set it as `AGENTPHONE_API_KEY`.

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

The AgentPhone examples create or reuse an AgentPhone agent, reuse an existing number when available, and can send a text through x402 or MPP. They will not provision a number or send a text unless you edit `typescript/src/agentphone-x402.ts` or `typescript/src/agentphone-mpp.ts` and enable the constants at the top.

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

The AgentPhone examples create or reuse an AgentPhone agent, reuse an existing number when available, and can send a text through x402 or MPP. They will not provision a number or send a text unless you edit `python/examples/agentphone_x402.py` or `python/examples/agentphone_mpp.py` and enable the constants at the top.

## Docs

- SDK overview: https://docs.paysponge.com/wallet/sdk
- Wallet SDK: https://docs.paysponge.com/wallet/sdk-wallet
- Platform SDK: https://docs.paysponge.com/wallet/sdk-platform
- TypeScript examples: https://docs.paysponge.com/wallet/typescript-examples
- Python examples: https://docs.paysponge.com/wallet/python-examples
- AgentPhone service: https://catalog.paysponge.com/services/agentphone
- AgentPhone docs: https://docs.agentphone.ai/documentation/
