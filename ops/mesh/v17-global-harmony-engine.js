// ops/mesh/v17-global-harmony-engine.js
// Global Harmony Engine (v17)
// Ensures coherence, balance, and harmony across all agents.
// Detects conflict, contradiction, or misalignment between system components.
// This engine keeps the entire mesh "in tune" like a planetary orchestra.

function tick(globalState = {}) {
  const {
    lastBattlefieldReport = null,
    harmonyRules = {},       // optional custom harmony rules
    contradictionTolerance = 0.10 // allowable contradiction ratio
  } = globalState;

  // If no battlefield report, harmony cannot be evaluated
  if (!lastBattlefieldReport || !Array.isArray(lastBattlefieldReport.reports)) {
    return {
      status: 'IDLE',
      note: 'Global Harmony Engine received no battlefield report.',
      contradictions: [],
      harmonyScore: null,
      timestamp: new Date().toISOString()
    };
  }

  const reports = lastBattlefieldReport.reports;

  // Extract roles and statuses
  const roles = reports.map(r => r.role);
  const statuses = reports.map(r => r.status);

  // Detect contradictions:
  // Example: if two agents with similar roles disagree or conflict
  const contradictions = [];

  // Rule: No two agents with the same role should have conflicting statuses
  const roleMap = {};
  for (const r of reports) {
    if (!roleMap[r.role]) roleMap[r.role] = [];
    roleMap[r.role].push(r.status);
  }

  for (const role in roleMap) {
    const uniqueStatuses = [...new Set(roleMap[role])];
    if (uniqueStatuses.length > 1) {
      contradictions.push(
        `Role "${role}" has conflicting statuses: ${uniqueStatuses.join(', ')}`
      );
    }
  }

  // Rule: Harmony rules can define forbidden combinations
  if (harmonyRules.forbiddenPairs) {
    for (const pair of harmonyRules.forbiddenPairs) {
      const [roleA, roleB] = pair;
      const hasA = roles.includes(roleA);
      const hasB = roles.includes(roleB);
      if (hasA && hasB) {
        contradictions.push(`Forbidden pair detected: ${roleA} + ${roleB}`);
      }
    }
  }

  // Harmony score = 1 - (contradictions / total agents)
  const total = reports.length;
  const harmonyScore = contradictions.length > 0
    ? Math.max(0, 1 - contradictions.length / total)
    : 1;

  // Determine harmony status
  let status = 'HARMONIOUS';
  if (harmonyScore < 1 - contradictionTolerance) status = 'DISSONANT';
  if (harmonyScore < 0.5) status = 'CRITICAL-DISHARMONY';

  return {
    status,
    note: 'Global Harmony Engine evaluation completed.',
    harmonyScore: harmonyScore.toFixed(3),
    contradictions,
    totalAgents: total,
    timestamp: new Date().toISOString()
  };
}

module.exports = { tick };
