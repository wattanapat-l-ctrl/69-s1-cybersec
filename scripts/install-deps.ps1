# Install email provider packages for the Strapi container.
# Run this once after `git clone` (node_modules/ is gitignored).
$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "..\strapi-extras")

docker run --rm `
  -v "${PWD}:/extras" `
  -w /extras `
  --entrypoint sh `
  prawee/strapi `
  -c "npm install --omit=dev"

Write-Host "Done. Start with: docker compose up -d"