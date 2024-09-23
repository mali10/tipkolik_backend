const express = require('express');
const router = express.Router();

const Tournament = require('../models/Tournament');

const User = require('../models/User');

// Endpoint to fetch teams list for a given tournament by name
router.get('/tournament-teams', async (req, res) => {
    try {
        const { t_name } = req.query;

        console.log(t_name);

        if (!t_name) {
            return res.status(400).json({ message: 'Tournament name is required.' });
        }
    
        const tournament = await Tournament.findOne({ t_name: t_name });

        if (!tournament) {
            return res.status(404).json({ message: `Tournament not found with the name: '${t_name}'` });
        }
    
        const teams = tournament.teams; 
        const leagues = tournament.leagues;

        if (!teams || teams.length === 0) {
            return res.status(204).json({ teams: [] });
        }

        res.json({ teams , leagues });

    } catch (error) {
        console.error('Error fetching tournament teams:', error);
        res.status(500).json({ message: 'An error occurred while fetching tournament teams.', error: error.message });
    }
});

// Endpoint to fetch tournaments list for a given user by name
router.get('/tournaments-list', async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ message: 'User name is required.' });
        }

        const lowercaseName = name.toLowerCase();
        const user = await User.findOne({ name: lowercaseName });

        if (!user) {
            return res.status(404).json({ message: `User not found with the name: '${lowercaseName}'` });
        }
    
        const tournaments = await Tournament.find({ _id: { $in: user.tournaments } }).select('t_name');

        if (tournaments.length === 0) {
            return res.status(204).json([]);
        }
       
        res.json(tournaments.map(tournament => tournament.t_name));

    } catch (error) {
        console.error('Error fetching user tournaments:', error);
        res.status(500).json({ message: 'An error occurred while fetching user tournaments.', error: error.message });
    }
});

// Check if a tournament name already exists
router.post('/check-tournament', async (req, res) => {
    const { t_name } = req.body;

    try {
      const existingTournament = await Tournament.findOne({ t_name });
      if (existingTournament) {
        return res.status(409).json({ message: 'A tournament with this name already exists.' });
      }
      res.status(200).json({ message: 'Tournament name is available.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while checking the tournament name.', error: error.message });
    }
});
  
// Create a new tournament
router.post('/create', async (req, res) => {
    const { t_name, playerNames, teams, leagues,  settings } = req.body;

    if (!t_name.trim()) {
        return res.status(400).json({ message: "Tournament name cannot be empty." });
    }

    if (teams.length === 0) {
        return res.status(400).json({ message: "You have to at least select 1 team." });
    }

    if (playerNames.length === 0) {
        return res.status(400).json({ message: "No players added." });
    }
    
    try {

        console.log("backend endpoint active")

        const players = await User.find({
            'name': { $in: playerNames }
        }).select('_id');

        if (players.length !== playerNames.length) {
            return res.status(400).json({ message: "One or more players not found." });
        }

        const playerIds = players.map(player => player._id);

        const newTournament = new Tournament({
            // creator: creator._id,
            t_name: t_name,
            players: playerIds,
            teams,
            leagues,
            settings,
        });

        const savedTournament = await newTournament.save();
        
        console.log("Player IDs to update:", playerIds);
        
        await User.updateMany(
            { _id: { $in: playerIds } },
            { $push: { tournaments: savedTournament._id } }
        );

        res.status(201).json(savedTournament);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while creating the tournament.', error: error.message });
    }
});

module.exports = router;