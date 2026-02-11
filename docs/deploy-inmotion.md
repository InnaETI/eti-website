# Deploy eti-website to InMotion (cPanel Node.js)

## Why the tech support example failed

- **Application startup file: `index.php`** is for PHP apps. This project is **Node.js (Next.js)**. You must use **`server.js`** as the startup file.
- The example was for a generic "testapp," not a Next.js app. Next.js needs a small `server.js` entry point (included in this repo).

## Correct cPanel settings

| Setting | Value |
|--------|--------|
| **Application startup file** | `server.js` (not index.php) |
| **Application root** | `eti-app` (per InMotion; deploy script syncs to `/home/emergi27/eti-app`) |
| **Application mode** | **Production** |
| **Node.js version** | 18.x or 20.x (match your local) |
| **Passenger log file** | e.g. `/home/emergi27/logs/passenger.log` |

## Steps on the server

1. **Deploy** using `BUILD_LOCALLY=1 ./scripts/deploy-inmotion.sh` — syncs to `/home/emergi27/eti-app`.
2. In cPanel → **Run NPM Install** (so `node_modules` and dependencies are installed).
3. **Build the app** (required before it can run):
   - If you have SSH: `cd /home/emergi27/eti-app` (or your app path), then `npm run build`.
   - If cPanel has “Run script” or a build step, run: `npm run build`.
4. Set **Application startup file** to **`server.js`**.
5. Set **Application mode** to **Production**.
6. **Save** and **Restart** the app.

## After deployment

- Open the Application URL (e.g. `https://emergingti.com/eti-app`). If you get 502/503, check the Passenger log path you set and the cPanel error logs.

## Recommended: Build locally (avoids server build failures)

The server build often fails due to resource limits or path issues. Use local build and upload:

```bash
BUILD_LOCALLY=1 ./scripts/deploy-inmotion.sh
```

This builds on your Mac and uploads the `.next` folder. You **do not** need to run "Run JS script" (build) in cPanel.

## If you still get errors

- Confirm the app root path contains: `package.json`, `server.js`, `.next` (created by `npm run build`), and `node_modules`.
- Confirm **startup file** is exactly `server.js` (no `.php`).
- **Application root** must be `eti-app` (per InMotion tech support; deploy goes to `/home/emergi27/eti-app`).

### "Unable to find app venv folder" error

1. **Fix Application root** – Must be `eti-app` (per InMotion; deploy goes to `/home/emergi27/eti-app` — not under `public_html`).
2. **Remove stray package-lock.json** – If `/home/emergi27/public_html/package-lock.json` exists (outside eti-app), delete it in File Manager. It confuses cPanel's venv.
3. **Run NPM Install** – Click "Run NPM Install" in cPanel to create the venv, then Save.
4. **Destroy and recreate** – If it persists, DESTROY the app, create a new one with the same settings, then Run NPM Install.

## cPanel / Passenger notes (from docs)

- **Default startup file**: Passenger expects `app.js` by default. Because this app uses `server.js`, cPanel Application Manager must have **Application startup file** set to `server.js` (or the equivalent `PassengerStartupFile` in Apache config).
- **Restarting after changes**: Touch `$appDir/tmp/restart.txt` to tell Passenger to restart. Create `tmp` if needed: `mkdir -p /home/emergi27/eti-app/tmp && touch /home/emergi27/eti-app/tmp/restart.txt`.
- **Logs**: Application logs are typically under `/home/emergi27/eti-app/logs` or `/home/emergi27/logs/`.
- **Further troubleshooting**: [Phusion Passenger – Troubleshooting Passenger Standalone and Node.js](https://www.phusionpassenger.com/library/admin/standalone/troubleshooting/nodejs/#common-problems-specific-to-node.js).

## References

- [cPanel: How to Install a Node.js Application](https://docs.cpanel.net/knowledge-base/web-services/how-to-install-a-node.js-application/)
- [InMotion: Setup Node.js App in cPanel](https://inmotionhosting.com/support/edu/cpanel/setup-node-js-app) (Nginx shared plans only)
