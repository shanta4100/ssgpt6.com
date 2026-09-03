// ops/mesh/v-mesh-health-check.js
// Mesh Health Check
// Uses a single, known combinatorics formula as a "green light" test.
// If this passes, your combinatorics root engine is wired and propagating correctly.

const { tick } = require('./v-combinatorics-root-engine');

// We use Q1: 7! = 5040 as the canonical health check.
const EXPECTED = 5040;

function tickHealth(globalState = {}) {
  const response = tick({
    mode: 'factorial',
    n: 7
  });

  const ok =
    response &&
    response.status === 'OK' &&
    response.output &&
    response.output.factorial === EXPECTED;

  return {
    status: ok ? 'GREEN' : 'RED',
    note: ok
      ? 'Mesh math path is clean. 7! = 5040 confirmed.'
      : 'Health check failed. 7! did not match 5040.',
    raw: response
  };
}

module.exports = { tick: tickHealth };
