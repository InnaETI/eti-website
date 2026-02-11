/**
 * Entry point for cPanel/InMotion Node.js app.
 * Do NOT set "Application startup file" to index.php — use this file (server.js).
 */
const { createServer } = require('http');
const { parse } = require('url');
const path = require('path');

// Next.js production server
const next = require('next');

const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl).catch((err) => {
      console.error(err);
      res.statusCode = 500;
      res.end('Internal error');
    });
  }).listen(port, () => {
    console.log(`Next.js listening on port ${port}`);
  });
});
