#!/bin/bash
set -euo pipefail

# Only run in remote (Claude Code on the web) environments
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

echo '{"async": true, "asyncTimeout": 300000}'

echo "Installing dependencies..."
npm install

echo "Generating Prisma client..."
npx prisma generate

echo "Pushing database schema..."
npx prisma db push

echo "Session setup complete."
