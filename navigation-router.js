async function loadRegistry() {
  try {
    const response = await fetch("system-registry.json");
    const data = await response.json();
    return data.modules;
  } catch (err) {
    console.error("Navigation registry load failed:", err);
    return [];
  }
}

function renderNavigation(modules) {
  const nav = document.getElementById("dynamic-nav");
  if (!nav) return;

  nav.innerHTML = "";

  modules.forEach(mod => {
    const btn = document.createElement("button");
    btn.textContent = mod.name;
    btn.className = "nav-btn";
    btn.dataset.target = mod.id;

    btn.addEventListener("click", () => {
      document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      document.querySelectorAll(".section-view").forEach(sec => sec.classList.remove("active"));
      const target = document.getElementById(mod.id);
      if (target) target.classList.add("active");
    });

    nav.appendChild(btn);
  });
}

async function initNavigationRouter() {
  const modules = await loadRegistry();
  renderNavigation(modules);
}

initNavigationRouter();
