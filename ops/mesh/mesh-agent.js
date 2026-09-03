// ops/mesh/mesh-agent.js
// Sleeping Agent Mesh Automation v1
// Watcher + Router + Healer in one black-box script

const https = require('https');
const fs = require('fs');
const path = require('path');

// ===== 1. CONFIG (edit this, not the logic) =====

const CONFIG = {
  checkIntervalMs: 60000, // 60 seconds
  healthTimeoutMs: 8000,
  routingStateFile: path.join(__dirname, 'routing-state.json'),
  healthStateFile: path.join(__dirname, 'health-state.json'),
  // Oceans and rivers
  oceans: {
    'ssgpt6.com': {
      primary: true,
      rivers: {
        app: {
          url: 'https://app.ssgpt6.com/health',
          backupUrl: 'https://app.ssgpt6.online'
        }
      }
    },
    'ssgpt6.online': {
      primary: false,
      rivers: {
        app: {
          url: 'https://app.ssgpt6.online/health',
          backupUrl: null
        }
      }
    },
    'vitalsciencegrid.com': {
      primary: false,
      rivers: {
        app: {
          url: 'https://app.vitalsciencegrid.com/health',
          backupUrl: null
        }
      }
    }
  }
};

// ===== 2. UTIL: HTTP HEALTH CHECK =====

function checkHealth(url, timeoutMs) {
  return new Promise((resolve) => {
    const start = Date.now();
    const req = https.get(url, (res) => {
      const latency = Date.now() - start;
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        const statusCode = res.statusCode;
        let status = 'DOWN';
        if (statusCode >= 200 && statusCode < 300) {
          if (latency < 2000) status = 'UP';
          else status = 'SLOW';
        }
        resolve({
          url,
          status,
          latencyMs: latency,
          statusCode
        });
      });
    });

    req.on('error', () => {
      resolve({
        url,
        status: 'DOWN',
        latencyMs: null,
        statusCode: null
      });
    });

    req.setTimeout(timeoutMs, () => {
      req.destroy();
      resolve({
        url,
        status: 'DOWN',
        latencyMs: null,
        statusCode: null
      });
    });
  });
}

// ===== 3. STATE HELPERS =====

function readJsonSafe(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJsonSafe(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing file:', filePath, err.message);
  }
}

// ===== 4. WATCHER AGENT =====

async function runWatcher() {
  console.log(`[Watcher] Running health checks at ${new Date().toISOString()}`);

  const healthResults = [];
  const oceans = CONFIG.oceans;

  for (const [oceanName, ocean] of Object.entries(oceans)) {
    for (const [riverName, river] of Object.entries(ocean.rivers)) {
      const result = await checkHealth(river.url, CONFIG.healthTimeoutMs);
      healthResults.push({
        ocean: oceanName,
        river: riverName,
        url: river.url,
        status: result.status,
        latencyMs: result.latencyMs,
        statusCode: result.statusCode,
        checkedAt: new Date().toISOString()
      });
      console.log(
        `[Watcher] ${oceanName} / ${riverName} -> ${result.status} (${result.latencyMs} ms)`
      );
    }
  }

  writeJsonSafe(CONFIG.healthStateFile, healthResults);
  return healthResults;
}

// ===== 5. ROUTER AGENT =====

function runRouter(healthResults) {
  console.log(`[Router] Computing routing state at ${new Date().toISOString()}`);

  const routingState = readJsonSafe(CONFIG.routingStateFile, { services: {} });

  const appHealth = healthResults.filter((h) => h.river === 'app');

  const primary = appHealth.find((h) => h.ocean === 'ssgpt6.com');
  const backup = appHealth.find((h) => h.ocean === 'ssgpt6.online');

  let activeUrl = null;

  if (primary && primary.status === 'UP') {
    activeUrl = 'https://app.ssgpt6.com';
  } else if (backup && (backup.status === 'UP' || backup.status === 'SLOW')) {
    activeUrl = 'https://app.ssgpt6.online';
  } else if (primary && primary.status === 'SLOW') {
    activeUrl = 'https://app.ssgpt6.com';
  } else {
    activeUrl = 'https://app.ssgpt6.com';
  }

  routingState.services.app = {
    activeUrl,
    lastUpdated: new Date().toISOString()
  };

  console.log(`[Router] Active app URL -> ${activeUrl}`);

  writeJsonSafe(CONFIG.routingStateFile, routingState);
  return routingState;
}

// ===== 6. HEALER AGENT =====

async function runHealer(healthResults) {
  console.log(`[Healer] Checking for DOWN rivers at ${new Date().toISOString()}`);

  const downRivers = healthResults.filter((h) => h.status === 'DOWN');

  if (downRivers.length === 0) {
    console.log('[Healer] No DOWN rivers detected.');
    return;
  }

  for (const river of downRivers) {
    console.log(
      `[Healer] Detected DOWN: ${river.ocean} / ${river.river} (${river.url})`
    );

    console.log(
      `[Healer] (Simulated) Triggering heal action for ${river.ocean} / ${river.river}`
    );
  }
}

// ===== 7. MAIN LOOP =====

async function runCycle() {
  try {
    const healthResults = await runWatcher();
    runRouter(healthResults);
    await runHealer(healthResults);
  } catch (err) {
    console.error('[MeshAgent] Error in cycle:', err.message);
  }
}

console.log('[MeshAgent] Sleeping Agent Mesh Automation v1 starting…');
runCycle();
setInterval(runCycle, CONFIG.checkIntervalMs);
