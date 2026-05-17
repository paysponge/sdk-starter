# Sponge SDK Starter Pack

Runnable examples for the Sponge TypeScript and Python SDKs.

Use `SpongeWallet` when one agent is acting with its own wallet. Use `SpongePlatform` when your backend creates and manages many agents.

## Layout

```text
sponge-sdk-starter-pack/
  .env.example
  typescript/
    src/
      wallet.ts
      platform.ts
      transfer.ts
      mcp-claude.ts
  python/
    examples/
      wallet.py
      platform.py
      transfer.py
      mcp_claude.py
```

## Setup

```bash
cp .env.example .env
```

Set `SPONGE_API_KEY` for wallet examples and `SPONGE_MASTER_KEY` for platform examples.

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
npm run mcp:claude
```

The transfer example exits without sending funds unless `RUN_TRANSFER=true` is set.

## Python

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
python examples/transfer.py
pip install -e ".[claude]"
python examples/mcp_claude.py
```

The transfer example exits without sending funds unless `RUN_TRANSFER=true` is set.

## Environment Variables

| Name | Used by | Description |
| --- | --- | --- |
| `SPONGE_API_KEY` | Wallet examples | Agent-scoped Sponge key, such as `sponge_test_...` or `sponge_live_...` |
| `SPONGE_MASTER_KEY` | Platform examples | Master key for creating and managing agents |
| `SPONGE_API_URL` | All examples | Optional custom API base URL |
| `RUN_TRANSFER` | Transfer examples | Must be `true` before examples send funds |
| `TRANSFER_CHAIN` | Transfer examples | Defaults to `base` |
| `TRANSFER_TO` | Transfer examples | Recipient address |
| `TRANSFER_AMOUNT` | Transfer examples | Defaults to `1` |
| `TRANSFER_CURRENCY` | Transfer examples | Defaults to `USDC` |
