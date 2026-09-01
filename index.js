const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// MIDDLEWARE
// ==========================================
app.use(compression());
app.use(cors());
app.use(express.json());

// ✅ CRITICAL FIX #1: Serve static files from root directory
app.use(express.static(path.join(__dirname)));

// ✅ CRITICAL FIX #2: Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// ==========================================
// API ROUTES
// ==========================================

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

// ==========================================
// SPA FALLBACK - Serve index.html for non-API routes
// ==========================================
app.get('*', (req, res) => {
    // Don't serve HTML for API routes that return 404
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({ error: 'API endpoint not found' });
    }
    
    // Serve index.html for all other routes (SPA)
    res.sendFile(path.join(__dirname, 'index.html'), (err) => {
        if (err) {
            res.status(404).send('Page not found');
        }
    });
});

// ==========================================
// ERROR HANDLING
// ==========================================
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// ==========================================
// START SERVER
// ==========================================
app.listen(PORT, () => {
    console.log('\n========================================');
    console.log('✅ SERVER STARTED SUCCESSFULLY');
    console.log('========================================');
    console.log(`🌐 URL: http://localhost:${PORT}`);
    console.log(`📁 Static files: Serving from root + /public`);
    console.log(`🔌 API endpoints: Active`);
    console.log(`📚 HTML pages: 150+ pages accessible`);
    console.log('========================================\n');
});

module.exports = app;
