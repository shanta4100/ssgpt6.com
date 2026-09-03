// ops/mesh/v-factorial-agent.js
// Factorial Soldier: 0 is the primary domain (root), n! is the destination subdomain.

function factorial(n) {
  if (n < 0) throw new Error("Factorial not defined for negative numbers.");
  if (n === 0) return 1; // primary domain (root)
  let result = 1;
  for (let i = 1; i <= n; i++) result *= i;
  return result;
}

function trailingZeros(n) {
  let count = 0;
  while (n > 0) {
    n = Math.floor(n / 5);
    count += n;
  }
  return count;
}

// Soldier interface
function tick(globalState = {}) {
  const n = typeof globalState.n === 'number' ? globalState.n : 0;

  const value = factorial(n);
  const zeros = trailingZeros(n);

  return {
    status: 'OK',
    note: `Factorial soldier: primary domain = 0, destination subdomain for ${n} is ${value}`,
    input: n,
    factorial: value,
    trailingZeros: zeros
  };
}

module.exports = { tick };
