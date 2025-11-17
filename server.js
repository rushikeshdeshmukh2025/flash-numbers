const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname)));

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check endpoint for Azure
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy' });
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`🚀 Flash Counting Fun is running on port ${PORT}`);
    console.log(`🌟 Visit http://localhost:${PORT} to play!`);
});
