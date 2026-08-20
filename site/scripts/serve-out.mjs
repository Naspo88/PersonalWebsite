import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const CONTENT_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

export function serveDirectory(root, port) {
  const server = createServer(async (request, response) => {
    const filePath = await resolveFile(root, request.url ?? "/");

    if (!filePath) {
      response.writeHead(404).end("Not found");
      return;
    }

    response.writeHead(200, {
      "content-type": CONTENT_TYPES[extname(filePath)] ?? "application/octet-stream",
    });
    createReadStream(filePath).pipe(response);
  });

  return new Promise((resolve) => {
    server.listen(port, () => resolve(server));
  });
}

async function resolveFile(root, url) {
  const pathname = decodeURIComponent(new URL(url, "http://localhost").pathname);
  const safePath = normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  const candidates = safePath.endsWith("/")
    ? [join(root, safePath, "index.html")]
    : [join(root, safePath), join(root, `${safePath}/index.html`)];

  for (const candidate of candidates) {
    const stats = await stat(candidate).catch(() => null);
    if (stats?.isFile()) return candidate;
  }

  return null;
}
