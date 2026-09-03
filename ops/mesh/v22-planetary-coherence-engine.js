// ops/mesh/v22-planetary-coherence-engine.js
// Planetary Coherence Engine (v22)
// Ensures the entire mesh operates as a unified whole.
// Detects fragmentation, divergence, or incoherent behavior between agents.
// This engine measures how "together" the system is at any moment.

function tick(globalState = {}) {
  const {
    lastBattlefieldReport = null,
    coherenceThreshold = 0.80,  // minimum acceptable coherence score
    coherenceHistory = [],      // track past coherence scores
    clusterRules = []           // optional rules for grouping agents into clusters
  } = globalState;

  // If no battlefield report, coherence cannot be evaluated
  if (!lastBattlefieldReport || !Array.isArray(lastBattlefieldReport.reports)) {
    return {
      status: 'IDLE',
      note: 'Planetary Coherence Engine received no battlefield report.',
      coherenceScore: null,
      fragmentedClusters: [],
      timestamp: new Date().toISOString()
    };
  }

  const reports = lastBattlefieldReport.reports;

  // Build clusters based on clusterRules
  const clusters = {};
  const fragmentedClusters = [];

  if (Array.isArray(clusterRules) && clusterRules.length > 0) {
    for (const rule of clusterRules) {
      const clusterName = rule.name || 'Unnamed Cluster';
      clusters[clusterName] = [];

      for (const agent of reports) {
        if (rule.match && typeof rule.match === 'function') {
          if (rule.match(agent)) {
            clusters[clusterName].push(agent);
          }
        }
      }
    }
  } else {
    // Default: one cluster containing all agents
    clusters['global'] = reports;
  }

  // Evaluate coherence inside each cluster
  let totalCoherence = 0;
  let clusterCount = 0;

  for (const clusterName in clusters) {
    const clusterAgents = clusters[clusterName];
    if (clusterAgents.length === 0) continue;

    clusterCount++;

    const statuses = clusterAgents.map(a => a.status);
    const uniqueStatuses = [...new Set(statuses)];

    // Coherence = 1 if all statuses match, otherwise lower
    const clusterCoherence =
      uniqueStatuses.length === 1
        ? 1
        : Math.max(0, 1 - (uniqueStatuses.length - 1) * 0.25);

    totalCoherence += clusterCoherence;

    if (clusterCoherence < coherenceThreshold) {
      fragmentedClusters.push({
        cluster: clusterName,
        uniqueStatuses,
        clusterCoherence: clusterCoherence.toFixed(3)
      });
    }
  }

  // Final coherence score = average cluster coherence
  const coherenceScore =
    clusterCount > 0 ? totalCoherence / clusterCount : 1;

  // Determine coherence status
  let status = 'COHERENT';
  if (fragmentedClusters.length > 0) status = 'PARTIALLY-FRAGMENTED';
  if (coherenceScore < 0.5) status = 'CRITICAL-FRAGMENTATION';

  // Update coherence history
  const updatedHistory = Array.isArray(coherenceHistory)
    ? [...coherenceHistory, { coherenceScore, timestamp: new Date().toISOString() }]
    : [{ coherenceScore, timestamp: new Date().toISOString() }];

  return {
    status,
    note: 'Planetary Coherence Engine evaluation completed.',
    coherenceScore: coherenceScore.toFixed(3),
    fragmentedClusters,
    totalAgents: reports.length,
    clusterCount,
    coherenceHistory: updatedHistory,
    timestamp: new Date().toISOString()
  };
}

module.exports = { tick };
