const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from root directory and subdirectories
app.use(express.static(path.join(__dirname), {
  maxAge: '1h',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.set('Cache-Control', 'public, max-age=3600');
    } else {
      res.set('Cache-Control', 'public, max-age=86400');
    }
  }
}));

// API Routes
app.post('/auth/login', (req, res) => {
    res.json({ status: "ok", token: "session-token" });
});

app.get('/subscription/status', (req, res) => {
    res.json({ subscribed: true });
});

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

app.get('/ai/status', (req, res) => {
    res.json({ agent: "sleeping", health: "stable" });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// SPA fallback: serve index.html for routes that don't match static files or API routes
app.use((req, res) => {
    if (!req.path.startsWith('/api/')) {
        const indexPath = path.join(__dirname, 'index.html');
        res.sendFile(indexPath, (err) => {
            if (err) {
                res.status(404).json({ error: 'Page not found' });
            }
        });
    } else {
        res.status(404).json({ error: 'API endpoint not found' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
