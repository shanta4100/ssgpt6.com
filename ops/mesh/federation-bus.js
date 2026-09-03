// ops/mesh/federation-bus.js
// Federation Intelligence Bus (FIB)
// Collects, normalizes, merges, and broadcasts global ocean intelligence.

const fs = require('fs');
const path = require('path');

const CONFIG = {
  healthStateFile: path.join(__dirname, 'health-state.json'),
  governorStateFile: path.join(__dirname, 'governor-state.json'),
  federationFile: path.join(__dirname, 'federation-state.json'),
  historyFile: path.join(__dirname, 'mesh-history.json')
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

// ---------- Merge Intelligence ----------

function mergeIntelligence(health, governor, history) {
  const oceans = Object.keys(governor.oceans || {});
  const globalMap = {};

  for (const ocean of oceans) {
    const g = governor.oceans[ocean] || {};
    const h = health[ocean] || {};
    const recent = history.filter(e => e.ocean === ocean).slice(-50);

    globalMap[ocean] = {
      oss: g.oss || 0,
      status: g.status || "unknown",
      latencyMs: h.latencyMs || null,
      errorRate: h.errorRate || null,
      predictiveDegradation: h.predictiveDegradation || false,
      recentHistory: recent
    };
  }

  return {
    oceans: globalMap,
    continuityMode: governor.continuityMode || false,
    updatedAt: new Date().toISOString()
  };
}

// ---------- Main ----------

function runFederationBus() {
  const health = readJson(CONFIG.healthStateFile, {});
  const governor = readJson(CONFIG.governorStateFile, {});
  const history = readJson(CONFIG.historyFile, []);

  const federationState = mergeIntelligence(health, governor, history);

  writeJson(CONFIG.federationFile, federationState);

  console.log("[FIB] Federation Intelligence Bus updated global state.");
}

console.log("[FIB] Starting Federation Intelligence Bus…");
runFederationBus();
setInterval(runFederationBus, 60 * 1000);
