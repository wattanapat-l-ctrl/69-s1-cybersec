#!/usr/bin/env sh
# Install email provider packages for Strapi container.
# Run after `git clone` (node_modules is gitignored).
set -e
cd "$(dirname "$0")/strapi-extras"
docker run --rm \
  -v "$(pwd):/extras" \
  -w /extras \
  --entrypoint sh \
  prawee/strapi \
  -c "npm install --omit=dev"
echo "Done. Start with: docker compose up -d"