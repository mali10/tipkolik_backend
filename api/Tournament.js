const express = require('express');
const router = express.Router();

// MongoDB Tournament model
const Tournament = require('../models/Tournament');

// User model for reference population
const User = require('../models/User');  

// Create a new tournament
router.post('/create', async (req, res) => {   // fatih terim
    const { playerIds, teams, settings } = req.body; // Expecting IDs directly from the frontend now

    try {
        
        // Create and save the tournament with user IDs
        const newTournament = new Tournament({
            players: playerIds, // Directly using player IDs received from the frontend, /users/ids
            teams,
            settings
        });
        const savedTournament = await newTournament.save();
        res.status(201).json(savedTournament);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while creating the tournament.', error: error.message });
    }
});
  
module.exports = router;
