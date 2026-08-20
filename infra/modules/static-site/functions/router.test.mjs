import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const template = await readFile(new URL("./router.js.tftpl", import.meta.url), "utf8");
const source = template
  .replace("${locales_json}", JSON.stringify(["en", "it"]))
  .replace("${default_locale}", "en");

const handler = new Function(`${source}; return handler;`)();

function request(uri, acceptLanguage) {
  const headers = acceptLanguage ? { "accept-language": { value: acceptLanguage } } : {};
  return handler({ request: { uri, headers } });
}

describe("root locale negotiation", () => {
  const negotiations = [
    ["no Accept-Language header", undefined, "/en/"],
    ["an Italian preference", "it-IT,it;q=0.9,en;q=0.8", "/it/"],
    ["an English preference", "en-GB,en;q=0.9", "/en/"],
    ["an unsupported language", "fr-FR,fr;q=0.9", "/en/"],
    ["an unsupported language ahead of Italian", "fr-FR,fr;q=0.9,it;q=0.8", "/it/"],
  ];

  for (const [description, acceptLanguage, expected] of negotiations) {
    test(`redirects ${description} to ${expected}`, () => {
      const response = request("/", acceptLanguage);

      assert.equal(response.statusCode, 302);
      assert.equal(response.headers.location.value, expected);
    });
  }
});

describe("directory requests", () => {
  test("serves the index document for a locale root", () => {
    assert.equal(request("/en/").uri, "/en/index.html");
  });

  test("serves the index document for a nested page", () => {
    assert.equal(request("/it/projects/").uri, "/it/projects/index.html");
  });

  test("canonicalises a page without a trailing slash", () => {
    const response = request("/en/cv");

    assert.equal(response.statusCode, 302);
    assert.equal(response.headers.location.value, "/en/cv/");
  });
});

describe("file requests", () => {
  const files = [
    "/_next/static/chunk.js",
    "/og-en.png",
    "/cv-en.pdf",
    "/error.html",
    "/sitemap.xml",
    "/favicon.ico",
  ];

  for (const uri of files) {
    test(`passes ${uri} through untouched`, () => {
      assert.equal(request(uri).uri, uri);
    });
  }
});
