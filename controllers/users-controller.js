const HttpError = require('../models/http-error');
const {v4: uuidv4} = require('uuid');
const {validationResult} = require('express-validator');
const User = require('../models/user')

// const DUMMY_USERS = [
//     {
//         id: 'u1',
//         name: 'Max Schwarz',
//         email: 'test@test.com',
//         password: 'p12345'
//     }
// ]

const getUsers = async (req, res, next) => {
    let users;
    // Here we would like to find only email and the name
    try {
        // Find return an array (cursor)
        users = await User.find({}, '-password');
    } catch (err){
        const error = new HttpError('Fetching users failed, please try again later', 500)
        return next (error); 
    }
    res.json({users: users.map((user => user.toObject({ getters: true })))});
};

const signUp = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors)
        return next(new HttpError('Invalid inputs passed, please check your data', 422));
    }
    const { name, email, password } = req.body;

    let existinUser;
    try {
        existinUser = await User.findOne({ email: email })
        
    } catch (err){
        const error = new HttpError(
            'Signing up failed, please try again later', 500
        )
        return next(error)
    }
    if(existinUser) {
        const error =new HttpError('User exists already, please login instead', 422)
        return next(error);
    }
    
    const createdUser = new User ({
        name, 
        email, 
        image: 'https://source.unsplash.com/random',
        password,
        places: []
    })
    
    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again',
            500
        );
        return next(error)
    }
    res.status(201).json({user:createdUser.toObject({getters: true})});
};

const login = async(req, res, next) => {
    const {email, password} = req.body;
    // const identifiedUser = DUMMY_USERS.find(u => u.email === email);
    // if(!identifiedUser || identifiedUser.password !== password) {
    //     throw new HttpError('Could not identify User', 401);
    // }
    let existinUser;
    try {
        existinUser = await User.findOne({ email: email })
    } catch (err){
        const error = new HttpError(
            'Login in failed, please try again later', 500
        )
        return next(error)
    }
    if(!existinUser || existinUser.password !== password) {
        const error = new HttpError(
            'Invalid credential, could not log you in', 401
        )
        return next(error);
    }
    res.json({message: 'Logged in!'});
};

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.login = login;