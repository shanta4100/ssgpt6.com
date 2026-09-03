// ops/mesh/x1-core-signal-engine.js
// Core Signal Engine (x1)
// A new foundational soldier that listens for universal signals across the mesh.
// It detects activation cues, global pulses, and system-wide intent shifts.
// This is the first engine in the new X‑Series.

function tick(globalState = {}) {
  const {
    lastBattlefieldReport = null,
    signalWindow = [],       // previous signal strengths
    sensitivity = 0.08,      // how sensitive the engine is to signal changes
    expectedSignal = 1.0     // ideal normalized signal strength
  } = globalState;

  // If no battlefield report, cannot evaluate signals
  if (!lastBattlefieldReport || !Array.isArray(lastBattlefieldReport.reports)) {
    return {
      status: 'IDLE',
      note: 'Core Signal Engine received no battlefield report.',
      signalStrength: null,
      anomalies: [],
      timestamp: new Date().toISOString()
    };
  }

  const reports = lastBattlefieldReport.reports;
  const anomalies = [];

  // Evaluate signal based on agent signal metadata
  for (const agent of reports) {
    const issues = [];

    // Check 1: Missing signal
    if (typeof agent.signal !== 'number') {
      issues.push('Missing or invalid signal value.');
    }

    // Check 2: Signal deviation
    if (typeof agent.signal === 'number') {
      const deviation = Math.abs(agent.signal - expectedSignal);
      if (deviation > sensitivity) {
        issues.push(`Signal deviation ${deviation.toFixed(3)} exceeds sensitivity ${sensitivity}.`);
      }
    }

    if (issues.length > 0) {
      anomalies.push({
        id: agent.id,
        role: agent.role,
        signal: agent.signal,
        issues
      });
    }
  }

  // Signal strength = 1 - (anomalies / total)
  const total = reports.length;
  const anomalyCount = anomalies.length;
  const signalStrength = total > 0
    ? Math.max(0, 1 - anomalyCount / total)
    : 1;

  // Determine status
  let status = 'SIGNAL-STABLE';
  if (anomalyCount > 0) status = 'SIGNAL-DISRUPTED';
  if (signalStrength < 0.5) status = 'SIGNAL-BREAK';

  // Update signal history
  const updatedHistory = Array.isArray(signalWindow)
    ? [...signalWindow, { signalStrength, timestamp: new Date().toISOString() }]
    : [{ signalStrength, timestamp: new Date().toISOString() }];

  return {
    status,
    note: 'Core Signal Engine evaluation completed.',
    signalStrength: signalStrength.toFixed(3),
    anomalies,
    totalAgents: total,
    signalHistory: updatedHistory,
    timestamp: new Date().toISOString()
  };
}

module.exports = { tick };
