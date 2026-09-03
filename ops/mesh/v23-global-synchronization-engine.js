// ops/mesh/v23-global-synchronization-engine.js
// Global Synchronization Engine (v23)
// Ensures all agents operate on a unified temporal and operational rhythm.
// Detects timing drift, desynchronization, and phase conflicts between agents.
// This engine keeps the mesh "in sync" across all layers.

function tick(globalState = {}) {
  const {
    lastBattlefieldReport = null,
    syncTolerance = 0.10,       // allowable timing drift ratio
    syncHistory = [],           // track past synchronization scores
    expectedPhase = 'ACTIVE',   // expected operational phase
  } = globalState;

  // If no battlefield report, synchronization cannot be evaluated
  if (!lastBattlefieldReport || !Array.isArray(lastBattlefieldReport.reports)) {
    return {
      status: 'IDLE',
      note: 'Global Synchronization Engine received no battlefield report.',
      syncScore: null,
      desyncedAgents: [],
      timestamp: new Date().toISOString()
    };
  }

  const reports = lastBattlefieldReport.reports;
  const desyncedAgents = [];

  // Evaluate synchronization based on agent phase + timing metadata
  for (const agent of reports) {
    const issues = [];

    // Check 1: Missing or invalid phase
    if (!agent.phase || typeof agent.phase !== 'string') {
      issues.push('Missing or invalid phase.');
    }

    // Check 2: Phase mismatch
    if (agent.phase && agent.phase !== expectedPhase) {
      issues.push(`Phase mismatch: expected ${expectedPhase}, got ${agent.phase}.`);
    }

    // Check 3: Timing drift (if provided)
    if (typeof agent.drift === 'number' && Math.abs(agent.drift) > syncTolerance) {
      issues.push(`Timing drift ${agent.drift} exceeds tolerance ${syncTolerance}.`);
    }

    if (issues.length > 0) {
      desyncedAgents.push({
        id: agent.id,
        role: agent.role,
        phase: agent.phase,
        drift: agent.drift,
        issues
      });
    }
  }

  // Sync score = 1 - (desynced / total)
  const total = reports.length;
  const desyncedCount = desyncedAgents.length;
  const syncScore = total > 0
    ? Math.max(0, 1 - desyncedCount / total)
    : 1;

  // Determine synchronization status
  let status = 'SYNCHRONIZED';
  if (desyncedCount > 0) status = 'PARTIALLY-DESYNCED';
  if (syncScore < 0.5) status = 'CRITICAL-DESYNC';

  // Update sync history
  const updatedHistory = Array.isArray(syncHistory)
    ? [...syncHistory, { syncScore, timestamp: new Date().toISOString() }]
    : [{ syncScore, timestamp: new Date().toISOString() }];

  return {
    status,
    note: 'Global Synchronization Engine evaluation completed.',
    syncScore: syncScore.toFixed(3),
    desyncedAgents,
    totalAgents: total,
    syncHistory: updatedHistory,
    timestamp: new Date().toISOString()
  };
}

module.exports = { tick };
