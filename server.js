const jsonServer = require('json-server');
const path = require('path');
const express = require('express');

const app = express();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Use default middlewares (CORS, logging, etc)
app.use(middlewares);

// Serve static files (HTML, CSS, JS from root directory)
app.use(express.static(path.join(__dirname)));

// API routes - all your fetch calls should use /api/*
app.use('/api', router);

// Handle all other routes to serve the appropriate HTML
app.get('*', (req, res) => {
    // If requesting API, don't serve HTML
    if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: 'API endpoint not found' });
    }
    
    // Serve the requested HTML file if it exists
    const requestedFile = req.path.substring(1);
    if (requestedFile && (requestedFile.endsWith('.html') || requestedFile === '')) {
        const filePath = path.join(__dirname, requestedFile || 'index.html');
        res.sendFile(filePath);
    } else {
        // Default to login.html for root
        res.sendFile(path.join(__dirname, 'login.html'));
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
    console.log(`📦 API available at http://localhost:${port}/api`);
    console.log(`🌐 App at http://localhost:${port}`);
});