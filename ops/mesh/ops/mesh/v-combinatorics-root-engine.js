// ops/mesh/v-combinatorics-root-engine.js
// Combinatorics Root Engine + Future Earnings
// One sovereign root-domain engine for factorial, nCr, nPr, binomial, FE, and Q1–Q10 presets.
// Everything combinatorial collapses into this root ocean.

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

function binomialTerm(n, k, a, b) {
  const coeff = nCr(n, k);
  return coeff * Math.pow(a, n - k) * Math.pow(b, k);
}

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

// Q1–Q10 canned presets
function runPreset(id) {
  switch (id) {
    case 'Q1': return { question: '7!', answer: factorial(7) };
    case 'Q2': return { question: 'x! = 5040', answer: 7 };
    case 'Q3': return { question: 'Permutations of 6 distinct objects', answer: factorial(6) };
    case 'Q4': return { question: 'Ways to choose 4 from 30', answer: nCr(30, 4) };
    case 'Q5': return { question: 'Permutations of "MATH"', answer: factorial(4) };
    case 'Q6': return { question: '3R + 2B identical balls', answer: factorial(5) / (factorial(3) * factorial(2)) };
    case 'Q7': return { question: 'Committee of 4 from 12', answer: nCr(12, 4) };
    case 'Q8': return { question: '3-letter passwords from 26 letters', answer: nPr(26, 3) };
    case 'Q9': return { question: 'COMPUTER with vowels together', answer: factorial(6) * factorial(3) };
    case 'Q10': return { question: '5 people, 2 must sit together', answer: factorial(4) * factorial(2) };
    default: return { message: 'Unknown preset. Use Q1–Q10.' };
  }
}

// Root soldier interface
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
      case 'factorial': result = { n, factorial: factorial(n) }; break;
      case 'nPr': result = { n, r, nPr: nPr(n, r) }; break;
      case 'nCr': result = { n, r, nCr: nCr(n, r) }; break;
      case 'binomialTerm': result = { n, k, a, b, term: binomialTerm(n, k, a, b) }; break;
      case 'binomialExpansion': result = { n, a, b, terms: binomialExpansion(n, a, b) }; break;
      case 'futureEarnings':
        result = futureEarnings({ PV, i_m, i_g, alpha, pi_inf, rho_risk, n: periods });
        break;
      case 'preset': result = runPreset(presetId); break;
      default:
        result = {
          message:
            'Combinatorics root engine ready. Use mode: factorial, nCr, nPr, binomialTerm, binomialExpansion, futureEarnings, or preset (Q1–Q10).'
        };
    }

    return {
      status: 'OK',
      note: `Combinatorics root engine executed in mode: ${mode}`,
      output: result
    };
  } catch (e) {
    return { status: 'ERROR', note: e.message };
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
