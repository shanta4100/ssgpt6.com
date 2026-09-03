// ops/mesh/v10-orchestration.js
// Planetary Orchestration Engine (v10)
// Coordinates all soldiers (agents) at a high level: reads their reports, derives a global summary.

const fs = require('fs');
const path = require('path');

// Optional: where orchestration summaries can be logged
const ORCHESTRATION_LOG = path.join(__dirname, 'orchestration-log.json');

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

/**
 * Orchestrator tick
 * Expects globalState to optionally contain:
 * - lastBattlefieldReport: { reports: [...], updatedAt: ... }
 */
function tick(globalState = {}) {
  const lastReport = globalState.lastBattlefieldReport || null;

  if (!lastReport || !Array.isArray(lastReport.reports)) {
    const summary = {
      status: 'IDLE',
      note: 'No battlefield report provided to v10 orchestration.',
      timestamp: new Date().toISOString()
    };
    safeLog(summary);
    return summary;
  }

  const reports = lastReport.reports;

  const total = reports.length;
  const ok = reports.filter(r => r.status === 'OK').length;
  const errors = reports.filter(r => r.status === 'ERROR').length;
  const sleeping = reports.filter(r => r.status === 'SLEEPING').length;

  const roles = {};
  for (const r of reports) {
    roles[r.role] = (roles[r.role] || 0) + 1;
  }

  const summary = {
    status: errors > 0 ? 'DEGRADED' : 'STABLE',
    note: 'Planetary Orchestration summary over all active soldiers.',
    counts: {
      totalSoldiers: total,
      ok,
      errors,
      sleeping
    },
    roles,
    lastUpdatedFromBattlefield: lastReport.updatedAt || null,
    timestamp: new Date().toISOString()
  };

  safeLog(summary);
  return summary;
}

function safeLog(entry) {
  const existing = readJson(ORCHESTRATION_LOG, []);
  existing.push(entry);
  writeJson(ORCHESTRATION_LOG, existing);
}

module.exports = { tick };
