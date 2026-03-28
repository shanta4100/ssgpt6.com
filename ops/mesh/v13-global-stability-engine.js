// ops/mesh/v13-global-stability-engine.js
// Global Stability Engine (v13)
// Monitors systemic stability across all agents, detects instability patterns,
// and provides early warnings for global mesh imbalance.

function tick(globalState = {}) {
  const {
    lastBattlefieldReport = null,
    stabilityThreshold = 0.85, // default: 85% of agents must be OK
    volatilityWindow = []      // optional: previous stability snapshots
  } = globalState;

  // If no battlefield report, cannot evaluate stability
  if (!lastBattlefieldReport || !Array.isArray(lastBattlefieldReport.reports)) {
    return {
      status: 'IDLE',
      note: 'Global Stability Engine received no battlefield report.',
      stabilityScore: null,
      warnings: [],
      timestamp: new Date().toISOString()
    };
  }

  const reports = lastBattlefieldReport.reports;

  // Count statuses
  const total = reports.length;
  const ok = reports.filter(r => r.status === 'OK').length;
  const errors = reports.filter(r => r.status === 'ERROR').length;
  const sleeping = reports.filter(r => r.status === 'SLEEPING').length;

  // Stability score = OK / (total - sleeping)
  const activeAgents = total - sleeping;
  const stabilityScore = activeAgents > 0 ? ok / activeAgents : 1;

  const warnings = [];

  // Warning: too many errors
  if (errors > 0) {
    warnings.push(`Detected ${errors} agent(s) in ERROR state.`);
  }

  // Warning: stability below threshold
  if (stabilityScore < stabilityThreshold) {
    warnings.push(
      `Stability score ${stabilityScore.toFixed(2)} below threshold ${stabilityThreshold}.`
    );
  }

  // Warning: too many sleeping agents
  if (sleeping > total * 0.5) {
    warnings.push('More than half of all agents are sleeping — system may be dormant.');
  }

  // Optional: volatility detection
  let volatility = null;
  if (Array.isArray(volatilityWindow) && volatilityWindow.length > 2) {
    const recent = volatilityWindow.slice(-3);
    const diffs = [];
    for (let i = 1; i < recent.length; i++) {
      diffs.push(Math.abs(recent[i] - recent[i - 1]));
    }
    const avgDiff = diffs.reduce((a, b) => a + b, 0) / diffs.length;
    volatility = avgDiff;

    if (avgDiff > 0.15) {
      warnings.push('High volatility detected in recent stability scores.');
    }
  }

  // Determine global stability status
  let status = 'STABLE';
  if (warnings.length > 0) status = 'UNSTABLE';
  if (errors > 0 && stabilityScore < 0.5) status = 'CRITICAL';

  return {
    status,
    note: 'Global Stability Engine evaluation completed.',
    stabilityScore: stabilityScore.toFixed(3),
    activeAgents,
    totalAgents: total,
    errors,
    sleeping,
    volatility,
    warnings,
    timestamp: new Date().toISOString()
  };
}

module.exports = { tick };
