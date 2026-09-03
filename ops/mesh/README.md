# Sleeping Agent Mesh Automation v1  
### Autonomous Routing • Self‑Healing • Black‑Box Operations

This directory contains the full automation system that powers the  
SSGPT6 Sovereign Mesh Network across:

- ssgpt6.com (Primary Ocean)
- ssgpt6.online (Global Ocean)
- vitalsciencegrid.com (Science Ocean)

The system runs with **zero manual intervention**.  
Three agents work together inside a sealed black box:

1. **Watcher** — checks health of all rivers  
2. **Router** — chooses the active service endpoint  
3. **Healer** — queues repair actions for broken rivers  

---

## 📦 Files in This Directory

### 1. `mesh-agent.js`
The core automation loop.

Runs every cycle:
- Pings all `/health` endpoints  
- Writes results to `health-state.json`  
- Chooses active routes  
- Writes routing decisions to `routing-state.json`  
- Detects DOWN rivers  
- Sends heal requests to the webhook  

This is the **brain** of the mesh.

---

### 2. `mesh-config.json`
The configuration file for the mesh.

Defines:
- Oceans  
- Rivers  
- Health URLs  
- Backup URLs  
- Priority order  
- Latency thresholds  

You edit **this file**, not the code.

---

### 3. `router.js`
A lightweight reverse proxy.

- Reads `routing-state.json`  
- Forwards all incoming traffic to the active URL  
- Automatically switches between `.com` and `.online`  
- Requires no manual routing  

This is the **traffic forwarder**.

---

### 4. `healer-webhook.js`
A simple webhook that queues heal actions.

- Accepts `POST /heal`  
- Writes entries to `heal-queue.json`  
- Used by `mesh-agent.js` when a river is DOWN  

This is the **repair queue**.

---

### 5. `health-state.json`
Generated automatically.

Contains the latest health check results for all rivers.

Example:
```json
[
  {
    "ocean": "ssgpt6.com",
    "river": "app",
    "status": "UP",
    "latencyMs": 123,
    "checkedAt": "2026-03-28T00:00:00Z"
  }
]
```

---

### 6. `routing-state.json`
Generated automatically.

Contains the active routing decision.

Example:
```json
{
  "services": {
    "app": {
      "activeUrl": "https://app.ssgpt6.com",
      "lastUpdated": "2026-03-28T00:00:00Z"
    }
  }
}
```

---

### 7. `heal-queue.json`
Generated automatically.

Stores queued heal actions.

Example:
```json
[
  {
    "ocean": "ssgpt6.com",
    "river": "app",
    "requestedAt": "2026-03-28T00:00:00Z"
  }
]
```

---

## 🔁 How the System Works (Flow)

### 1. Watcher
- Pings all rivers  
- Writes health results  
- Marks UP / SLOW / DOWN  

### 2. Router
- Reads health results  
- Chooses the best active URL  
- Writes routing-state.json  

### 3. Reverse Proxy
- Reads routing-state.json  
- Forwards traffic to the active URL  

### 4. Healer
- Detects DOWN rivers  
- Sends POST /heal  
- Webhook queues repair actions  

Everything runs in a **sealed black box**.

---

## 🚀 Running the System

Start the mesh agent:

```bash
node ops/mesh/mesh-agent.js
```

Start the router:

```bash
node ops/mesh/router.js
```

Start the healer webhook:

```bash
node ops/mesh/healer-webhook.js
```

---

## 🧠 Philosophy

This system is designed for:

- Zero manual routing  
- Zero manual failover  
- Zero manual healing  
- Fully autonomous mesh behavior  
- Sovereign, sealed, black‑box operations  

It is the foundation of the  
**SSGPT6 Sovereign Mesh Network**.

