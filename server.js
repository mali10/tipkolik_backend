// Import express
const express = require('express');
// Initialize the express app
const app = express();
// Specify the port
const port = 3000;

// Database configuration
require('./config/db');

// Middleware for parsing JSON bodies. This replaces body-parser for newer versions of Express
app.use(express.json());

// Import routers
const UserRouter = require('./api/User');
const TournamentRouter = require('./api/Tournament'); // Make sure you have this router set up similarly to UserRouter

// Use routers
app.use('/user', UserRouter);
app.use('/tournament', TournamentRouter);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})