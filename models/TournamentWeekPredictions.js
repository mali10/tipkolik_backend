const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TournamentWeekPredictionsSchema = new Schema({
    predictions: [{ type: String }],
    pointsEachGame: [{ type: Number }],
    weeklyPoints: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    week: { type: Schema.Types.ObjectId, ref: 'Tournament_Week', required: true },
});

const TournamentWeekPredictions = mongoose.model( 'TournamentWeekPredictions', TournamentWeekPredictionsSchema);

module.exports = TournamentWeekPredictions;

