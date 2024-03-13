const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TournamentWeekSchema = new Schema({
    tournament:  { type: Schema.Types.ObjectId, ref: 'Tournament', required: true },
    week_number: { type: Number , required: true },
    matches: [{ type: String }]
});

const TournamentWeek = mongoose.model( 'TournamentWeek' , TournamentWeekSchema );

module.exports = TournamentWeek;
