# Deploy eti-website to InMotion (cPanel Node.js)

## Why the tech support example failed

- **Application startup file: `index.php`** is for PHP apps. This project is **Node.js (Next.js)**. You must use **`server.js`** as the startup file.
- The example was for a generic "testapp," not a Next.js app. Next.js needs a small `server.js` entry point (included in this repo).

## Correct cPanel settings

| Setting | Value |
|--------|--------|
| **Application startup file** | `server.js` (not index.php) |
| **Application root** | Your app folder (e.g. `eti-app` or `public_html/eti-app`) |
| **Application mode** | **Production** |
| **Node.js version** | 18.x or 20.x (match your local) |
| **Passenger log file** | e.g. `/home/emergi27/logs/passenger.log` |

## Steps on the server

1. **Upload the project** (or clone via Git) into the application root (e.g. `public_html/eti-app`).
2. In cPanel → **Run NPM Install** (so `node_modules` and dependencies are installed).
3. **Build the app** (required before it can run):
   - If you have SSH: `cd /home/emergi27/public_html/eti-app` (or your app path), then `npm run build`.
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
- **Application root** must be `public_html/eti-app` (not `public_url`).

### "Unable to find app venv folder" error

1. **Fix Application root** – Must be `public_html/eti-app` (check for typos like `public_url`).
2. **Remove stray package-lock.json** – If `/home/emergi27/public_html/package-lock.json` exists (outside eti-app), delete it in File Manager. It confuses cPanel's venv.
3. **Run NPM Install** – Click "Run NPM Install" in cPanel to create the venv, then Save.
4. **Destroy and recreate** – If it persists, DESTROY the app, create a new one with the same settings, then Run NPM Install.
