// DEVELOPER ROUTER (UI-ONLY, SAFE)
// Builds the Developer Mode Panel from system-registry.json
// and provides a manual module trigger sandbox.

async function loadDevRegistry() {
  try {
    const response = await fetch("system-registry.json");
    const data = await response.json();
    return data.modules;
  } catch (err) {
    console.error("Developer registry load failed:", err);
    return [];
  }
}

function renderDevModules(modules) {
  const container = document.getElementById("dev-module-container");
  if (!container) return;

  container.innerHTML = "";

  modules.forEach(mod => {
    const card = document.createElement("div");
    card.className = "dev-card";
    card.innerHTML = `
      <span class="dev-badge">Module</span>
      <h3>${mod.name}</h3>
      <p>ID: <code>${mod.id}</code></p>
      <button class="btn" data-dev-module="${mod.id}">
        Simulate Activation
      </button>
    `;
    container.appendChild(card);
  });
}

function logDev(message) {
  const log = document.getElementById("dev-log");
  const time = new Date().toLocaleTimeString();
  log.textContent += `[${time}] ${message}\n`;
}

function attachDevHandlers(modules) {
  document.addEventListener("click", e => {
    if (e.target.matches("[data-dev-module]")) {
      const moduleId = e.target.getAttribute("data-dev-module");
      logDev(`Simulated activation for module: ${moduleId}`);
    }
  });

  const manualBtn = document.getElementById("dev-trigger-btn");
  const manualInput = document.getElementById("dev-module-id");

  if (manualBtn && manualInput) {
    manualBtn.addEventListener("click", () => {
      const id = manualInput.value.trim();
      if (!id) {
        logDev("No module ID provided.");
        return;
      }
      const exists = modules.some(m => m.id === id);
      if (exists) {
        logDev(`Manual trigger: module '${id}' exists in registry.`);
      } else {
        logDev(`Manual trigger: module '${id}' NOT found in registry.`);
      }
    });
  }
}

async function initDeveloperRouter() {
  const modules = await loadDevRegistry();
  renderDevModules(modules);
  attachDevHandlers(modules);
}

initDeveloperRouter();
