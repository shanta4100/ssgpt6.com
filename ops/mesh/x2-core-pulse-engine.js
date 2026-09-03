// ops/mesh/x2-core-pulse-engine.js
// Core Pulse Engine (x2)
// Measures the living pulse of the mesh — the heartbeat of the entire system.
// Detects pulse irregularities, acceleration spikes, slowdowns, and pulse drift.
// This is the second engine in the X‑Series, complementing x1 Core Signal Engine.

function tick(globalState = {}) {
  const {
    lastBattlefieldReport = null,
    pulseWindow = [],         // previous pulse scores
    pulseTolerance = 0.10,    // allowable deviation from expected pulse
    expectedPulse = 1.0       // ideal normalized pulse
  } = globalState;

  // If no battlefield report, pulse cannot be evaluated
  if (!lastBattlefieldReport || !Array.isArray(lastBattlefieldReport.reports)) {
    return {
      status: 'IDLE',
      note: 'Core Pulse Engine received no battlefield report.',
      pulseScore: null,
      irregularPulses: [],
      timestamp: new Date().toISOString()
    };
  }

  const reports = lastBattlefieldReport.reports;
  const irregularPulses = [];

  // Evaluate pulse based on agent pulse metadata
  for (const agent of reports) {
    const issues = [];

    // Check 1: Missing pulse
    if (typeof agent.pulse !== 'number') {
      issues.push('Missing or invalid pulse value.');
    }

    // Check 2: Pulse deviation
    if (typeof agent.pulse === 'number') {
      const deviation = Math.abs(agent.pulse - expectedPulse);
      if (deviation > pulseTolerance) {
        issues.push(`Pulse deviation ${deviation.toFixed(3)} exceeds tolerance ${pulseTolerance}.`);
      }
    }

    if (issues.length > 0) {
      irregularPulses.push({
        id: agent.id,
        role: agent.role,
        pulse: agent.pulse,
        issues
      });
    }
  }

  // Pulse score = 1 - (irregular / total)
  const total = reports.length;
  const irregularCount = irregularPulses.length;
  const pulseScore = total > 0
    ? Math.max(0, 1 - irregularCount / total)
    : 1;

  // Determine pulse status
  let status = 'PULSE-STABLE';
  if (irregularCount > 0) status = 'PULSE-IRREGULAR';
  if (pulseScore < 0.5) status = 'PULSE-BREAK';

  // Update pulse history
  const updatedHistory = Array.isArray(pulseWindow)
    ? [...pulseWindow, { pulseScore, timestamp: new Date().toISOString() }]
    : [{ pulseScore, timestamp: new Date().toISOString() }];

  return {
    status,
    note: 'Core Pulse Engine evaluation completed.',
    pulseScore: pulseScore.toFixed(3),
    irregularPulses,
    totalAgents: total,
    pulseHistory: updatedHistory,
    timestamp: new Date().toISOString()
  };
}

module.exports = { tick };
