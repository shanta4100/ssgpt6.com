// ops/mesh/v14-planetary-safety-net.js
// Planetary Safety Net Engine (v14)
// Provides fallback protection, redundancy checks, and emergency stabilization.
// This engine ensures the mesh never collapses, even if multiple agents fail.

function tick(globalState = {}) {
  const {
    lastBattlefieldReport = null,
    safetyThreshold = 0.70, // minimum acceptable stability score
    redundancyEnabled = true,
    emergencyMode = false
  } = globalState;

  // If no battlefield report, safety net cannot evaluate
  if (!lastBattlefieldReport || !Array.isArray(lastBattlefieldReport.reports)) {
    return {
      status: 'IDLE',
      note: 'Planetary Safety Net received no battlefield report.',
      emergencyTriggered: false,
      fallbackActions: [],
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

  const fallbackActions = [];
  let emergencyTriggered = false;

  // Trigger emergency mode if stability is too low
  if (stabilityScore < safetyThreshold) {
    emergencyTriggered = true;
    fallbackActions.push('Activate emergency stabilization protocol.');
  }

  // If too many errors, isolate failing agents
  if (errors > 0) {
    fallbackActions.push(`Isolate ${errors} failing agent(s) to prevent cascade failure.`);
  }

  // If redundancy is enabled, activate backup systems
  if (redundancyEnabled) {
    fallbackActions.push('Redundancy enabled: activating backup safety nodes.');
  }

  // If emergency mode is already active, escalate
  if (emergencyMode) {
    fallbackActions.push('Emergency mode already active: escalating to Level 2 safety net.');
  }

  // Determine safety net status
  let status = 'SAFE';
  if (emergencyTriggered) status = 'UNSAFE';
  if (emergencyMode && emergencyTriggered) status = 'CRITICAL';

  return {
    status,
    note: 'Planetary Safety Net evaluation completed.',
    stabilityScore: stabilityScore.toFixed(3),
    activeAgents,
    totalAgents: total,
    errors,
    sleeping,
    emergencyTriggered,
    fallbackActions,
    timestamp: new Date().toISOString()
  };
}

module.exports = { tick };
