// ops/mesh/v18-planetary-insight-engine.js
// Planetary Insight Engine (v18)
// Generates high-level insights, patterns, and interpretations from system-wide data.
// This engine acts like the "analyst" of the planetary mesh, transforming raw reports
// into meaningful understanding.

function tick(globalState = {}) {
  const {
    lastBattlefieldReport = null,
    insightDepth = 3, // how deep the insight analysis should go (1–5)
    trendWindow = [], // previous insight scores for trend detection
  } = globalState;

  // If no battlefield report, cannot generate insights
  if (!lastBattlefieldReport || !Array.isArray(lastBattlefieldReport.reports)) {
    return {
      status: 'IDLE',
      note: 'Planetary Insight Engine received no battlefield report.',
      insights: [],
      insightScore: null,
      timestamp: new Date().toISOString()
    };
  }

  const reports = lastBattlefieldReport.reports;

  // Count statuses
  const total = reports.length;
  const ok = reports.filter(r => r.status === 'OK').length;
  const errors = reports.filter(r => r.status === 'ERROR').length;
  const sleeping = reports.filter(r => r.status === 'SLEEPING').length;

  // Insight score = weighted interpretation of system health
  const baseScore = total > 0 ? ok / total : 1;
  const penalty = errors * 0.05;
  const bonus = sleeping * 0.01;

  let insightScore = baseScore - penalty + bonus;
  insightScore = Math.max(0, Math.min(1, insightScore)); // clamp 0–1

  const insights = [];

  // Insight Level 1: Basic observations
  if (insightDepth >= 1) {
    insights.push(`System operating at ${(insightScore * 100).toFixed(1)}% insight efficiency.`);
  }

  // Insight Level 2: Error interpretation
  if (insightDepth >= 2) {
    if (errors > 0) {
      insights.push(`Detected ${errors} failing agent(s) — potential weak points in the mesh.`);
    } else {
      insights.push('No failing agents detected — system integrity intact.');
    }
  }

  // Insight Level 3: Sleep analysis
  if (insightDepth >= 3) {
    if (sleeping > total * 0.4) {
      insights.push('High number of sleeping agents — system may be conserving energy or dormant.');
    } else {
      insights.push('Active agent distribution appears balanced.');
    }
  }

  // Insight Level 4: Trend detection
  let trend = null;
  if (insightDepth >= 4 && Array.isArray(trendWindow) && trendWindow.length > 1) {
    const last = trendWindow[trendWindow.length - 1];
    const prev = trendWindow[trendWindow.length - 2];
    const diff = last - prev;

    if (diff > 0.05) trend = 'UPWARD';
    else if (diff < -0.05) trend = 'DOWNWARD';
    else trend = 'STABLE';

    insights.push(`Insight trend: ${trend}.`);
  }

  // Insight Level 5: Predictive interpretation (non-forecasting)
  if (insightDepth >= 5) {
    if (insightScore > 0.85) {
      insights.push('System likely to maintain strong performance if conditions remain stable.');
    } else if (insightScore < 0.50) {
      insights.push('System may require intervention to prevent further decline.');
    } else {
      insights.push('System in a transitional state — monitoring recommended.');
    }
  }

  return {
    status: 'INSIGHT-GENERATED',
    note: 'Planetary Insight Engine evaluation completed.',
    insightScore: insightScore.toFixed(3),
    insights,
    totalAgents: total,
    okAgents: ok,
    sleepingAgents: sleeping,
    errorAgents: errors,
    trend,
    timestamp: new Date().toISOString()
  };
}

module.exports = { tick };
