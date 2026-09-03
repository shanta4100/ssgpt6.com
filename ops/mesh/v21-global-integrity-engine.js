// ops/mesh/v21-global-integrity-engine.js
// Global Integrity Engine (v21)
// Ensures honesty, consistency, and truthfulness across all agents.
// Detects corruption, data tampering, inconsistent states, or integrity drift.
// This engine protects the mesh from internal decay or silent failures.

function tick(globalState = {}) {
  const {
    lastBattlefieldReport = null,
    integrityChecks = [],      // optional custom integrity rules
    corruptionTolerance = 0.05, // allowable corruption ratio
    integrityHistory = []       // track past integrity scores
  } = globalState;

  // If no battlefield report, integrity cannot be evaluated
  if (!lastBattlefieldReport || !Array.isArray(lastBattlefieldReport.reports)) {
    return {
      status: 'IDLE',
      note: 'Global Integrity Engine received no battlefield report.',
      integrityScore: null,
      corruptedAgents: [],
      timestamp: new Date().toISOString()
    };
  }

  const reports = lastBattlefieldReport.reports;
  const corruptedAgents = [];

  // Built-in integrity checks
  for (const agent of reports) {
    const issues = [];

    // Check 1: Missing or malformed status
    if (!agent.status || typeof agent.status !== 'string') {
      issues.push('Invalid or missing status.');
    }

    // Check 2: Missing role
    if (!agent.role) {
      issues.push('Missing role definition.');
    }

    // Check 3: Placeholder agents should not report OK
    if (agent.placeholder && agent.status === 'OK') {
      issues.push('Placeholder agent reporting OK (contradiction).');
    }

    // Custom integrity checks
    for (const rule of integrityChecks) {
      if (rule.check && typeof rule.check === 'function') {
        const result = rule.check(agent);
        if (result === false) {
          issues.push(rule.name || 'Unnamed Integrity Rule');
        }
      }
    }

    if (issues.length > 0) {
      corruptedAgents.push({
        id: agent.id,
        role: agent.role,
        issues
      });
    }
  }

  // Integrity score = 1 - (corrupted / total)
  const total = reports.length;
  const corruptedCount = corruptedAgents.length;
  const integrityScore = total > 0
    ? Math.max(0, 1 - corruptedCount / total)
    : 1;

  // Detect corruption drift
  const driftDetected = integrityScore < (1 - corruptionTolerance);

  // Determine integrity status
  let status = 'INTEGRITY-STABLE';
  if (driftDetected) status = 'INTEGRITY-DRIFT';
  if (integrityScore < 0.5) status = 'CRITICAL-INTEGRITY-FAILURE';

  // Update integrity history
  const updatedHistory = Array.isArray(integrityHistory)
    ? [...integrityHistory, { integrityScore, timestamp: new Date().toISOString() }]
    : [{ integrityScore, timestamp: new Date().toISOString() }];

  return {
    status,
    note: 'Global Integrity Engine evaluation completed.',
    integrityScore: integrityScore.toFixed(3),
    corruptedAgents,
    driftDetected,
    totalAgents: total,
    integrityHistory: updatedHistory,
    timestamp: new Date().toISOString()
  };
}

module.exports = { tick };
