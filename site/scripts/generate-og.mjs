import { createElement as h } from "react";
import { writeFile } from "node:fs/promises";
import { ImageResponse } from "next/og.js";
import { profile } from "../content/profile.ts";

const SIZE = { width: 1200, height: 630 };

const LOCALES = ["en", "it"];

for (const locale of LOCALES) {
  const response = new ImageResponse(card(locale), SIZE);
  const buffer = Buffer.from(await response.arrayBuffer());
  const target = new URL(`../public/og-${locale}.png`, import.meta.url);
  await writeFile(target, buffer);
  console.log(`wrote public/og-${locale}.png (${Math.round(buffer.length / 1024)} KB)`);
}

function card(locale) {
  return h(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#0F172A",
        color: "#F8FAFC",
      },
    },
    h("div", { style: { fontSize: 28, color: "#22C55E" } }, "$ whoami"),
    h("div", { style: { fontSize: 88, fontWeight: 700, marginTop: 24 } }, profile.name),
    h("div", { style: { fontSize: 40, color: "#94A3B8", marginTop: 12 } }, profile.role[locale]),
    h(
      "div",
      {
        style: {
          marginTop: "auto",
          fontSize: 26,
          color: "#94A3B8",
          borderTop: "2px solid #334155",
          paddingTop: 28,
        },
      },
      profile.positioning[locale],
    ),
  );
}
