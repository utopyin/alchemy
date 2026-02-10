import alchemy from "alchemy";
import { Worker } from "alchemy/cloudflare";

const app = await alchemy("cloudflare-worker-request-abort");

const worker = await Worker("request-abort", {
  entrypoint: "src/worker.ts",
  compatibilityDate: "2025-05-22",
  compatibilityFlags: ["enable_request_signal"],
});

console.log(`worker.url: ${worker.url}`);

await app.finalize();
