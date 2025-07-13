require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectRedis = require('./utils/redis');

const app = express();

// Prometheus metrics middleware at /metrics
const promBundle = require('express-prom-bundle');
const metricsMiddleware = promBundle({ includeMethod: true });
app.use(metricsMiddleware); // Should be near the top, before routes

// General middleware
app.use(express.json());
app.use(cors());

// Liveness probe
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Readiness probe
app.get('/ready', async (req, res) => {
    try {
        const redisClient = await connectRedis();
        const pong = await redisClient.ping();
        if (pong === 'PONG') {
            res.status(200).send('Ready');
        } else {
            res.status(500).send('Redis not ready');
        }
    } catch (err) {
        res.status(500).send('Not Ready');
    }
});

// App routes
const authRoutes = require('./routes/auth.route');
app.use('/auth', authRoutes);

// Graceful shutdown
process.on('SIGINT', async () => {
    const redisClient = await connectRedis();
    await redisClient.quit();
    console.log('Redis connection closed');
    process.exit(0);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Auth Service running on port ${PORT}`);
});

module.exports = app;
