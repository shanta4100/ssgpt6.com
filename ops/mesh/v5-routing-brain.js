// ops/mesh/v5-routing-brain.js
// Global Routing Brain (v5)
// Planetary-scale routing using federation intelligence + OSS + continuity mode.

const fs = require('fs');
const path = require('path');

const CONFIG = {
  federationFile: path.join(__dirname, 'federation-state.json'),
  meshConfigFile: path.join(__dirname, 'mesh-config.json')
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

// ---------- Compute Global Routing Score ----------

function computeGlobalScore(ocean) {
  let score = 0;

  score += ocean.oss || 0;

  if (ocean.status === "preferred") score += 0.15;
  if (ocean.status === "degraded") score -= 0.25;

  if (ocean.predictiveDegradation) score -= 0.1;

  return score;
}

// ---------- Select Best Ocean ----------

function selectBestOcean(federation, meshConfig) {
  const oceans = federation.oceans || {};
  const continuity = federation.continuityMode || false;

  let bestOcean = null;
  let bestScore = -Infinity;

  for (const [name, data] of Object.entries(oceans)) {
    const score = computeGlobalScore(data);

    if (continuity) {
      if (data.status === "degraded") continue;
    }

    if (score > bestScore) {
      bestScore = score;
      bestOcean = name;
    }
  }

  if (!bestOcean) {
    bestOcean = Object.keys(meshConfig.oceans)[0];
    bestScore = 0;
  }

  return { bestOcean, bestScore };
}

// ---------- Main Routing Decision ----------

function route() {
  const federation = readJson(CONFIG.federationFile, {});
  const meshConfig = readJson(CONFIG.meshConfigFile, { oceans: {} });

  const { bestOcean, bestScore } = selectBestOcean(federation, meshConfig);

  const oceanConfig = meshConfig.oceans[bestOcean];
  const river = oceanConfig.rivers.app;

  const decision = {
    ocean: bestOcean,
    score: bestScore,
    continuityMode: federation.continuityMode || false,
    active: river.active,
    backup: river.backup,
    reason: `Selected ${bestOcean} with score ${bestScore.toFixed(3)}`
  };

  console.log("[v5] Routing Decision:", decision);
  return decision;
}

module.exports = { route };
