const express = require('express');
const app = express();

const port = 3000;

// Database configuration
require('./config/db');

app.use(express.json());

// Import routers
const UserRouter = require('./api/User');
const TournamentRouter = require('./api/Tournament'); 

app.use('/user', UserRouter);
app.use('/tournament', TournamentRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})