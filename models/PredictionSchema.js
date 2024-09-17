const PredictionsSchema = new Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'User' },
    tournamentID: { type: Schema.Types.ObjectId, ref: 'Tournament' },
    totalPoints: { type: Number, required: true },
    predictions: [{
        //leagueID
        //week_number: Number,
        games: [{
            gameID: { type: String, required: true },
            prediction: { homeScore: Number, awayScore: Number }, // boşsa -1 olsun
            point: Number,
        }],
        selectedSurpriseGame: { type: String, required: false },
        points_won: Number
    }]
});
