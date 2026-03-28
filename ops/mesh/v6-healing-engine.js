// ops/mesh/v6-healing-engine.js
// Planetary Healing Engine (v6)
// Repairs degraded oceans, restores stability, and reintroduces them safely.

const fs = require('fs');
const path = require('path');

const CONFIG = {
  governorStateFile: path.join(__dirname, 'governor-state.json'),
  federationFile: path.join(__dirname, 'federation-state.json'),
  meshConfigFile: path.join(__dirname, 'mesh-config.json'),
  healingLog: path.join(__dirname, 'healing-log.json'),

  reactivationThreshold: 0.55,
  healingWindow: 30 * 60 * 1000 // 30 minutes
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

// ---------- Logging ----------

function logHealing(event) {
  const log = readJson(CONFIG.healingLog, []);
  log.push({ event, time: new Date().toISOString() });
  writeJson(CONFIG.healingLog, log);
}

// ---------- Healing Protocols ----------

function softResetOcean(governorState, ocean) {
  logHealing(`Soft reset triggered for ${ocean}.`);

  governorState.oceans[ocean].predictiveDegradation = false;
  governorState.oceans[ocean].demotedAt = null;
}

function recalibrateLatency(federation, ocean) {
  const data = federation.oceans[ocean];
  if (!data) return;

  if (data.latencyMs && data.latencyMs > 2000) {
    logHealing(`Latency recalibration for ${ocean}.`);
    data.latencyMs = Math.max(800, data.latencyMs * 0.7);
  }
}

function clearPredictiveFlags(governorState, ocean) {
  if (governorState.oceans[ocean].predictiveDegradation) {
    logHealing(`Clearing predictive degradation for ${ocean}.`);
    governorState.oceans[ocean].predictiveDegradation = false;
  }
}

function restoreOcean(governorState, ocean) {
  logHealing(`Restoring ${ocean} to normal state.`);
  governorState.oceans[ocean].status = "normal";
  governorState.oceans[ocean].demotedAt = null;
}

// ---------- Main Healing Logic ----------

function heal() {
  const governorState = readJson(CONFIG.governorStateFile, {});
  const federation = readJson(CONFIG.federationFile, {});
  const meshConfig = readJson(CONFIG.meshConfigFile, { oceans: {} });

  for (const [ocean, state] of Object.entries(governorState.oceans || {})) {
    const fed = federation.oceans[ocean];

    if (!fed) continue;

    if (state.status === "degraded") {
      logHealing(`Healing cycle started for ${ocean}.`);

      softResetOcean(governorState, ocean);
      recalibrateLatency(federation, ocean);
      clearPredictiveFlags(governorState, ocean);

      if (fed.oss >= CONFIG.reactivationThreshold) {
        restoreOcean(governorState, ocean);
      }
    }
  }

  writeJson(CONFIG.governorStateFile, governorState);
  writeJson(CONFIG.federationFile, federation);

  console.log("[v6] Healing cycle complete.");
}

console.log("[v6] Planetary Healing Engine starting…");
heal();
setInterval(heal, CONFIG.healingWindow);
