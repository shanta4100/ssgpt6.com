// ops/mesh/v-combinatorics-soldier.js
// Combinatorics Soldier + Future Earnings Engine
// Root-domain engine: factorial, nCr, nPr, binomial, FE.

function factorial(n) {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error("Factorial only defined for non-negative integers.");
  }
  if (n === 0) return 1;
  let res = 1;
  for (let i = 1; i <= n; i++) res *= i;
  return res;
}

function nPr(n, r) {
  if (r > n || n < 0 || r < 0) throw new Error("Invalid n, r for nPr.");
  return factorial(n) / factorial(n - r);
}

function nCr(n, r) {
  if (r > n || n < 0 || r < 0) throw new Error("Invalid n, r for nCr.");
  return factorial(n) / (factorial(r) * factorial(n - r));
}

// Single binomial term: C(n,k) * a^(n-k) * b^k
function binomialTerm(n, k, a, b) {
  const coeff = nCr(n, k);
  return coeff * Math.pow(a, n - k) * Math.pow(b, k);
}

// Full binomial expansion coefficients and values for (a + b)^n
function binomialExpansion(n, a, b) {
  const terms = [];
  for (let k = 0; k <= n; k++) {
    const coeff = nCr(n, k);
    const value = coeff * Math.pow(a, n - k) * Math.pow(b, k);
    terms.push({ k, coeff, value });
  }
  return terms;
}

// Future Earnings Engine
// FE = PV * [ (1 + i_m + i_g + α) / ((1 + π_inf) * (1 + ρ_risk)) ]^n
function futureEarnings({
  PV,
  i_m = 0,       // money market rate
  i_g = 0,       // government rate
  alpha = 0,     // additional positive factors
  pi_inf = 0,    // inflation (<0 for deflation)
  rho_risk = 0,  // risk premium
  n = 1          // periods
}) {
  const numerator = 1 + i_m + i_g + alpha;
  const denominator = (1 + pi_inf) * (1 + rho_risk);
  const realFactor = numerator / denominator;
  const FE = PV * Math.pow(realFactor, n);
  return { FE, realFactor };
}

// Soldier interface: tick(globalState)
function tick(globalState = {}) {
  const {
    mode = 'info', // 'factorial' | 'nCr' | 'nPr' | 'binomialTerm' | 'binomialExpansion' | 'futureEarnings'
    n,
    r,
    k,
    a = 1,
    b = 1,
    PV,
    i_m,
    i_g,
    alpha,
    pi_inf,
    rho_risk,
    periods
  } = globalState;

  try {
    let result;
    switch (mode) {
      case 'factorial':
        result = { n, factorial: factorial(n) };
        break;
      case 'nPr':
        result = { n, r, nPr: nPr(n, r) };
        break;
      case 'nCr':
        result = { n, r, nCr: nCr(n, r) };
        break;
      case 'binomialTerm':
        result = { n, k, a, b, term: binomialTerm(n, k, a, b) };
        break;
      case 'binomialExpansion':
        result = { n, a, b, terms: binomialExpansion(n, a, b) };
        break;
      case 'futureEarnings':
        result = futureEarnings({
          PV,
          i_m,
          i_g,
          alpha,
          pi_inf,
          rho_risk,
          n: periods
        });
        break;
      default:
        result = {
          message: 'Combinatorics soldier ready. Set mode to factorial, nCr, nPr, binomialTerm, binomialExpansion, or futureEarnings.'
        };
    }

    return {
      status: 'OK',
      note: `Combinatorics soldier executed in mode: ${mode}`,
      output: result
    };
  } catch (e) {
    return {
      status: 'ERROR',
      note: e.message
    };
  }
}

module.exports = {
  tick,
  factorial,
  nCr,
  nPr,
  binomialTerm,
  binomialExpansion,
  futureEarnings
};
