const jsonServer = require('json-server');
const path = require('path');
const express = require('express');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Use default middlewares (CORS, static, etc)
server.use(middlewares);

// Serve static files (your HTML, CSS, JS)
server.use(express.static('.'));

// API routes - all your fetch calls should use /api/*
server.use('/api', router);

// Handle all other routes to serve index.html (for client-side routing)
server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
    console.log(`📦 API available at http://localhost:${port}/api`);
    console.log(`🌐 Frontend at http://localhost:${port}`);
});