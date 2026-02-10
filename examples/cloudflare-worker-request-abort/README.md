# Cloudflare Worker Request Abort Repro

This example reproduces request cancellation behavior in local dev mode for a Cloudflare Worker created with Alchemy.

## Run with Alchemy dev

1. Start local dev:

```sh
bun run dev
```

2. Copy the printed `worker.url`.

3. In another terminal, connect and abort:

```sh
WORKER_URL="http://localhost:3000" bun run repro:abort
```

4. Observe logs from `alchemy dev`.

The current bug reproduction is that these callbacks do not fire:

- `req.signal.addEventListener("abort", ...)`
- `ReadableStream.cancel(...)`

## Compare with Wrangler dev

1. Start Wrangler:

```sh
bun run wrangler:dev
```

2. Run the same abort client against Wrangler's URL:

```sh
WORKER_URL="http://localhost:8787" bun run repro:abort
```
