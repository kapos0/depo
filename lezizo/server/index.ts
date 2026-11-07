import "dotenv/config";
import { createServer } from "node:http";
import { auth } from "./auth";
import { suggestRecipe } from "./gemini";

const port = Number(process.env.PORT ?? 3000);

createServer(async (request, response) => {
  const origin = request.headers.origin ?? "*";
  response.setHeader("Access-Control-Allow-Origin", origin);
  response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  if (request.method === "OPTIONS") {
    response.writeHead(204);
    response.end();
    return;
  }

  try {
    const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);
    if (url.pathname === "/api/ai" && request.method === "POST") {
      const body = await readBody(request);
      const result = await suggestRecipe(String(body.ingredients ?? ""));
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(result));
      return;
    }

    const body = request.method === "GET" || request.method === "HEAD" ? undefined : await readBodyText(request);
    const authResponse = await auth.handler(new Request(url, {
      method: request.method,
      headers: request.headers as HeadersInit,
      body,
    }));
    response.writeHead(authResponse.status, Object.fromEntries(authResponse.headers.entries()));
    response.end(Buffer.from(await authResponse.arrayBuffer()));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error.";
    response.writeHead(500, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ error: message }));
  }
}).listen(port, () => {
  console.log(`Lezizo server listening on http://localhost:${port}`);
});

async function readBody(request: import("node:http").IncomingMessage) {
  const text = await readBodyText(request);
  return text ? JSON.parse(text) as Record<string, unknown> : {};
}

function readBodyText(request: import("node:http").IncomingMessage) {
  return new Promise<string>((resolve, reject) => {
    let data = "";
    request.setEncoding("utf8");
    request.on("data", (chunk) => { data += chunk; });
    request.on("end", () => resolve(data));
    request.on("error", reject);
  });
}
