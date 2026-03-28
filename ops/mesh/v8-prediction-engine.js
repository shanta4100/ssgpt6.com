// ops/mesh/v8-prediction-engine.js
// Planetary Prediction Engine (v8)
// Forecasts future OSS, predicts degradation, and anticipates global instability.

const fs = require('fs');
const path = require('path');

const CONFIG = {
  memoryFile: path.join(__dirname, 'planetary-memory.json'),
  federationFile: path.join(__dirname, 'federation-state.json'),
  predictionFile: path.join(__dirname, 'prediction-state.json'),

  horizonShort: 5 * 60 * 1000,
  horizonMedium: 30 * 60 * 1000,
  horizonLong: 2 * 60 * 60 * 1000,
  horizonDay: 24 * 60 * 60 * 1000,

  volatilityWeight: 0.3,
  degradationWeight: 0.3,
  latencyWeight: 0.2,
  recoveryWeight: 0.2
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

// ---------- Prediction Model ----------

function predictOSS(memory, fed) {
  const m = memory;
  const f = fed;

  const volatilityPenalty = m.volatility * CONFIG.volatilityWeight;
  const degradationPenalty = m.degradationLikelihood * CONFIG.degradationWeight;
  const latencyPenalty = (f.latencyMs / 3000) * CONFIG.latencyWeight;
  const recoveryBonus = m.recoverySpeed * CONFIG.recoveryWeight;

  const base = f.oss || 0;

  const predicted =
    base +
    recoveryBonus -
    volatilityPenalty -
    degradationPenalty -
    latencyPenalty;

  return Math.max(0, Math.min(1, predicted));
}

function predictDegradation(memory, fed) {
  const risk =
    memory.volatility * 0.4 +
    memory.degradationLikelihood * 0.4 +
    (fed.latencyMs / 3000) * 0.2;

  return Math.max(0, Math.min(1, risk));
}

// ---------- Main ----------

function predict() {
  const memory = readJson(CONFIG.memoryFile, {});
  const federation = readJson(CONFIG.federationFile, { oceans: {} });

  const predictions = {};

  for (const [ocean, fed] of Object.entries(federation.oceans)) {
    const mem = memory[ocean];
    if (!mem) continue;

    const short = predictOSS(mem, fed);
    const medium = short * 0.9 + mem.reliability * 0.1;
    const long = medium * 0.8 + mem.reliability * 0.2;
    const day = long * 0.7 + mem.reliability * 0.3;

    const degradationRisk = predictDegradation(mem, fed);

    predictions[ocean] = {
      ossForecast: {
        short,
        medium,
        long,
        day
      },
      degradationRisk,
      likelyToDegrade: degradationRisk > 0.6,
      likelyToImprove: short > fed.oss
    };
  }

  writeJson(CONFIG.predictionFile, {
    predictions,
    updatedAt: new Date().toISOString()
  });

  console.log("[v8] Prediction Engine updated.");
}

console.log("[v8] Planetary Prediction Engine starting…");
predict();
setInterval(predict, 5 * 60 * 1000);
