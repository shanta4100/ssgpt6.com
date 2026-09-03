// ops/mesh/mesh-agent-v4.js
// Sleeping Agent Mesh Automation v4
// Multi-mode (A+B+C+D+AUTO) self-optimizing agent
// v3 stays as stable brain; v4 is an experimental optimizer.

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
  maxHistoryEntries: 10000,
  mode: 'AUTO' // A, B, C, D, or AUTO
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

// ===== 3. LOAD CONFIG =====

function loadConfig() {
  const cfg = readJson(CONFIG.configFile, null);
  if (!cfg || !cfg.oceans || !cfg.routing) {
    console.error('[AgentV4] Invalid or missing mesh-config.json');
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
          // ignore parse errors
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

// ===== 5. HISTORY + STATS =====

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

// ===== 6. WATCHER v4 =====

async function runWatcher(config) {
  console.log(`[WatcherV4] Checking health at ${new Date().toISOString()}`);

  const results = [];
  const history = readJson(CONFIG.historyFile, []);

  for (const [oceanName, ocean] of Object.entries(config.oceans)) {
    for (const [riverName, river] of Object.entries(ocean.rivers)) {
      if (river.disabled) {
        console.log(
          `[WatcherV4] Skipping disabled river ${oceanName}/${riverName}`
        );
        continue;
      }

      const health = await checkHealth(river.health, CONFIG.healthTimeoutMs);
      const stats = computeStats(history, oceanName, riverName);

      const baseLatencyThreshold =
        river.dynamicLatencyThresholdMs ||
        config.routing.latencyThresholdMs ||
        2000;

      const predictiveDegradation =
        health.status === 'DOWN' ||
        (health.latencyMs !== null &&
          stats.avgLatency !== null &&
          health.latencyMs > stats.avgLatency * 1.8 &&
          health.latencyMs > baseLatencyThreshold) ||
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
        `[WatcherV4] ${oceanName}/${riverName} -> ${health.status} | latency=${health.latencyMs}ms | errorRate=${health.errorRate} | predictive=${predictiveDegradation}`
      );
    }
  }

  writeJson(CONFIG.healthStateFile, results);
  return results;
}

// ===== 7. MODE + REWARD ENGINE =====

function computeGlobalMetrics(healthResults) {
  if (healthResults.length === 0) {
    return {
      avgLatency: null,
      avgErrorRate: null,
      upRatio: null,
      predictiveRatio: null
    };
  }

  let latencySum = 0;
  let latencyCount = 0;
  let errorSum = 0;
  let upCount = 0;
  let predictiveCount = 0;

  for (const h of healthResults) {
    if (h.latencyMs !== null) {
      latencySum += h.latencyMs;
      latencyCount++;
    }
    errorSum += h.errorRate || 0;
    if (h.status === 'UP') upCount++;
    if (h.predictiveDegradation) predictiveCount++;
  }

  const n = healthResults.length;
  return {
    avgLatency: latencyCount ? latencySum / latencyCount : null,
    avgErrorRate: errorSum / n,
    upRatio: upCount / n,
    predictiveRatio: predictiveCount / n
  };
}

function rewardForMode(mode, metrics) {
  const { avgLatency, avgErrorRate, upRatio, predictiveRatio } = metrics;

  if (avgLatency === null || upRatio === null) {
    return 0;
  }

  let reward = 0;

  reward += upRatio * 5;

  const latencyScore = Math.max(0, 3 - avgLatency / 1000);
  const errorScore = Math.max(0, 2 - (avgErrorRate || 0) * 5);
  const predictiveScore = Math.max(0, 2 - (predictiveRatio || 0) * 5);

  if (mode === 'A') {
    reward += latencyScore * 2 + errorScore * 1.5 + predictiveScore * 1;
  } else if (mode === 'B') {
    reward += upRatio * 3 + predictiveScore * 2 + errorScore * 1;
  } else if (mode === 'C') {
    reward += latencyScore * 1.5 + errorScore * 1.5 + upRatio * 2;
  } else if (mode === 'D') {
    reward += upRatio * 2 + predictiveScore * 2 + latencyScore * 1;
  }

  return reward;
}

function chooseModeAuto(metrics) {
  const modes = ['A', 'B', 'C', 'D'];
  const scores = modes.map((m) => ({
    mode: m,
    reward: rewardForMode(m, metrics)
  }));
  scores.sort((a, b) => b.reward - a.reward);
  const best = scores[0];
  console.log(
    `[ModeV4] AUTO chose mode ${best.mode} (reward=${best.reward.toFixed(3)})`
  );
  return best.mode;
}

// ===== 8. ROUTER v4 =====

function isRiverDisabled(config, ocean, river) {
  const o = config.oceans[ocean];
  if (!o) return false;
  const r = o.rivers[river];
  if (!r) return false;
  return !!r.disabled;
}

function runRouter(config, healthResults, mode) {
  console.log(
    `[RouterV4] Computing routing at ${new Date().toISOString()} (mode=${mode})`
  );

  const routingState = readJson(CONFIG.routingStateFile, { services: {} });

  const appCandidates = healthResults.filter(
    (h) => h.river === 'app' && !isRiverDisabled(config, h.ocean, h.river)
  );

  if (appCandidates.length === 0) {
    console.warn('[RouterV4] No candidates for app service');
    return routingState;
  }

  const scored = appCandidates.map((h) => {
    let score = 0;

    if (mode === 'A') {
      if (h.status === 'UP') score += 4;
      if (!h.predictiveDegradation) score += 1;
      if (h.latencyMs !== null) {
        score += Math.max(0, 3 - h.latencyMs / 800);
      }
      score -= (h.errorRate || 0) * 4;
    } else if (mode === 'B') {
      if (h.status === 'UP') score += 5;
      if (!h.predictiveDegradation) score += 2;
      score -= (h.errorRate || 0) * 2;
    } else if (mode === 'C') {
      if (h.status === 'UP') score += 4;
      if (!h.predictiveDegradation) score += 1;
      if (h.latencyMs !== null) {
        score += Math.max(0, 2 - h.latencyMs / 1000);
      }
      score -= (h.errorRate || 0) * 3;
    } else if (mode === 'D') {
      if (h.status === 'UP') score += 4;
      if (!h.predictiveDegradation) score += 2;
      score -= (h.errorRate || 0) * 2;
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
    score: best.score,
    mode
  };

  console.log(
    `[RouterV4] Active app URL -> ${activeUrl} (ocean=${best.ocean}, score=${best.score.toFixed(
      2
    )}, mode=${mode})`
  );

  writeJson(CONFIG.routingStateFile, routingState);
  return routingState;
}

// ===== 9. HEALER v4 =====

function runHealer(healthResults, mode) {
  console.log(`[HealerV4] Evaluating heal actions (mode=${mode})`);

  const queue = readJson(CONFIG.healQueueFile, []);

  let filterFn;
  if (mode === 'A') {
    filterFn = (h) => h.status === 'DOWN' || h.predictiveDegradation;
  } else if (mode === 'B') {
    filterFn = (h) => h.status === 'DOWN';
  } else if (mode === 'C') {
    filterFn = (h) =>
      h.status === 'DOWN' ||
      (h.predictiveDegradation && (h.errorRate || 0) > 0.2);
  } else {
    filterFn = (h) =>
      h.status === 'DOWN' ||
      (h.predictiveDegradation && (h.errorRate || 0) > 0.15);
  }

  const toHeal = healthResults.filter(filterFn);

  for (const h of toHeal) {
    const entry = {
      ocean: h.ocean,
      river: h.river,
      reason: h.status === 'DOWN' ? 'DOWN' : 'PREDICTIVE',
      mode,
      requestedAt: new Date().toISOString()
    };

    queue.push(entry);

    console.log(
      `[HealerV4] Queued heal: ${h.ocean}/${h.river} (${entry.reason}, mode=${mode})`
    );
  }

  writeJson(CONFIG.healQueueFile, queue);
}

// ===== 10. CONFIG REWRITER v4 =====

function runConfigRewriter(config, healthResults, mode) {
  console.log(`[ConfigV4] Evaluating config evolution (mode=${mode})`);

  const history = readJson(CONFIG.historyFile, []);
  let changed = false;

  for (const [oceanName, ocean] of Object.entries(config.oceans)) {
    for (const [riverName, river] of Object.entries(ocean.rivers)) {
      const stats = computeStats(history, oceanName, riverName);

      if (stats.avgLatency !== null) {
        let factor = 1.5;
        if (mode === 'A') factor = 1.2;
        else if (mode === 'B') factor = 1.8;
        else if (mode === 'C') factor = 1.5;
        else if (mode === 'D') factor = 1.4;

        const newThreshold = Math.round(stats.avgLatency * factor);
        const current = river.dynamicLatencyThresholdMs;

        if (!current || Math.abs(newThreshold - current) > current * 0.2) {
          river.dynamicLatencyThresholdMs = newThreshold;
          console.log(
            `[ConfigV4] Updated dynamicLatencyThresholdMs for ${oceanName}/${riverName} -> ${newThreshold}ms (mode=${mode})`
          );
          changed = true;
        }
      }

      if (stats.upRatio !== null && stats.upRatio < 0.5) {
        if (!river.disabled && !river.core) {
          if (mode === 'A' || mode === 'C' || mode === 'D') {
            river.disabled = true;
            console.log(
              `[ConfigV4] Disabled unstable non-core river ${oceanName}/${riverName} (mode=${mode})`
            );
            changed = true;
          }
        }
      }

      if (stats.upRatio !== null && stats.upRatio > 0.9) {
        if (river.disabled) {
          river.disabled = false;
          console.log(
            `[ConfigV4] Re-enabled recovered river ${oceanName}/${riverName} (mode=${mode})`
          );
          changed = true;
        }
      }
    }
  }

  if (changed) {
    writeJson(CONFIG.configFile, config);
    console.log('[ConfigV4] mesh-config.json updated safely');
  } else {
    console.log('[ConfigV4] No config changes needed this cycle');
  }
}

// ===== 11. MAIN LOOP =====

async function runCycle() {
  const config = loadConfig();

  try {
    const health = await runWatcher(config);
    const metrics = computeGlobalMetrics(health);

    let mode = CONFIG.mode;
    if (mode === 'AUTO') {
      mode = chooseModeAuto(metrics);
    } else {
      console.log(`[ModeV4] Using fixed mode ${mode}`);
    }

    runRouter(config, health, mode);
    runHealer(health, mode);
    runConfigRewriter(config, health, mode);
  } catch (err) {
    console.error('[AgentV4] Error in cycle:', err.message);
  }
}

console.log('[AgentV4] Sleeping Agent Mesh Automation v4 starting…');
runCycle();
setInterval(runCycle, CONFIG.checkIntervalMs);
