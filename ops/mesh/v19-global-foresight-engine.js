// ops/mesh/v19-global-foresight-engine.js
// Global Foresight Engine (v19)
// Provides non-predictive foresight by analyzing patterns, trajectories, and
// system signals to anticipate potential future states WITHOUT forecasting.
// This engine identifies emerging directions, pressure points, and opportunities.

function tick(globalState = {}) {
  const {
    lastBattlefieldReport = null,
    foresightDepth = 3, // 1–5 depth of analysis
    trajectoryWindow = [], // previous foresight scores
    sensitivity = 0.05 // how sensitive foresight is to changes
  } = globalState;

  // If no battlefield report, cannot generate foresight
  if (!lastBattlefieldReport || !Array.isArray(lastBattlefieldReport.reports)) {
    return {
      status: 'IDLE',
      note: 'Global Foresight Engine received no battlefield report.',
      foresightScore: null,
      signals: [],
      timestamp: new Date().toISOString()
    };
  }

  const reports = lastBattlefieldReport.reports;

  // Count statuses
  const total = reports.length;
  const ok = reports.filter(r => r.status === 'OK').length;
  const errors = reports.filter(r => r.status === 'ERROR').length;
  const sleeping = reports.filter(r => r.status === 'SLEEPING').length;

  // Foresight score = interpretation of system direction
  const base = total > 0 ? ok / total : 1;
  const penalty = errors * 0.03;
  const bonus = sleeping * 0.01;

  let foresightScore = base - penalty + bonus;
  foresightScore = Math.max(0, Math.min(1, foresightScore)); // clamp 0–1

  const signals = [];

  // Level 1: Basic directional signal
  if (foresightDepth >= 1) {
    signals.push(
      `System direction: ${(foresightScore * 100).toFixed(1)}% positive trajectory signal.`
    );
  }

  // Level 2: Error pressure signal
  if (foresightDepth >= 2) {
    if (errors > 0) {
      signals.push('Error pressure detected — potential downward influence.');
    } else {
      signals.push('No error pressure detected — trajectory unobstructed.');
    }
  }

  // Level 3: Dormancy signal
  if (foresightDepth >= 3) {
    if (sleeping > total * 0.4) {
      signals.push('Dormancy signal: system may be conserving energy or preparing for shift.');
    } else {
      signals.push('Dormancy levels normal.');
    }
  }

  // Level 4: Trajectory shift detection
  let trajectoryShift = null;
  if (foresightDepth >= 4 && trajectoryWindow.length > 1) {
    const last = trajectoryWindow[trajectoryWindow.length - 1];
    const prev = trajectoryWindow[trajectoryWindow.length - 2];
    const diff = last - prev;

    if (diff > sensitivity) trajectoryShift = 'UPWARD-SHIFT';
    else if (diff < -sensitivity) trajectoryShift = 'DOWNWARD-SHIFT';
    else trajectoryShift = 'NEUTRAL';

    signals.push(`Trajectory shift detected: ${trajectoryShift}.`);
  }

  // Level 5: Opportunity / risk framing (non-predictive)
  if (foresightDepth >= 5) {
    if (foresightScore > 0.85) {
      signals.push('Opportunity signal: system conditions favorable for expansion.');
    } else if (foresightScore < 0.50) {
      signals.push('Risk signal: system may require stabilization measures.');
    } else {
      signals.push('Neutral signal: system in balanced transitional state.');
    }
  }

  return {
    status: 'FORESIGHT-GENERATED',
    note: 'Global Foresight Engine evaluation completed.',
    foresightScore: foresightScore.toFixed(3),
    signals,
    totalAgents: total,
    okAgents: ok,
    sleepingAgents: sleeping,
    errorAgents: errors,
    trajectoryShift,
    timestamp: new Date().toISOString()
  };
}

module.exports = { tick };
