require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const companyRoutes = require('./routes/company.route'); // Company routes
const promClient = require('prom-client'); // Prometheus metrics

const app = express();

// Setup Prometheus metrics
const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors());         // Enable CORS

// Liveness Probe
app.get('/health', (req, res) => {
    res.status(200).send('OK'); // Liveness probe
});

// Readiness Probe
app.get('/ready', async (req, res) => {
    try {
        res.status(200).send('Ready'); // App is ready
    } catch (error) {
        res.status(500).send('Not Ready');
    }
});

// Register Company Routes
app.use('/company', companyRoutes);

// Default Route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Company Service is running!' });
});

// Start Server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Company Service running on port ${PORT}`);
});

module.exports = app;
