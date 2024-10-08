const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TournamentSchema = new Schema({
  // TO ADD: creator: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
  // TO ADD: creation-date,
  // TO ADD: Code of the tournament + Code Generator,
  t_name: { type: String, required: true , unique: true},
  players: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  // TO ADD: selected leagues 
  teams: [{
    teamId: { type: String, required: true },  
    leagueIds: [{ type: String, required: true }],
  }],
  leagues: [{
    leagueId: { type: String, required: true },
    leagueName: { type: String, required: true }
  }],
  settings: {
    isSurpriseMatchActive: { type: Boolean, default: false },
  },
});

const Tournament = mongoose.model( 'Tournament' , TournamentSchema);

module.exports = Tournament;
