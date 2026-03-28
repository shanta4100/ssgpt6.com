// ops/mesh/healer-webhook.js
// Healer Webhook v1 — queues heal actions into heal-queue.json

const http = require('http');
const fs = require('fs');
const path = require('path');

// ===== 1. CONFIG =====

const CONFIG = {
  port: 8090,
  healQueueFile: path.join(__dirname, 'heal-queue.json')
};

// ===== 2. STATE HELPERS =====

function readQueue() {
  try {
    if (!fs.existsSync(CONFIG.healQueueFile)) {
      return [];
    }
    const raw = fs.readFileSync(CONFIG.healQueueFile, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeQueue(queue) {
  fs.writeFileSync(CONFIG.healQueueFile, JSON.stringify(queue, null, 2), 'utf8');
}

// ===== 3. SERVER =====

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/heal') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const { ocean, river } = payload;

        if (!ocean || !river) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'ocean and river are required' }));
        }

        const queue = readQueue();
        const entry = {
          ocean,
          river,
          requestedAt: new Date().toISOString()
        };
        queue.push(entry);
        writeQueue(queue);

        console.log(
          `[HealerWebhook] Queued heal request for ${ocean} / ${river}`
        );

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ status: 'queued', entry }));
      } catch (err) {
        console.error('[HealerWebhook] Error parsing request:', err.message);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'invalid JSON' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'not found' }));
  }
});

// ===== 4. START SERVER =====

server.listen(CONFIG.port, () => {
  console.log(
    `[HealerWebhook] Healer Webhook v1 listening on port ${CONFIG.port}`
  );
  console.log(`[HealerWebhook] Queue file: ${CONFIG.healQueueFile}`);
});
