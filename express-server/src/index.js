const express = require('express');
const routes = require('./routes');

const app = express();
const PORT = 8001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Routes
app.use('/', routes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(`Error: ${err.message}`);
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error', message: err.message });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not found', path: req.path });
});

// Export app for testing; only listen if run directly
if (require.main === module) {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Express server is running on http://localhost:${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
}

module.exports = { app };