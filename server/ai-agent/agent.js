setInterval(() => {
    console.log("[AI AGENT] Checking system health...");

    // Simulated checks
    const services = ["auth", "games", "subscriptions"];
    services.forEach(s => {
        console.log(`[AI AGENT] ${s} service OK`);
    });

}, 5000);
