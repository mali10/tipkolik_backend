const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TournamentSchema = new Schema({
  players: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  teams: [{ type: String }],
  settings: [{}], // Define settings structure as needed
});

const Tournament = mongoose.model( 'Tournament' , TournamentSchema);

module.exports = Tournament;
