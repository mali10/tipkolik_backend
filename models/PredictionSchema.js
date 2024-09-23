const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PredictionsSchema = new Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'User' },
    tournamentID: { type: Schema.Types.ObjectId, ref: 'Tournament' },
    totalPoints: { type: Number, required: true },
    predictions: [{
        leagueID: { type: Schema.Types.ObjectId, ref: 'League' }, // Reference to the league
        games: [{
            gameID: { type: String, required: true },
            predictions: { homeScore: Number, awayScore: Number }, // Set score = -1 if empty
            point: Number,
        }],
        selectedSurpriseGame: { type: Number, required: false }, 
        points_won: Number
    }]
});

const Predictions = mongoose.model( 'Predictions' , PredictionsSchema);

module.exports = Predictions;
