#!/usr/bin/env bash
# Deploy ETI Next.js app to InMotion (ecngx285). Uses keys/deploy-inmotion (no passphrase).
# Build failed on server? Use: BUILD_LOCALLY=1 ./scripts/deploy-inmotion.sh

set -e

HOST="ecngx285.inmotionhosting.com"
USER="emergi27"
PORT="2222"
REMOTE_DIR="/home/emergi27/eti-app"
LOCAL_DIR="$(cd "$(dirname "$0")/.." && pwd)"
KEY="$LOCAL_DIR/keys/deploy-inmotion"
BUILD_LOCALLY="${BUILD_LOCALLY:-0}"

SSH_OPTS=(-o StrictHostKeyChecking=no -o ConnectTimeout=15 -p "$PORT" -i "$KEY")

ssh "${SSH_OPTS[@]}" "$USER@$HOST" "echo connected" || { echo "SSH failed. Add $KEY.pub in cPanel → SSH Access → Manage SSH Keys → Import → Authorize."; exit 1; }

# Remove stray package-lock.json in public_html (confuses Next.js workspace root and cPanel venv)
ssh "${SSH_OPTS[@]}" "$USER@$HOST" "rm -f /home/emergi27/public_html/package-lock.json 2>/dev/null; true"

if [[ "$BUILD_LOCALLY" == "1" ]]; then
  echo "Building locally (BUILD_LOCALLY=1)..."
  (cd "$LOCAL_DIR" && npm run build) || { echo "Local build failed."; exit 1; }
  RSYNC_EXCLUDE_NEXT=""
else
  RSYNC_EXCLUDE_NEXT="--exclude .next"
fi

echo "Syncing files to /home/emergi27/eti-app (replaces existing content)..."
rsync -avz --delete \
  -e "ssh ${SSH_OPTS[*]}" \
  --exclude node_modules \
  $RSYNC_EXCLUDE_NEXT \
  --exclude .git \
  --exclude keys \
  --exclude reference \
  --exclude reference.html \
  "$LOCAL_DIR/" "$USER@$HOST:$REMOTE_DIR/"

if [[ "$BUILD_LOCALLY" == "1" ]]; then
  echo "Skipping server npm install (use Run NPM Install in cPanel with Node 18 if needed)."
else
  NODE_SETUP='
    export PATH="/opt/cpanel/ea-nodejs18/bin:/opt/cpanel/ea-nodejs20/bin:$HOME/nodevenv/eti-app/18/bin:$HOME/nodevenv/eti-app/20/bin:$PATH"
    NODE_VER=$(node -v 2>/dev/null | sed "s/v//" | cut -d. -f1)
    if [ -z "$NODE_VER" ] || [ "$NODE_VER" -lt 18 ] 2>/dev/null; then
      echo "ERROR: Need Node 18+. Current: $(node -v 2>/dev/null || echo none)."
      echo "Run: BUILD_LOCALLY=1 ./scripts/deploy-inmotion.sh to build on your Mac and upload .next"
      exit 1
    fi
    cd '"$REMOTE_DIR"' && npm install && npm run build
  '
  echo "Installing and building on server..."
  ssh "${SSH_OPTS[@]}" "$USER@$HOST" "bash -c '$NODE_SETUP'"
fi

echo "Creating start script..."
ssh "${SSH_OPTS[@]}" "$USER@$HOST" "cd $REMOTE_DIR && echo '#!/bin/bash
cd $REMOTE_DIR && npm run start' > start.sh && chmod +x start.sh"

echo "Deploy done. In cPanel → Setup Node.js App: Application root = eti-app, startup file = server.js, then Run NPM Install and Restart."
