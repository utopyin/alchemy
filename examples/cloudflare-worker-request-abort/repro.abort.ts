const workerUrl = "http://localhost:1337";
const abortAfterMs = Number(process.env.ABORT_AFTER_MS ?? 3000);

const controller = new AbortController();

console.log(`Connecting to SSE endpoint: ${workerUrl}`);
const response = await fetch(workerUrl, {
  headers: {
    Accept: "text/event-stream",
  },
  signal: controller.signal,
});

if (!response.ok) {
  throw new Error(`Expected 2xx response, got ${response.status}`);
}
if (!response.body) {
  throw new Error("Response body is missing");
}

console.log(`Connected. Will abort in ${abortAfterMs}ms...`);
setTimeout(() => {
  console.log("Aborting client request now...");
  controller.abort("manual abort for reproduction");
}, abortAfterMs);

const reader = response.body.getReader();
try {
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      console.log("Reader completed");
      break;
    }
    console.log(`Received chunk (${value.byteLength} bytes)`);
  }
} catch (error) {
  console.log("Reader threw after abort:", error);
}

console.log("Done. Check the worker dev logs for abort/cancel callbacks.");

export {};
