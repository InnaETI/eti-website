#!/usr/bin/env bash
# Exit 0 if Next dev server responds on port 3020; non-zero otherwise.
# Use before handing off: ./scripts/check-dev-server.sh
set -euo pipefail
PORT="${PORT:-3020}"
URL="http://127.0.0.1:${PORT}/"
code=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 3 "$URL" || echo "000")
if [[ "$code" == "200" ]] || [[ "$code" == "304" ]]; then
  echo "OK: dev server responded HTTP $code at $URL"
  exit 0
fi
echo "FAIL: no dev server at $URL (got HTTP $code). Run: npm run dev"
exit 1
