// ops/mesh/x4-core-intent-engine.js
// Core Intent Engine (x4)
// Determines whether the mesh understands its current operational intent.
// Detects intent drift, conflicting intents, missing intent signals, and ambiguity.
// Fourth engine in the X‑Series, following Signal, Pulse, and Awareness.

function tick(globalState = {}) {
  const {
    lastBattlefieldReport = null,
    declaredIntent = null,      // the intended direction of the mesh
    intentHistory = [],         // previous intent scores
    ambiguityTolerance = 0.20   // allowable ambiguity ratio
  } = globalState;

  // If no battlefield report, intent cannot be evaluated
  if (!lastBattlefieldReport || !Array.isArray(lastBattlefieldReport.reports)) {
    return {
      status: 'IDLE',
      note: 'Core Intent Engine received no battlefield report.',
      intentScore: null,
      conflictingAgents: [],
      timestamp: new Date().toISOString()
    };
  }

  // If no declared intent, system cannot evaluate alignment
  if (!declaredIntent || typeof declaredIntent !== 'string') {
    return {
      status: 'UNDEFINED',
      note: 'No declared intent provided — cannot evaluate intent alignment.',
      intentScore: null,
      conflictingAgents: [],
      timestamp: new Date().toISOString()
    };
  }

  const reports = lastBattlefieldReport.reports;
  const conflictingAgents = [];

  // Evaluate intent alignment
  for (const agent of reports) {
    const issues = [];

    // Check 1: Missing intent
    if (!agent.intent || typeof agent.intent !== 'string') {
      issues.push('Missing or invalid agent intent.');
    }

    // Check 2: Intent mismatch
    if (agent.intent && agent.intent !== declaredIntent) {
      issues.push(`Intent mismatch: expected "${declaredIntent}", got "${agent.intent}".`);
    }

    if (issues.length > 0) {
      conflictingAgents.push({
        id: agent.id,
        role: agent.role,
        intent: agent.intent,
        issues
      });
    }
  }

  // Intent score = 1 - (conflicts / total)
  const total = reports.length;
  const conflictCount = conflictingAgents.length;
  const intentScore = total > 0
    ? Math.max(0, 1 - conflictCount / total)
    : 1;

  // Determine status
  let status = 'INTENT-ALIGNED';
  if (conflictCount > 0 && conflictCount / total > ambiguityTolerance) {
    status = 'INTENT-AMBIGUOUS';
  }
  if (intentScore < 0.5) {
    status = 'INTENT-LOST';
  }

  // Update intent history
  const updatedHistory = Array.isArray(intentHistory)
    ? [...intentHistory, { intentScore, timestamp: new Date().toISOString() }]
    : [{ intentScore, timestamp: new Date().toISOString() }];

  return {
    status,
    note: 'Core Intent Engine evaluation completed.',
    intentScore: intentScore.toFixed(3),
    conflictingAgents,
    declaredIntent,
    totalAgents: total,
    intentHistory: updatedHistory,
    timestamp: new Date().toISOString()
  };
}

module.exports = { tick };
