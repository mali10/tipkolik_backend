const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TurkishLeagueSchema = new Schema({
    allMatches: [{ type: String }],
    weekId: { type: Schema.Types.ObjectId, ref: 'Tournament_Week' },
});

const TurkishLeague = mongoose.model( 'TurkishLeague', TurkishLeagueSchema);

module.exports = TurkishLeague;


