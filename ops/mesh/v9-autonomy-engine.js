// ops/mesh/v9-autonomy-engine.js
// Planetary Autonomy Engine (v9)
// Self-governing, self-optimizing, self-balancing, and self-configuring mesh intelligence.

const fs = require('fs');
const path = require('path');

const CONFIG = {
  meshConfigFile: path.join(__dirname, 'mesh-config.json'),
  governorStateFile: path.join(__dirname, 'governor-state.json'),
  federationFile: path.join(__dirname, 'federation-state.json'),
  memoryFile: path.join(__dirname, 'planetary-memory.json'),
  predictionFile: path.join(__dirname, 'prediction-state.json'),
  autonomyLog: path.join(__dirname, 'autonomy-log.json'),

  rebalanceInterval: 15 * 60 * 1000,
  thresholdAdjustRate: 0.01
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

function logAutonomy(event) {
  const log = readJson(CONFIG.autonomyLog, []);
  log.push({ event, time: new Date().toISOString() });
  writeJson(CONFIG.autonomyLog, log);
}

// ---------- Autonomous Threshold Adjustment ----------

function adjustThresholds(governorState, memory, prediction) {
  for (const [ocean, state] of Object.entries(governorState.oceans || {})) {
    const mem = memory[ocean];
    const pred = prediction.predictions[ocean];

    if (!mem || !pred) continue;

    if (pred.degradationRisk > 0.7) {
      state.dynamicDemotionThreshold =
        (state.dynamicDemotionThreshold || 0.45) +
        CONFIG.thresholdAdjustRate;
      logAutonomy(`Increased demotion threshold for ${ocean}.`);
    }

    if (mem.trustScore > 0.7) {
      state.dynamicPromotionThreshold =
        (state.dynamicPromotionThreshold || 0.85) -
        CONFIG.thresholdAdjustRate;
      logAutonomy(`Decreased promotion threshold for ${ocean}.`);
    }
  }
}

// ---------- Autonomous Backup Rebalancing ----------

function rebalanceBackups(meshConfig, governorState) {
  for (const [ocean, config] of Object.entries(meshConfig.oceans)) {
    const backups = config.rivers.app.backup;

    const safeBackups = backups.filter(b => {
      const state = governorState.oceans[b];
      return state && state.status !== "degraded";
    });

    if (safeBackups.length !== backups.length) {
      logAutonomy(`Autonomous backup rebalance for ${ocean}.`);
      config.rivers.app.backup = safeBackups;
    }
  }
}

// ---------- Autonomous Routing Weight Adjustment ----------

function adjustRoutingWeights(meshConfig, memory) {
  for (const [ocean, config] of Object.entries(meshConfig.oceans)) {
    const mem = memory[ocean];
    if (!mem) continue;

    const weight = Math.max(0.1, Math.min(2.0, mem.trustScore * 2));
    config.routingWeight = weight;

    logAutonomy(`Updated routing weight for ${ocean} -> ${weight.toFixed(2)}`);
  }
}

// ---------- Main Autonomy Logic ----------

function autonomize() {
  const meshConfig = readJson(CONFIG.meshConfigFile, {});
  const governorState = readJson(CONFIG.governorStateFile, {});
  const federation = readJson(CONFIG.federationFile, {});
  const memory = readJson(CONFIG.memoryFile, {});
  const prediction = readJson(CONFIG.predictionFile, { predictions: {} });

  adjustThresholds(governorState, memory, prediction);
  rebalanceBackups(meshConfig, governorState);
  adjustRoutingWeights(meshConfig, memory);

  writeJson(CONFIG.meshConfigFile, meshConfig);
  writeJson(CONFIG.governorStateFile, governorState);

  console.log("[v9] Autonomy Engine cycle complete.");
}

console.log("[v9] Planetary Autonomy Engine starting…");
autonomize();
setInterval(autonomize, CONFIG.rebalanceInterval);
