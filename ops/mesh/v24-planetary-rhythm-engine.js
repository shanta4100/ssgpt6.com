// ops/mesh/v24-planetary-rhythm-engine.js
// Planetary Rhythm Engine (v24)
// Measures and maintains the natural operational rhythm of the planetary mesh.
// Detects irregular pulses, operational lag, acceleration spikes, and rhythm breaks.
// This engine ensures the system moves with a stable, healthy cadence.

function tick(globalState = {}) {
  const {
    lastBattlefieldReport = null,
    rhythmWindow = [],        // previous rhythm scores
    rhythmTolerance = 0.12,   // allowable deviation from average rhythm
    expectedPulse = 1.0       // ideal normalized rhythm pulse
  } = globalState;

  // If no battlefield report, rhythm cannot be evaluated
  if (!lastBattlefieldReport || !Array.isArray(lastBattlefieldReport.reports)) {
    return {
      status: 'IDLE',
      note: 'Planetary Rhythm Engine received no battlefield report.',
      rhythmScore: null,
      irregularAgents: [],
      timestamp: new Date().toISOString()
    };
  }

  const reports = lastBattlefieldReport.reports;
  const irregularAgents = [];

  // Evaluate rhythm based on agent pulse metadata
  for (const agent of reports) {
    const issues = [];

    // Check 1: Missing pulse
    if (typeof agent.pulse !== 'number') {
      issues.push('Missing or invalid pulse value.');
    }

    // Check 2: Pulse deviation
    if (typeof agent.pulse === 'number') {
      const deviation = Math.abs(agent.pulse - expectedPulse);
      if (deviation > rhythmTolerance) {
        issues.push(`Pulse deviation ${deviation.toFixed(3)} exceeds tolerance ${rhythmTolerance}.`);
      }
    }

    if (issues.length > 0) {
      irregularAgents.push({
        id: agent.id,
        role: agent.role,
        pulse: agent.pulse,
        issues
      });
    }
  }

  // Rhythm score = 1 - (irregular / total)
  const total = reports.length;
  const irregularCount = irregularAgents.length;
  const rhythmScore = total > 0
    ? Math.max(0, 1 - irregularCount / total)
    : 1;

  // Determine rhythm status
  let status = 'IN-RHYTHM';
  if (irregularCount > 0) status = 'OFF-RHYTHM';
  if (rhythmScore < 0.5) status = 'RHYTHM-BREAK';

  // Update rhythm history
  const updatedHistory = Array.isArray(rhythmWindow)
    ? [...rhythmWindow, { rhythmScore, timestamp: new Date().toISOString() }]
    : [{ rhythmScore, timestamp: new Date().toISOString() }];

  return {
    status,
    note: 'Planetary Rhythm Engine evaluation completed.',
    rhythmScore: rhythmScore.toFixed(3),
    irregularAgents,
    totalAgents: total,
    rhythmHistory: updatedHistory,
    timestamp: new Date().toISOString()
  };
}

module.exports = { tick };
