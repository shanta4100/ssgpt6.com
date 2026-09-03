// ops/mesh/v15-global-continuity-engine.js
// Global Continuity Engine (v15)
// Ensures long-term operational continuity, resilience, and forward momentum.
// This engine protects the mesh from stagnation, decay, or long-term drift.

function tick(globalState = {}) {
  const {
    lastBattlefieldReport = null,
    continuityWindow = [],   // previous continuity scores
    minimumContinuity = 0.75, // minimum acceptable continuity score
    decayTolerance = 0.10     // how much decline is allowed before warning
  } = globalState;

  // If no battlefield report, continuity cannot be evaluated
  if (!lastBattlefieldReport || !Array.isArray(lastBattlefieldReport.reports)) {
    return {
      status: 'IDLE',
      note: 'Global Continuity Engine received no battlefield report.',
      continuityScore: null,
      decayDetected: false,
      timestamp: new Date().toISOString()
    };
  }

  const reports = lastBattlefieldReport.reports;

  // Count statuses
  const total = reports.length;
  const ok = reports.filter(r => r.status === 'OK').length;
  const sleeping = reports.filter(r => r.status === 'SLEEPING').length;

  // Continuity score = OK / total (sleeping agents still count as present)
  const continuityScore = total > 0 ? ok / total : 1;

  const warnings = [];
  let decayDetected = false;

  // Check if continuity is below minimum threshold
  if (continuityScore < minimumContinuity) {
    warnings.push(
      `Continuity score ${continuityScore.toFixed(2)} below minimum ${minimumContinuity}.`
    );
  }

  // Detect long-term decay using continuityWindow
  if (Array.isArray(continuityWindow) && continuityWindow.length > 1) {
    const last = continuityWindow[continuityWindow.length - 1];
    const prev = continuityWindow[continuityWindow.length - 2];
    const diff = last - prev;

    if (diff < -decayTolerance) {
      decayDetected = true;
      warnings.push('Long-term continuity decay detected.');
    }
  }

  // Determine continuity status
  let status = 'CONTINUOUS';
  if (warnings.length > 0) status = 'AT-RISK';
  if (decayDetected && continuityScore < minimumContinuity) status = 'CRITICAL';

  return {
    status,
    note: 'Global Continuity Engine evaluation completed.',
    continuityScore: continuityScore.toFixed(3),
    totalAgents: total,
    okAgents: ok,
    sleepingAgents: sleeping,
    decayDetected,
    warnings,
    timestamp: new Date().toISOString()
  };
}

module.exports = { tick };
