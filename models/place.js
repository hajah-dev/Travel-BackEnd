const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema ({
    title: { type: String, required: true },
    description: { type: String, required: true },
    // When we work with database, the image is always an URL. 
    // A URL pointing towards a file which is not stored in our database
    // because storing files or images in the databse is not a good
    // idea because it contradicts the idea of a database which
    // should be fast and should be able to execute queries as quick as possible
    image: {type: String, required: true},
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    // The ref: 'User' we used below is the name we attributed to the UserSchema
    // from @user.js  
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
})
module.exports = mongoose.model('Place', placeSchema);

// If we create a new place, we want to make sure that this place
// will contain the userId. So we wanna make sure that this place
// will also be added to the user documents. 