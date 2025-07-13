require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.route'); // User routes

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Prometheus Metrics Setup
const client = require('prom-client');
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics(); // Collect Node.js metrics

// /metrics endpoint for Prometheus to scrape
app.get('/metrics', async (req, res) => {
    try {
        res.set('Content-Type', client.register.contentType);
        res.end(await client.register.metrics());
    } catch (ex) {
        res.status(500).end(ex);
    }
});

// Liveness Probe
app.get('/health', (req, res) => {
    res.status(200).send('OK'); // App is running
});

// Readiness Probe
app.get('/ready', async (req, res) => {
    try {
        // Optional: Add logic to check DB/Redis connection here
        res.status(200).send('Ready');
    } catch (error) {
        res.status(500).send('Not Ready');
    }
});

// Register Routes
app.use('/user', userRoutes);

// Default Route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'User Service is running!' });
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`User Service running on port ${PORT}`);
});

module.exports = app;
