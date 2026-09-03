// ops/mesh/v-combinatorics-root-engine.js
// Combinatorics Root Engine + Future Earnings
// Root-domain engine: factorial, nCr, nPr, binomial, FE, and canned Q1–Q10 presets.
// Everything combinatorial falls into this "root ocean".

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
  i_m = 0,
  i_g = 0,
  alpha = 0,
  pi_inf = 0,
  rho_risk = 0,
  n = 1
}) {
  const numerator = 1 + i_m + i_g + alpha;
  const denominator = (1 + pi_inf) * (1 + rho_risk);
  const realFactor = numerator / denominator;
  const FE = PV * Math.pow(realFactor, n);
  return { FE, realFactor };
}

// Q1–Q10 canned presets (your earlier questions)
function runPreset(id) {
  switch (id) {
    case 'Q1': {
      const value = factorial(7);
      return { question: '7!', answer: value };
    }
    case 'Q2': {
      const value = 7;
      return { question: 'x! = 5040', answer: value };
    }
    case 'Q3': {
      const value = factorial(6);
      return { question: 'Permutations of 6 distinct objects', answer: value };
    }
    case 'Q4': {
      const value = nCr(30, 4);
      return { question: 'Ways to choose 4 from 30', answer: value };
    }
    case 'Q5': {
      const value = factorial(4);
      return { question: 'Permutations of "MATH"', answer: value };
    }
    case 'Q6': {
      const value = factorial(5) / (factorial(3) * factorial(2));
      return { question: 'Arrangements of 3R + 2B identical balls', answer: value };
    }
    case 'Q7': {
      const value = nCr(12, 4);
      return { question: 'Committee of 4 from 12', answer: value };
    }
    case 'Q8': {
      const value = nPr(26, 3);
      return { question: '3-letter passwords from 26 letters (order matters)', answer: value };
    }
    case 'Q9': {
      const outer = factorial(6);
      const inner = factorial(3);
      const value = outer * inner;
      return { question: 'COMPUTER with vowels together', answer: value };
    }
    case 'Q10': {
      const outer = factorial(4);
      const inner = factorial(2);
      const value = outer * inner;
      return { question: '5 people, 2 must sit together', answer: value };
    }
    default:
      return { message: 'Unknown preset. Use Q1–Q10.' };
  }
}

// Soldier interface: root engine
// Modes: factorial | nCr | nPr | binomialTerm | binomialExpansion | futureEarnings | preset
function tick(globalState = {}) {
  const {
    mode = 'info',
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
    periods,
    presetId
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
      case 'preset':
        result = runPreset(presetId);
        break;
      default:
        result = {
          message:
            'Combinatorics root engine ready. Set mode to factorial, nCr, nPr, binomialTerm, binomialExpansion, futureEarnings, or preset (Q1–Q10).'
        };
    }

    return {
      status: 'OK',
      note: `Combinatorics root engine executed in mode: ${mode}`,
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
