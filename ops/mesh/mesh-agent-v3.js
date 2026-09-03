// ops/mesh/mesh-agent-v3.js
// Sleeping Agent Mesh Automation v3
// Adaptive + Governed Autonomy (A+B)
// - Learns patterns
// - Predicts degradation
// - Self-tunes thresholds
// - Safely rewrites mesh-config.json

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
  configFile: path.join(__dirname, 'mesh-config.json'),
  historyFile: path.join(__dirname, 'mesh-history.json'),
  maxHistoryEntries: 5000
};

// ===== 2. JSON HELPERS =====

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

// ===== 3. LOAD CONFIG (REQUIRED) =====

function loadConfig() {
  const cfg = readJson(CONFIG.configFile, null);
  if (!cfg || !cfg.oceans || !cfg.routing) {
    console.error('[AgentV3] Invalid or missing mesh-config.json');
    process.exit(1);
  }
  return cfg;
}

// ===== 4. HEALTH CHECK =====

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
          if (typeof parsed.errorRate === 'number') {
            errorRate = parsed.errorRate;
          }
        } catch {
          // ignore parse errors, treat as generic health
        }

        if (res.statusCode >= 200 && res.statusCode < 300) {
          status = 'UP';
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

// ===== 5. HISTORY + LEARNING =====

function appendHistory(entry) {
  const history = readJson(CONFIG.historyFile, []);
  history.push(entry);
  if (history.length > CONFIG.maxHistoryEntries) {
    history.splice(0, history.length - CONFIG.maxHistoryEntries);
  }
  writeJson(CONFIG.historyFile, history);
}

function computeStats(history, ocean, river) {
  const filtered = history.filter(
    (h) => h.ocean === ocean && h.river === river && h.latencyMs !== null
  );
  if (filtered.length === 0) {
    return {
      avgLatency: null,
      avgErrorRate: null,
      upRatio: null
    };
  }

  let latencySum = 0;
  let errorSum = 0;
  let upCount = 0;

  for (const h of filtered) {
    latencySum += h.latencyMs || 0;
    errorSum += h.errorRate || 0;
    if (h.status === 'UP') upCount++;
  }

  const n = filtered.length;
  return {
    avgLatency: latencySum / n,
    avgErrorRate: errorSum / n,
    upRatio: upCount / n
  };
}

// ===== 6. WATCHER v3 (LEARNING + PREDICTIVE) =====

async function runWatcher(config) {
  console.log(`[WatcherV3] Checking health at ${new Date().toISOString()}`);

  const results = [];
  const history = readJson(CONFIG.historyFile, []);

  for (const [oceanName, ocean] of Object.entries(config.oceans)) {
    for (const [riverName, river] of Object.entries(ocean.rivers)) {
      if (river.disabled) {
        console.log(
          `[WatcherV3] Skipping disabled river ${oceanName}/${riverName}`
        );
        continue;
      }

      const health = await checkHealth(river.health, CONFIG.healthTimeoutMs);

      const stats = computeStats(history, oceanName, riverName);

      const dynamicLatencyThreshold =
        river.dynamicLatencyThresholdMs ||
        config.routing.latencyThresholdMs ||
        2000;

      const predictiveDegradation =
        health.status === 'DOWN' ||
        (health.latencyMs !== null &&
          stats.avgLatency !== null &&
          health.latencyMs > stats.avgLatency * 1.8 &&
          health.latencyMs > dynamicLatencyThreshold) ||
        health.errorRate > 0.3;

      const entry = {
        ocean: oceanName,
        river: riverName,
        url: river.health,
        status: health.status,
        latencyMs: health.latencyMs,
        errorRate: health.errorRate,
        predictiveDegradation,
        checkedAt: new Date().toISOString()
      };

      results.push(entry);
      appendHistory(entry);

      console.log(
        `[WatcherV3] ${oceanName}/${riverName} -> ${health.status} | latency=${health.latencyMs}ms | errorRate=${health.errorRate} | predictive=${predictiveDegradation}`
      );
    }
  }

  writeJson(CONFIG.healthStateFile, results);
  return results;
}

// ===== 7. ROUTER v3 (ADAPTIVE) =====

function runRouter(config, healthResults) {
  console.log(`[RouterV3] Computing routing at ${new Date().toISOString()}`);

  const routingState = readJson(CONFIG.routingStateFile, { services: {} });

  const appCandidates = healthResults.filter(
    (h) => h.river === 'app' && !isRiverDisabled(config, h.ocean, h.river)
  );

  if (appCandidates.length === 0) {
    console.warn('[RouterV3] No candidates for app service');
    return routingState;
  }

  const scored = appCandidates.map((h) => {
    let score = 0;
    if (h.status === 'UP') score += 3;
    if (h.status === 'SLOW') score += 1;
    if (!h.predictiveDegradation) score += 1;
    if (h.latencyMs !== null) {
      score += Math.max(0, 2 - h.latencyMs / 1000);
    }
    if (h.errorRate !== null) {
      score -= h.errorRate * 3;
    }
    return { ...h, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const best = scored[0];

  const oceanConfig = config.oceans[best.ocean];
  const activeUrl = oceanConfig.rivers.app.active;

  routingState.services.app = {
    activeUrl,
    lastUpdated: new Date().toISOString(),
    chosenOcean: best.ocean,
    chosenRiver: best.river,
    score: best.score
  };

  console.log(
    `[RouterV3] Active app URL -> ${activeUrl} (ocean=${best.ocean}, score=${best.score.toFixed(
      2
    )})`
  );

  writeJson(CONFIG.routingStateFile, routingState);
  return routingState;
}

function isRiverDisabled(config, ocean, river) {
  const o = config.oceans[ocean];
  if (!o) return false;
  const r = o.rivers[river];
  if (!r) return false;
  return !!r.disabled;
}

// ===== 8. HEALER v3 (PREDICTIVE + DOWN) =====

function runHealer(healthResults) {
  console.log('[HealerV3] Evaluating heal actions');

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
      `[HealerV3] Queued heal: ${h.ocean}/${h.river} (${entry.reason})`
    );
  }

  writeJson(CONFIG.healQueueFile, queue);
}

// ===== 9. CONFIG REWRITER v3 (GOVERNED AUTONOMY) =====

function runConfigRewriter(config, healthResults) {
  console.log('[ConfigV3] Evaluating config evolution');

  const history = readJson(CONFIG.historyFile, []);

  let changed = false;

  for (const [oceanName, ocean] of Object.entries(config.oceans)) {
    for (const [riverName, river] of Object.entries(ocean.rivers)) {
      const stats = computeStats(history, oceanName, riverName);

      if (stats.avgLatency !== null) {
        const newThreshold = Math.round(stats.avgLatency * 1.5);
        const current = river.dynamicLatencyThresholdMs;
        if (
          !current ||
          Math.abs(newThreshold - current) > current * 0.2
        ) {
          river.dynamicLatencyThresholdMs = newThreshold;
          console.log(
            `[ConfigV3] Updated dynamicLatencyThresholdMs for ${oceanName}/${riverName} -> ${newThreshold}ms`
          );
          changed = true;
        }
      }

      if (stats.upRatio !== null && stats.upRatio < 0.5) {
        if (!river.disabled && !river.core) {
          river.disabled = true;
          console.log(
            `[ConfigV3] Disabled unstable non-core river ${oceanName}/${riverName}`
          );
          changed = true;
        }
      }

      if (stats.upRatio !== null && stats.upRatio > 0.9) {
        if (river.disabled) {
          river.disabled = false;
          console.log(
            `[ConfigV3] Re-enabled recovered river ${oceanName}/${riverName}`
          );
          changed = true;
        }
      }
    }
  }

  if (changed) {
    writeJson(CONFIG.configFile, config);
    console.log('[ConfigV3] mesh-config.json updated safely');
  } else {
    console.log('[ConfigV3] No config changes needed this cycle');
  }
}

// ===== 10. MAIN LOOP =====

async function runCycle() {
  const config = loadConfig();

  try {
    const health = await runWatcher(config);
    runRouter(config, health);
    runHealer(health);
    runConfigRewriter(config, health);
  } catch (err) {
    console.error('[AgentV3] Error in cycle:', err.message);
  }
}

console.log('[AgentV3] Sleeping Agent Mesh Automation v3 starting…');
runCycle();
setInterval(runCycle, CONFIG.checkIntervalMs);
