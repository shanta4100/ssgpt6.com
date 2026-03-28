// ops/mesh/x3-core-awareness-engine.js
// Core Awareness Engine (x3)
// Tracks what the mesh is aware of at any given moment.
// Detects blind spots, over-focus, and missing critical awareness fields.
// Third engine in the X‑Series, after x1 Core Signal and x2 Core Pulse.

function tick(globalState = {}) {
  const {
    lastBattlefieldReport = null,
    awarenessDomains = [],     // list of domains the mesh should be aware of
    awarenessHistory = [],     // previous awareness scores
    blindSpotTolerance = 0.15  // allowable fraction of missing domains
  } = globalState;

  // If no battlefield report, awareness cannot be evaluated
  if (!lastBattlefieldReport || !Array.isArray(lastBattlefieldReport.reports)) {
    return {
      status: 'IDLE',
      note: 'Core Awareness Engine received no battlefield report.',
      awarenessScore: null,
      blindSpots: [],
      timestamp: new Date().toISOString()
    };
  }

  // If no awareness domains defined, cannot meaningfully evaluate awareness
  if (!Array.isArray(awarenessDomains) || awarenessDomains.length === 0) {
    return {
      status: 'UNDEFINED',
      note: 'No awareness domains provided — cannot evaluate core awareness.',
      awarenessScore: null,
      blindSpots: [],
      timestamp: new Date().toISOString()
    };
  }

  const reports = lastBattlefieldReport.reports;

  // Collect domains actually covered by agents
  const coveredDomains = new Set();
  for (const agent of reports) {
    if (Array.isArray(agent.domains)) {
      for (const d of agent.domains) {
        coveredDomains.add(d);
      }
    }
  }

  // Determine blind spots (domains not covered at all)
  const blindSpots = [];
  for (const domain of awarenessDomains) {
    if (!coveredDomains.has(domain)) {
      blindSpots.push(domain);
    }
  }

  const totalDomains = awarenessDomains.length;
  const blindCount = blindSpots.length;

  // Awareness score = 1 - (blindSpots / totalDomains)
  const awarenessScore = totalDomains > 0
    ? Math.max(0, 1 - blindCount / totalDomains)
    : 1;

  // Determine status
  let status = 'AWARE';
  if (blindCount > 0 && blindCount / totalDomains > blindSpotTolerance) {
    status = 'PARTIALLY-BLIND';
  }
  if (awarenessScore < 0.5) {
    status = 'CRITICALLY-BLIND';
  }

  // Update awareness history
  const updatedHistory = Array.isArray(awarenessHistory)
    ? [...awarenessHistory, { awarenessScore, timestamp: new Date().toISOString() }]
    : [{ awarenessScore, timestamp: new Date().toISOString() }];

  return {
    status,
    note: 'Core Awareness Engine evaluation completed.',
    awarenessScore: awarenessScore.toFixed(3),
    blindSpots,
    totalDomains,
    awarenessHistory: updatedHistory,
    timestamp: new Date().toISOString()
  };
}

module.exports = { tick };
