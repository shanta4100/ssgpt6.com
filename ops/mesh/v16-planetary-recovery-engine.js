// ops/mesh/v16-planetary-recovery-engine.js
// Planetary Recovery Engine (v16)
// Detects damage, initiates recovery cycles, and restores system health.
// This engine ensures the mesh can heal itself after failures or instability.

function tick(globalState = {}) {
  const {
    lastBattlefieldReport = null,
    recoveryThreshold = 0.60, // if stability drops below this, recovery activates
    autoRecovery = true,      // enable automated recovery
    recoveryHistory = []      // track past recovery cycles
  } = globalState;

  // If no battlefield report, cannot evaluate recovery needs
  if (!lastBattlefieldReport || !Array.isArray(lastBattlefieldReport.reports)) {
    return {
      status: 'IDLE',
      note: 'Planetary Recovery Engine received no battlefield report.',
      recoveryActivated: false,
      actions: [],
      timestamp: new Date().toISOString()
    };
  }

  const reports = lastBattlefieldReport.reports;

  // Count statuses
  const total = reports.length;
  const ok = reports.filter(r => r.status === 'OK').length;
  const errors = reports.filter(r => r.status === 'ERROR').length;
  const sleeping = reports.filter(r => r.status === 'SLEEPING').length;

  const activeAgents = total - sleeping;
  const stabilityScore = activeAgents > 0 ? ok / activeAgents : 1;

  const actions = [];
  let recoveryActivated = false;

  // Trigger recovery if stability is too low
  if (stabilityScore < recoveryThreshold) {
    recoveryActivated = true;
    actions.push('Initiate recovery cycle: stability below threshold.');
  }

  // If errors exist, attempt to restart failing agents
  if (errors > 0) {
    actions.push(`Restart ${errors} failing agent(s).`);
  }

  // If too many agents are sleeping, wake a subset
  if (sleeping > total * 0.4) {
    actions.push('Wake sleeping agents to restore operational balance.');
  }

  // Auto-recovery logic
  if (autoRecovery && recoveryActivated) {
    actions.push('Auto-recovery enabled: applying corrective measures.');
  }

  // Update recovery history
  const updatedHistory = Array.isArray(recoveryHistory)
    ? [...recoveryHistory, { stabilityScore, timestamp: new Date().toISOString() }]
    : [{ stabilityScore, timestamp: new Date().toISOString() }];

  // Determine recovery status
  let status = 'STABLE';
  if (recoveryActivated) status = 'RECOVERING';
  if (errors > 0 && stabilityScore < 0.4) status = 'CRITICAL-RECOVERY';

  return {
    status,
    note: 'Planetary Recovery Engine evaluation completed.',
    stabilityScore: stabilityScore.toFixed(3),
    activeAgents,
    totalAgents: total,
    errors,
    sleeping,
    recoveryActivated,
    actions,
    recoveryHistory: updatedHistory,
    timestamp: new Date().toISOString()
  };
}

module.exports = { tick };
