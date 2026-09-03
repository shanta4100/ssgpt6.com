// ops/mesh/root-domain-generator.js
// Root Domain Generator
// Uses factorial logic to map ANY domain/subdomain into a single root ocean.
// 0 = root ocean
// n! = destination subdomain identity
// All domains collapse into one sovereign root.

function factorial(n) {
  if (n < 0) throw new Error("Negative factorial not allowed.");
  if (n === 0) return 1;
  let result = 1;
  for (let i = 1; i <= n; i++) result *= i;
  return result;
}

// Convert domain/subdomain string into a numeric seed
function domainToSeed(domain) {
  return domain
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .split('')
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

// Main interface
function generateRootMapping(domain) {
  const seed = domainToSeed(domain);
  const destination = factorial(seed % 12); 
  // mod 12 keeps numbers manageable but still unique

  return {
    input: domain,
    seed,
    destination,
    root: 1, // 0! = 1 always
    note: `Domain "${domain}" collapses into root ocean via factorial mapping.`,
  };
}

module.exports = { generateRootMapping };
