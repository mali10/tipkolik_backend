const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PremLeagueSchema = new Schema({
    allMatches: [{ type: String }],
    weekId: { type: Schema.Types.ObjectId, ref: 'Tournament_Week' },
});

const PremLeague = mongoose.model( 'PremLeague', PremLeagueSchema);

module.exports = PremLeague;
