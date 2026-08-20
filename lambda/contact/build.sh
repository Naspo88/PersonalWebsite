#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$script_dir"

rm -rf dist
mkdir -p dist

npx esbuild index.mjs \
  --bundle \
  --platform=node \
  --target=node22 \
  --format=esm \
  --outfile=dist/index.mjs \
  --banner:js="import{createRequire}from'module';const require=createRequire(import.meta.url);"

cd dist
zip -q -r ../contact.zip index.mjs
cd ..

echo "built $(du -h contact.zip | cut -f1) -> $script_dir/contact.zip"
