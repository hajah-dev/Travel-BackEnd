const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    name: { type: String, required: true },
    // Unique: we use above only creates an internal index in the database to
    // make it easier and faster to query our emails. This is not done by unique
    // but by a 3rd package for that we have to install unique validator.
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    image: { type: String, required: true },
    places: { typpe: String, required: true }
})

// To add the uniqueValidator to the Schema:
userSchema.plugin(uniqueValidator)
// With that we made sure that we can query our emails as
// fast as possible in our database with unique. And we made
// sure that we can only create a new user if the email doesn't
// exist already with our unique validator package. 
module.exports = mongoose.models('Userxx', userSchema)