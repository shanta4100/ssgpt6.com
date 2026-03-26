const express = require('express');
const app = express();
app.use(express.json());

// Authentication
app.post('/auth/login', (req, res) => {
    res.json({ status: "ok", token: "session-token" });
});

// Subscription
app.get('/subscription/status', (req, res) => {
    res.json({ subscribed: true });
});

// Game Registry
app.get('/games/list', (req, res) => {
    res.json({
        games: [
            "Seven Realms Explorer",
            "SS Solitaire",
            "Nano Banana",
            "Infinite Engine",
            "Realmwalker"
        ]
    });
});

// AI Sleeping Agent
app.get('/ai/status', (req, res) => {
    res.json({ agent: "sleeping", health: "stable" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
