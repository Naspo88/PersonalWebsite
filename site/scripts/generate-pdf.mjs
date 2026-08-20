import { chromium } from "playwright";
import { copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { serveDirectory } from "./serve-out.mjs";

const PORT = 4173;
const LOCALES = ["en", "it"];
const outDir = fileURLToPath(new URL("../out", import.meta.url));
const publicDir = fileURLToPath(new URL("../public", import.meta.url));

const server = await serveDirectory(outDir, PORT);
const browser = await chromium.launch();

try {
  const page = await browser.newPage();

  for (const locale of LOCALES) {
    await page.goto(`http://localhost:${PORT}/${locale}/cv/`, { waitUntil: "networkidle" });
    await page.emulateMedia({ media: "print" });

    const fileName = `cv-${locale}.pdf`;
    const target = join(outDir, fileName);

    await page.pdf({
      path: target,
      format: "A4",
      printBackground: false,
      margin: { top: "0", bottom: "0", left: "0", right: "0" },
    });

    await copyFile(target, join(publicDir, fileName));
    console.log(`wrote ${fileName}`);
  }
} finally {
  await browser.close();
  server.close();
}
