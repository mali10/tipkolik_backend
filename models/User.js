//To communicate with the database
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true , unique: true},
    email: { type: String, required: true, unique: true }, //Ensures email uniqueness across users
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: true } ,
    tournaments: [{ type: Schema.Types.ObjectId, ref: 'Tournament' }],
    //friendsWith
});

const User = mongoose.model( 'User' , UserSchema);

module.exports = User;