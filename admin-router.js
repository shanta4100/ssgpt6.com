// ADMIN ROUTER (UI-ONLY, SAFE)
// Dynamically builds the Admin Dashboard from system-registry.json

async function loadAdminRegistry() {
  try {
    const response = await fetch("system-registry.json");
    const data = await response.json();

    // Filter only admin-related modules
    return data.modules.filter(mod =>
      mod.id.startsWith("admin_")
    );

  } catch (err) {
    console.error("Admin registry load failed:", err);
    return [];
  }
}

function renderAdminModules(modules) {
  const container = document.getElementById("admin-module-container");
  if (!container) return;

  container.innerHTML = "";

  modules.forEach(mod => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${mod.name}</h3>
      <p class="small">Module ID: ${mod.id}</p>
      <button class="btn-activate" data-module="${mod.id}">
        Activate
      </button>
    `;
    container.appendChild(card);
  });
}

function attachAdminActivationHandlers() {
  document.addEventListener("click", e => {
    if (e.target.matches(".btn-activate")) {
      const moduleId = e.target.getAttribute("data-module");
      logAdminActivation(moduleId);
    }
  });
}

function logAdminActivation(moduleId) {
  const log = document.getElementById("admin-log");
  const time = new Date().toLocaleTimeString();
  log.textContent += `[${time}] Admin Activated: ${moduleId}\n`;
}

async function initAdminRouter() {
  const modules = await loadAdminRegistry();
  renderAdminModules(modules);
  attachAdminActivationHandlers();
}

initAdminRouter();
