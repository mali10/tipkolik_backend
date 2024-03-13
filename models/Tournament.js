const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TournamentSchema = new Schema({
  //creator: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
  players: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  teams: [{ type: String }],
  settings: {
    isSurpriseMatchActive: { type: Boolean, default: false },
  },
});

const Tournament = mongoose.model( 'Tournament' , TournamentSchema);

module.exports = Tournament;
