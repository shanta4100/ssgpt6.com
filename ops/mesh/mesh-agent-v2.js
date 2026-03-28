// ops/mesh/mesh-agent-v2.js
// Sleeping Agent Mesh Automation v2
// Predictive Watcher + Multi-Region Router + Proactive Healer

const https = require('https');
const fs = require('fs');
const path = require('path');

// ===== 1. CONFIG =====

const CONFIG = {
  checkIntervalMs: 60000,
  healthTimeoutMs: 8000,
  healthStateFile: path.join(__dirname, 'health-state.json'),
  routingStateFile: path.join(__dirname, 'routing-state.json'),
  healQueueFile: path.join(__dirname, 'heal-queue.json'),
  configFile: path.join(__dirname, 'mesh-config.json')
};

// ===== 2. LOAD CONFIG =====

function loadConfig() {
  try {
    const raw = fs.readFileSync(CONFIG.configFile, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('[AgentV2] Failed to load mesh-config.json:', err.message);
    process.exit(1);
  }
}

// ===== 3. UTIL: HEALTH CHECK =====

function checkHealth(url, timeoutMs) {
  return new Promise((resolve) => {
    const start = Date.now();
    const req = https.get(url, (res) => {
      const latency = Date.now() - start;
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        let status = 'DOWN';
        let errorRate = 0;

        try {
          const parsed = JSON.parse(data);
          errorRate = parsed.errorRate || 0;
        } catch {}

        if (res.statusCode >= 200 && res.statusCode < 300) {
          if (latency < 2000 && errorRate < 0.1) status = 'UP';
          else status = 'SLOW';
        }

        resolve({
          url,
          status,
          latencyMs: latency,
          errorRate,
          statusCode: res.statusCode
        });
      });
    });

    req.on('error', () => {
      resolve({
        url,
        status: 'DOWN',
        latencyMs: null,
        errorRate: 1,
        statusCode: null
      });
    });

    req.setTimeout(timeoutMs, () => {
      req.destroy();
      resolve({
        url,
        status: 'DOWN',
        latencyMs: null,
        errorRate: 1,
        statusCode: null
      });
    });
  });
}

// ===== 4. STATE HELPERS =====

function readJson(file, fallback) {
  try {
    if (!fs.existsSync(file)) return fallback;
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return fallback;
  }
}

function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}

// ===== 5. WATCHER v2 (Predictive) =====

async function runWatcher(config) {
  console.log(`[WatcherV2] Checking health at ${new Date().toISOString()}`);

  const results = [];

  for (const [oceanName, ocean] of Object.entries(config.oceans)) {
    for (const [riverName, river] of Object.entries(ocean.rivers)) {
      const health = await checkHealth(river.health, CONFIG.healthTimeoutMs);

      const predictive =
        health.status === 'SLOW' ||
        (health.latencyMs && health.latencyMs > config.routing.latencyThresholdMs) ||
        health.errorRate > 0.2;

      results.push({
        ocean: oceanName,
        river: riverName,
        url: river.health,
        status: health.status,
        latencyMs: health.latencyMs,
        errorRate: health.errorRate,
        predictiveDegradation: predictive,
        checkedAt: new Date().toISOString()
      });

      console.log(
        `[WatcherV2] ${oceanName}/${riverName} -> ${health.status} | latency=${health.latencyMs}ms | errorRate=${health.errorRate}`
      );
    }
  }

  writeJson(CONFIG.healthStateFile, results);
  return results;
}

// ===== 6. ROUTER v2 (Multi-Region + Predictive) =====

function runRouter(config, healthResults) {
  console.log(`[RouterV2] Computing routing at ${new Date().toISOString()}`);

  const routingState = readJson(CONFIG.routingStateFile, { services: {} });

  const appCandidates = healthResults.filter((h) => h.river === 'app');

  // Priority: UP > SLOW > predictive > DOWN
  const sorted = appCandidates.sort((a, b) => {
    const score = (h) =>
      (h.status === 'UP' ? 3 : h.status === 'SLOW' ? 2 : 0) -
      (h.predictiveDegradation ? 1 : 0);
    return score(b) - score(a);
  });

  const best = sorted[0];
  const oceanConfig = config.oceans[best.ocean];
  const activeUrl = oceanConfig.rivers.app.active;

  routingState.services.app = {
    activeUrl,
    lastUpdated: new Date().toISOString()
  };

  console.log(`[RouterV2] Active app URL -> ${activeUrl}`);

  writeJson(CONFIG.routingStateFile, routingState);
  return routingState;
}

// ===== 7. HEALER v2 (Predictive + DOWN) =====

function runHealer(healthResults) {
  console.log(`[HealerV2] Checking for heal actions`);

  const queue = readJson(CONFIG.healQueueFile, []);

  const toHeal = healthResults.filter(
    (h) => h.status === 'DOWN' || h.predictiveDegradation
  );

  for (const h of toHeal) {
    const entry = {
      ocean: h.ocean,
      river: h.river,
      reason: h.status === 'DOWN' ? 'DOWN' : 'PREDICTIVE',
      requestedAt: new Date().toISOString()
    };

    queue.push(entry);

    console.log(
      `[HealerV2] Queued heal: ${h.ocean}/${h.river} (${entry.reason})`
    );
  }

  writeJson(CONFIG.healQueueFile, queue);
}

// ===== 8. MAIN LOOP =====

async function runCycle() {
  const config = loadConfig();

  try {
    const health = await runWatcher(config);
    runRouter(config, health);
    runHealer(health);
  } catch (err) {
    console.error('[AgentV2] Error:', err.message);
  }
}

console.log('[AgentV2] Sleeping Agent Mesh Automation v2 starting…');
runCycle();
setInterval(runCycle, CONFIG.checkIntervalMs);
