// Simple terminal update helper
function logToTerminal(el, lines, isError) {
  if (!el) return;
  const root = getComputedStyle(document.documentElement);
  const color = isError ? root.getPropertyValue("--danger") : root.getPropertyValue("--glow");
  el.style.color = color;
  el.innerHTML = lines.map(l => "&gt; " + l).join("<br />");
}

// Infrastructure buttons
document.addEventListener("DOMContentLoaded", () => {
  // Unit buttons
  document.querySelectorAll("button[data-unit]").forEach(btn => {
    btn.addEventListener("click", () => {
      const unitId = btn.getAttribute("data-unit");
      const terminal = document.querySelector(`.terminal[data-terminal-id="terminal-${unitId}"]`);
      if (unitId === "001") {
        logToTerminal(terminal, [
          "INITIALIZING HYDRO-PROTOCOLS...",
          "LOCKING SCARCITY CORRIDORS: BANGLADESH / INDIA",
          "SENSOR GRID: ONLINE",
          "STATUS: FLOW STABILIZED // OVERSIGHT ACTIVE"
        ], false);
        alert("Unit 001: Synchronizing with regional water nodes...");
      } else if (unitId === "012") {
        logToTerminal(terminal, [
          "INVERTER HANDSHAKE PROTOCOL ACTIVE...",
          "SATELLITE-COIL LINK: STABLE",
          "GRID LOAD: BALANCED",
          "STATUS: SOVEREIGN ENERGY CHANNELS ONLINE"
        ], false);
        alert("Unit 012: Grid synchronization sequence engaged...");
      }
    });
  });

  // Academy access form
  const academyForm = document.getElementById("academy-form");
  if (academyForm) {
    academyForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const keyInput = document.getElementById("access-key");
      const terminal = document.querySelector('.terminal[data-terminal-id="terminal-ACADEMY"]');
      const key = (keyInput.value || "").trim();

      if (!key) {
        logToTerminal(terminal, [
          "NO KEY PROVIDED.",
          "ACCESS DENIED.",
          "STATUS: LOGGED FOR REVIEW."
        ], true);
        return;
      }

      // Placeholder logic — real auth would be backend
      logToTerminal(terminal, [
        "KEY RECEIVED.",
        "VALIDATING AGAINST SOVEREIGN REGISTRY...",
        "NO PUBLIC ENDPOINT AVAILABLE.",
        "STATUS: FOUNDER / INSTITUTIONAL CHANNEL ONLY."
      ], true);
    });
  }

  // 135 Matrix population
  const matrixGrid = document.getElementById("matrix-grid");
  if (matrixGrid) {
    const projects = [];
    for (let i = 1; i <= 135; i++) {
      const id = String(i).padStart(3, "0");
      projects.push({
        id,
        title: `Protocol Unit ${id}`,
        desc: "Reserved slot within the 135 Matrix for sovereign-grade automation, governance, or infrastructure deployment."
      });
    }

    matrixGrid.innerHTML = projects.map(p => `
      <div class="module">
        <span class="unit-id">MATRIX // UNIT ${p.id}</span>
        <h2>${p.title}</h2>
        <p>${p.desc}</p>
        <div class="terminal terminal-static">
          &gt; STATUS: RESERVED<br />
          &gt; ACTIVATION: FOUNDER / REGULATORY CHANNEL
        </div>
      </div>
    `).join("");
  }
});
