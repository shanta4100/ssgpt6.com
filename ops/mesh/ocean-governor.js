// ops/mesh/ocean-governor.js
// Planetary Mesh Governance Layer
// Computes OSS, promotes/demotes oceans, and manages continuity mode.

const fs = require('fs');
const path = require('path');

const CONFIG = {
  healthStateFile: path.join(__dirname, 'health-state.json'),
  historyFile: path.join(__dirname, 'mesh-history.json'),
  configFile: path.join(__dirname, 'mesh-config.json'),
  governorStateFile: path.join(__dirname, 'governor-state.json'),

  promotionThreshold: 0.85,
  demotionThreshold: 0.45,

  promotionHours: 48,
  demotionHours: 12
};

// ---------- JSON Helpers ----------

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

// ---------- Compute OSS ----------

function computeOSS(history, oceanName) {
  const entries = history.filter(h => h.ocean === oceanName);

  if (entries.length === 0) {
    return { oss: 0, uptime: 0, latencyScore: 0, errorScore: 0, predictiveScore: 0, historicalScore: 0 };
  }

  const uptime = entries.filter(e => e.status === 'UP').length / entries.length;

  const validLatencies = entries.filter(e => e.latencyMs !== null);
  const avgLatency = validLatencies.length
    ? validLatencies.reduce((a, b) => a + b.latencyMs, 0) / validLatencies.length
    : null;

  const latencyScore = avgLatency !== null
    ? Math.max(0, 1 - avgLatency / 3000)
    : 0;

  const avgError = entries.reduce((a, b) => a + (b.errorRate || 0), 0) / entries.length;
  const errorScore = Math.max(0, 1 - avgError * 2);

  const predictiveCount = entries.filter(e => e.predictiveDegradation).length;
  const predictiveScore = Math.max(0, 1 - predictiveCount / entries.length);

  const recent = entries.slice(-200);
  const historicalScore = recent.filter(e => e.status === 'UP').length / recent.length;

  const oss =
    uptime * 0.4 +
    latencyScore * 0.2 +
    errorScore * 0.2 +
    predictiveScore * 0.1 +
    historicalScore * 0.1;

  return {
    oss,
    uptime,
    latencyScore,
    errorScore,
    predictiveScore,
    historicalScore
  };
}

// ---------- Promotion / Demotion ----------

function evaluateOcean(oceanName, oss, state) {
  const now = Date.now();

  if (!state[oceanName]) {
    state[oceanName] = {
      promotedAt: null,
      demotedAt: null,
      status: "normal"
    };
  }

  const oceanState = state[oceanName];

  if (oss >= CONFIG.promotionThreshold) {
    if (!oceanState.promotedAt) oceanState.promotedAt = now;

    const hours = (now - oceanState.promotedAt) / (1000 * 60 * 60);
    if (hours >= CONFIG.promotionHours) {
      oceanState.status = "preferred";
    }
  } else {
    oceanState.promotedAt = null;
  }

  if (oss <= CONFIG.demotionThreshold) {
    if (!oceanState.demotedAt) oceanState.demotedAt = now;

    const hours = (now - oceanState.demotedAt) / (1000 * 60 * 60);
    if (hours >= CONFIG.demotionHours) {
      oceanState.status = "degraded";
    }
  } else {
    oceanState.demotedAt = null;
  }

  if (oceanState.status === "preferred" && oss < CONFIG.promotionThreshold) {
    oceanState.status = "normal";
  }

  if (oceanState.status === "degraded" && oss > CONFIG.demotionThreshold) {
    oceanState.status = "normal";
  }

  return oceanState;
}

// ---------- Continuity Mode ----------

function computeContinuityMode(governorState) {
  const degradedCount = Object.values(governorState)
    .filter(s => s.status === "degraded").length;

  if (degradedCount >= 3) return true;
  return false;
}

// ---------- Main ----------

function runGovernor() {
  const config = readJson(CONFIG.configFile, null);
  const history = readJson(CONFIG.historyFile, []);
  const governorState = readJson(CONFIG.governorStateFile, {});

  if (!config || !config.oceans) {
    console.error("[Governor] Invalid mesh-config.json");
    return;
  }

  const results = {};

  for (const oceanName of Object.keys(config.oceans)) {
    const metrics = computeOSS(history, oceanName);
    const state = evaluateOcean(oceanName, metrics.oss, governorState);

    results[oceanName] = {
      oss: metrics.oss,
      status: state.status,
      uptime: metrics.uptime,
      latencyScore: metrics.latencyScore,
      errorScore: metrics.errorScore,
      predictiveScore: metrics.predictiveScore,
      historicalScore: metrics.historicalScore
    };

    console.log(`[Governor] ${oceanName} -> OSS=${metrics.oss.toFixed(3)} | status=${state.status}`);
  }

  const continuityMode = computeContinuityMode(governorState);

  writeJson(CONFIG.governorStateFile, {
    oceans: results,
    continuityMode,
    updatedAt: new Date().toISOString()
  });

  console.log(`[Governor] Continuity Mode: ${continuityMode ? "ACTIVE" : "OFF"}`);
}

console.log("[Governor] Ocean Governance Engine starting…");
runGovernor();
setInterval(runGovernor, 5 * 60 * 1000);
