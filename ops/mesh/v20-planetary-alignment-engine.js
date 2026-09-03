// ops/mesh/v20-planetary-alignment-engine.js
// Planetary Alignment Engine (v20)
// Ensures all system components align with the core mission, values, and direction.
// Detects drift, misalignment, or divergence between agents and the planetary mesh vision.

function tick(globalState = {}) {
  const {
    lastBattlefieldReport = null,
    alignmentPrinciples = [],   // list of core alignment principles
    driftTolerance = 0.15,      // allowable misalignment ratio
    alignmentHistory = []       // track past alignment scores
  } = globalState;

  // If no battlefield report, alignment cannot be evaluated
  if (!lastBattlefieldReport || !Array.isArray(lastBattlefieldReport.reports)) {
    return {
      status: 'IDLE',
      note: 'Planetary Alignment Engine received no battlefield report.',
      alignmentScore: null,
      driftDetected: false,
      misalignedAgents: [],
      timestamp: new Date().toISOString()
    };
  }

  const reports = lastBattlefieldReport.reports;

  // If no alignment principles defined, system cannot evaluate alignment
  if (!Array.isArray(alignmentPrinciples) || alignmentPrinciples.length === 0) {
    return {
      status: 'UNDEFINED',
      note: 'No alignment principles provided — cannot evaluate planetary alignment.',
      alignmentScore: null,
      driftDetected: false,
      misalignedAgents: [],
      timestamp: new Date().toISOString()
    };
  }

  const misalignedAgents = [];

  // Check each agent against alignment principles
  for (const agent of reports) {
    const violations = [];

    for (const principle of alignmentPrinciples) {
      if (principle.check && typeof principle.check === 'function') {
        const result = principle.check(agent);
        if (result === false) {
          violations.push(principle.name || 'Unnamed Principle');
        }
      }
    }

    if (violations.length > 0) {
      misalignedAgents.push({
        id: agent.id,
        role: agent.role,
        violations
      });
    }
  }

  // Alignment score = 1 - (misaligned / total)
  const total = reports.length;
  const misalignedCount = misalignedAgents.length;
  const alignmentScore = total > 0
    ? Math.max(0, 1 - misalignedCount / total)
    : 1;

  // Drift detection
  const driftDetected = alignmentScore < (1 - driftTolerance);

  // Determine alignment status
  let status = 'ALIGNED';
  if (driftDetected) status = 'DRIFTING';
  if (alignmentScore < 0.5) status = 'CRITICAL-MISALIGNMENT';

  // Update alignment history
  const updatedHistory = Array.isArray(alignmentHistory)
    ? [...alignmentHistory, { alignmentScore, timestamp: new Date().toISOString() }]
    : [{ alignmentScore, timestamp: new Date().toISOString() }];

  return {
    status,
    note: 'Planetary Alignment Engine evaluation completed.',
    alignmentScore: alignmentScore.toFixed(3),
    misalignedAgents,
    driftDetected,
    totalAgents: total,
    alignmentHistory: updatedHistory,
    timestamp: new Date().toISOString()
  };
}

module.exports = { tick };
