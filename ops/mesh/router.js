// ops/mesh/router.js
// Mesh Router v1 — reads routing-state.json and forwards traffic
// This is the traffic brain of the Sleeping Agent Mesh Automation system.

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

// ===== 1. CONFIG =====

const CONFIG = {
  port: 8080, // router listens here
  routingStateFile: path.join(__dirname, 'routing-state.json')
};

// ===== 2. READ ROUTING STATE =====

function getRoutingState() {
  try {
    if (!fs.existsSync(CONFIG.routingStateFile)) {
      return { services: {} };
    }
    const raw = fs.readFileSync(CONFIG.routingStateFile, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('[Router] Error reading routing state:', err.message);
    return { services: {} };
  }
}

// ===== 3. PROXY REQUEST =====

function proxyRequest(req, res, targetUrl) {
  const parsed = url.parse(targetUrl);

  const options = {
    hostname: parsed.hostname,
    port: parsed.port || 443,
    path: req.url,
    method: req.method,
    headers: req.headers
  };

  const proxy = https.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxy.on('error', (err) => {
    console.error('[Router] Proxy error:', err.message);
    res.writeHead(502, { 'Content-Type': 'text/plain' });
    res.end('Bad Gateway — Router could not reach target');
  });

  req.pipe(proxy, { end: true });
}

// ===== 4. MAIN SERVER =====

const server = http.createServer((req, res) => {
  const routing = getRoutingState();

  // Default to app service
  const appRoute = routing.services?.app?.activeUrl;

  if (!appRoute) {
    res.writeHead(503, { 'Content-Type': 'text/plain' });
    return res.end('Routing not available — no active service');
  }

  console.log(`[Router] Forwarding ${req.method} ${req.url} -> ${appRoute}`);

  proxyRequest(req, res, appRoute);
});

// ===== 5. START ROUTER =====

server.listen(CONFIG.port, () => {
  console.log(`[Router] Mesh Router v1 running on port ${CONFIG.port}`);
  console.log(`[Router] Reading routing state from ${CONFIG.routingStateFile}`);
});
