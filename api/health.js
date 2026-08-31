/**
 * Health Check Endpoint
 * Used by mesh-agent.js to monitor service status
 */

export default function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const healthStatus = {
    status: 'UP',
    service: 'ssgpt6.com',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'production',
    version: '1.0.0',
    regions: ['us-east', 'us-west', 'asia-pacific'],
    latencyMs: Math.round(Math.random() * 500) // Simulated latency
  };

  // Set cache headers - health should be checked frequently
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  res.status(200).json(healthStatus);
}
