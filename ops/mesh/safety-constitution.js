// ops/mesh/safety-constitution.js
// Sovereign Safety Layer (Constitutional Mesh)
// Ensures safe routing, prevents contradictions, and protects global integrity.

const fs = require('fs');
const path = require('path');

const CONFIG = {
  meshConfigFile: path.join(__dirname, 'mesh-config.json'),
  governorStateFile: path.join(__dirname, 'governor-state.json'),
  federationFile: path.join(__dirname, 'federation-state.json'),
  constitutionLog: path.join(__dirname, 'constitution-log.json')
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

function logEvent(event) {
  const log = readJson(CONFIG.constitutionLog, []);
  log.push({ event, time: new Date().toISOString() });
  writeJson(CONFIG.constitutionLog, log);
}

// ---------- Core Checks ----------

function validateCoreOcean(meshConfig) {
  const cores = Object.entries(meshConfig.oceans)
    .filter(([_, o]) => o.rivers.app.core)
    .map(([name]) => name);

  if (cores.length !== 1) {
    logEvent("Invalid core ocean count. Repairing…");

    const first = cores[0] || Object.keys(meshConfig.oceans)[0];

    for (const ocean of Object.keys(meshConfig.oceans)) {
      meshConfig.oceans[ocean].rivers.app.core = (ocean === first);
    }
  }
}

// ---------- Status Contradictions ----------

function fixContradictions(governorState) {
  for (const [ocean, data] of Object.entries(governorState.oceans || {})) {
    if (data.status === "preferred" && data.predictiveDegradation) {
      logEvent(`Contradiction: ${ocean} preferred but degraded. Resetting.`);
      data.status = "normal";
    }

    if (data.status === "preferred" && data.oss < 0.85) {
      logEvent(`Invalid preferred state for ${ocean}. Resetting.`);
      data.status = "normal";
    }

    if (data.status === "degraded" && data.oss > 0.45) {
      logEvent(`Invalid degraded state for ${ocean}. Resetting.`);
      data.status = "normal";
    }
  }
}

// ---------- Backup Chain Safety ----------

function validateBackupChains(meshConfig, governorState) {
  for (const [ocean, config] of Object.entries(meshConfig.oceans)) {
    const backups = config.rivers.app.backup;

    const safeBackups = backups.filter(b => {
      const state = governorState.oceans[b];
      return state && state.status !== "degraded";
    });

    if (safeBackups.length !== backups.length) {
      logEvent(`Unsafe backups removed for ${ocean}.`);
      config.rivers.app.backup = safeBackups;
    }
  }
}

// ---------- Continuity Mode Safety ----------

function validateContinuityMode(governorState) {
  const degradedCount = Object.values(governorState.oceans)
    .filter(o => o.status === "degraded").length;

  const shouldBeActive = degradedCount >= 3;

  if (governorState.continuityMode !== shouldBeActive) {
    logEvent("Correcting continuity mode.");
    governorState.continuityMode = shouldBeActive;
  }
}

// ---------- Main ----------

function enforceConstitution() {
  const meshConfig = readJson(CONFIG.meshConfigFile, {});
  const governorState = readJson(CONFIG.governorStateFile, {});
  const federation = readJson(CONFIG.federationFile, {});

  validateCoreOcean(meshConfig);
  fixContradictions(governorState);
  validateBackupChains(meshConfig, governorState);
  validateContinuityMode(governorState);

  writeJson(CONFIG.meshConfigFile, meshConfig);
  writeJson(CONFIG.governorStateFile, governorState);

  console.log("[Constitution] Sovereign Safety Layer enforced.");
}

console.log("[Constitution] Starting Sovereign Safety Layer…");
enforceConstitution();
setInterval(enforceConstitution, 2 * 60 * 1000);
