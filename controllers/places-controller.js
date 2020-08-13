const HttpError = require('../models/http-error');
const {v4: uuidv4} = require('uuid');
const {validationResult} = require('express-validator');
const getCoordsForAddress = require('../util/location');

let DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers',
        location: {
            lat: 40.75,
            lng: -73.99
        },
        address: '20 W 34th St, New Yorl, NY 10001',
        creator: 'u1'
    }
]

const getPlaceById = (req, res, next) => {
    // The params property we use below holds an object
    // where our dynamic segments (pid:) will exists as keys
    // and the value will be concrete value the user who sent
    // the request entered. 
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    });
    
    if(!place){
        throw new HttpError('Could not find a place for the provided id', 404);; 
        // ou return next (error) // with error = new HttpError('Could...', 404)
    } 
    res.json({place}); // ==> {place} ==> {place: place}
}

const getPlacesByUserId = (req, res, next) => {
    const userId = req.params.uid;
    
    // filter will return us a new array full of elements that fulfill the criteria 
    // it takes as argument
    const places = DUMMY_PLACES.filter(p =>  p.creator === userId);
    if(!places || places.length === 0){
        // If we are in an asynchronous code (when we use a database),
        // we have to call next(error). If we are in synchronous middleware 
        return next (new HttpError('Could not find places for the provided user id', 404));
    } 
    res.json({places});
}

const createPlace = async (req, res, next) => {
    // The following is from the validator we used in @places-routes.js, to 
    // be able to display an error if the check() method we defined in there
    // triggered an invalid input inserted.
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors)
        return next(new HttpError('Invalid inputs passed, please check your data', 422));
    }
    
    // For post request, we expect to have data in the body
    // of the post request. Because get request doesn't have
    // a request body, a post request do, and we do encode data
    // we want to send with a post request into that post request body
    // To get data out of the body, we can use the package 'body-parser'
    // We use destructuring in the code in right to get different properties
    // out of request body and store it in constants which are then available
    // in the function
    const { title, description, address, creator } = req.body;
    // The destructuring above is to avoid to do like: const title = req.body.title
    
    // Converting the address to coordinate:
    // The following code might throws an error, so that's why we are going to use
    // the try catch block
    let coordinates;
    try{
        coordinates = await getCoordsForAddress(address);
    } catch(error){
        return next(error);
    }
    
    const createdPlace = {
        id: uuidv4(),
        title,
        description,
        location: coordinates,
        address,
        creator
    }
    DUMMY_PLACES.push(createdPlace);
    // In the following we return an object 'place' that holds the property createdPlace
    res.status(201).json({place: createdPlace})
}

const updatePlace = (req, res, next) => {  
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors)
        throw new HttpError('Invalid inputs passed, please check your data', 422);
    }
    // We need the id of the place we want to update, and that is encoded into the URL
    // so we have a mixture of some data being part of the URL and some data being part 
    // of the request body. We encode the identifying criteria using the ID from the URL
    // and the data with which we should then work into the request body. 
    const { title, description } = req.body;
    const placeId = req.params.pid; 
    // pid is from router.patch('/:pid'...) in @places-routes.js
    const updatedPlace = {...DUMMY_PLACES.find(p => p.id === placeId)};
    // Explication of the code above: 
    // In the code above we want to create a copy of the place we found with
    // the specifying id, change that copy and only once that copy is finished, 
    // we want to change the entire place in our array of places with that updated copy.
    // To create the copy, we used a spread operator that created a new object and copies
    // all the key-value pair of the old object as key-value pairs into the new object 
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
    updatedPlace.title = title;
    updatedPlace.description = description;
    
    DUMMY_PLACES[placeIndex] = updatedPlace;
    res.status(200).json({place: updatedPlace});
}

const deletePlace = (req, res, next) => {
    const placeId = req.params.pid;
    if(!DUMMY_PLACES.find(p => p.id === placeId)){
        throw new HttpError('Could not find a place for that id', 404);
    }
    // The code below means that only the elements which statisfy
    // the condition will be store in the new array.
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
    res.status(200).json({message: 'Deleted place successfully'})
}


exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;