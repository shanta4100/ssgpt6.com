// ops/mesh/master-bundle.js
// Master Bundle: registers all agents (v3..v∞) as soldiers on the battlefield.

const path = require('path');

// Safe loader to prevent crashes if a module is missing
function safeRequire(p) {
  try {
    return require(p);
  } catch {
    return null;
  }
}

// ---------------------------------------------------------
// REGISTER ALL SOLDIERS HERE
// ---------------------------------------------------------
const agents = [
  { id: 'v3',  file: './v3-routing-brain',        role: 'safe-routing' },
  { id: 'v4',  file: './v4-optimizer-brain',      role: 'optimized-routing' },
  { id: 'v5',  file: './v5-routing-brain',        role: 'planetary-routing' },
  { id: 'v6',  file: './v6-healing-engine',       role: 'healing' },
  { id: 'v7',  file: './v7-memory-engine',        role: 'memory' },
  { id: 'v8',  file: './v8-prediction-engine',    role: 'prediction' },
  { id: 'v9',  file: './v9-autonomy-engine',      role: 'autonomy' },
  { id: 'v10', file: './v10-orchestration',       role: 'orchestration' },

  // ⭐ NEW: COMBINATORICS + FUTURE EARNINGS SOLDIER ⭐
  { id: 'vC', file: './v-combinatorics-soldier', role: 'combinatorics-soldier' }
];

// ---------------------------------------------------------
// LOAD SOLDIERS
// ---------------------------------------------------------
function loadAgents() {
  return agents
    .map(a => {
      const mod = safeRequire(path.join(__dirname, a.file));
      if (!mod) return null;

      return {
        id: a.id,
        role: a.role,
        callSign: `${a.id.toUpperCase()}-${a.role.toUpperCase()}`,
        tick:
          mod.tick ||
          mod.route ||
          mod.run ||
          mod.heal ||
          mod.learn ||
          mod.predict ||
          mod.autonomize ||
          (() => ({ status: 'NOOP' }))
      };
    })
    .filter(Boolean);
}

// ---------------------------------------------------------
// BATTLEFIELD EXECUTION LOOP
// ---------------------------------------------------------
function battlefieldTick(globalState = {}) {
  const loaded = loadAgents();
  const reports = [];

  for (const soldier of loaded) {
    try {
      const result = soldier.tick(globalState) || {};
      reports.push({
        id: soldier.id,
        role: soldier.role,
        callSign: soldier.callSign,
        status: result.status || 'OK',
        note: result.note || null,
        output: result.output || result
      });
    } catch (e) {
      reports.push({
        id: soldier.id,
        role: soldier.role,
        callSign: soldier.callSign,
        status: 'ERROR',
        note: e.message
      });
    }
  }

  return {
    reports,
    updatedAt: new Date().toISOString()
  };
}

module.exports = { battlefieldTick };
