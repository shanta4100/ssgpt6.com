// SSGPT6 Secure Tier Logic
const accessTiers = {
    "TIER_ZERO": { name: "Public", projects: "1-15", clearance: "General" },
    "TIER_INSTITUTION": { name: "Partner", projects: "1-90", clearance: "Restricted" },
    "TIER_OMNI": { name: "GNAIAAAC Admin", projects: "1-135", clearance: "Sleeping Agent Root" }
};

function loginToMatrix() {
    const key = document.getElementById('access-key').value;
    const dashboard = document.getElementById('project-grid');

    if (key === "GNA-99-OMNI") {
        renderMatrix(accessTiers.TIER_OMNI);
    } else if (key === "GNA-PARTNER") {
        renderMatrix(accessTiers.TIER_INSTITUTION);
    } else {
        renderMatrix(accessTiers.TIER_ZERO);
    }
}

function renderMatrix(tier) {
    console.log(`Access Granted: ${tier.name}. Loading projects ${tier.projects}...`);
    // Logic to populate the 135 Matrix UI
}
