const jsonServer = require('json-server');
const path = require('path');
const express = require('express');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Use default middlewares (CORS, logging, etc)
server.use(middlewares);

// IMPORTANT: Serve static files BEFORE API routes
server.use(express.static(path.join(__dirname)));

// API routes - all your fetch calls should use /api/*
server.use('/api', router);

// Handle all other routes to serve index.html (for client-side routing)
server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
    console.log(`📦 API available at http://localhost:${port}/api`);
    console.log(`🌐 Frontend at http://localhost:${port}`);
});