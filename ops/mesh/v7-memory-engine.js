// ops/mesh/v7-memory-engine.js
// Planetary Memory Engine (v7)
// Learns long-term ocean behavior, builds profiles, and evolves routing/healing.

const fs = require('fs');
const path = require('path');

const CONFIG = {
  historyFile: path.join(__dirname, 'mesh-history.json'),
  governorStateFile: path.join(__dirname, 'governor-state.json'),
  federationFile: path.join(__dirname, 'federation-state.json'),
  memoryFile: path.join(__dirname, 'planetary-memory.json'),

  maxHistory: 5000,
  learningRate: 0.05
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

// ---------- Initialize Memory ----------

function initMemory(oceans) {
  const memory = {};
  for (const ocean of oceans) {
    memory[ocean] = {
      reliability: 0.5,
      volatility: 0.5,
      recoverySpeed: 0.5,
      degradationLikelihood: 0.5,
      latencyPersonality: 0.5,
      trustScore: 0.5,
      history: []
    };
  }
  return memory;
}

// ---------- Update Memory ----------

function updateMemory(memory, ocean, fed, gov) {
  const m = memory[ocean];

  const oss = fed.oss || 0;
  const degraded = gov.status === "degraded";
  const preferred = gov.status === "preferred";
  const latency = fed.latencyMs || 1500;

  m.history.push({
    oss,
    degraded,
    preferred,
    latency,
    time: Date.now()
  });

  if (m.history.length > CONFIG.maxHistory) {
    m.history = m.history.slice(-CONFIG.maxHistory);
  }

  m.reliability += CONFIG.learningRate * (oss - m.reliability);
  m.volatility += CONFIG.learningRate * ((degraded ? 1 : 0) - m.volatility);
  m.recoverySpeed += CONFIG.learningRate * ((preferred ? 1 : 0) - m.recoverySpeed);
  m.degradationLikelihood += CONFIG.learningRate * ((degraded ? 1 : 0) - m.degradationLikelihood);
  m.latencyPersonality += CONFIG.learningRate * ((latency / 3000) - m.latencyPersonality);

  m.trustScore =
    m.reliability * 0.5 +
    (1 - m.volatility) * 0.2 +
    m.recoverySpeed * 0.2 +
    (1 - m.degradationLikelihood) * 0.1;

  return m;
}

// ---------- Main ----------

function learn() {
  const federation = readJson(CONFIG.federationFile, {});
  const governor = readJson(CONFIG.governorStateFile, {});
  let memory = readJson(CONFIG.memoryFile, null);

  const oceans = Object.keys(federation.oceans || {});

  if (!memory) {
    memory = initMemory(oceans);
  }

  for (const ocean of oceans) {
    const fed = federation.oceans[ocean];
    const gov = governor.oceans[ocean];

    if (!fed || !gov) continue;

    memory[ocean] = updateMemory(memory, ocean, fed, gov);
  }

  writeJson(CONFIG.memoryFile, memory);
  console.log("[v7] Planetary Memory Engine updated.");
}

console.log("[v7] Starting Planetary Memory Engine…");
learn();
setInterval(learn, 10 * 60 * 1000);
