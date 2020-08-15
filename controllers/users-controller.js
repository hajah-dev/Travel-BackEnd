const HttpError = require('../models/http-error');
const {v4: uuidv4} = require('uuid');
const {validationResult} = require('express-validator');
const User = require('../models/user')

const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Max Schwarz',
        email: 'test@test.com',
        password: 'p12345'
    }
]

const getUsers = (req, res, next) => {
    res.json({users: DUMMY_USERS});
};

const signUp = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors)
        return next(new HttpError('Invalid inputs passed, please check your data', 422));
    }
    const { name, email, password, places } = req.body;

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
        places
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

const login = (req, res, next) => {
    const {email, password} = req.body;
    const identifiedUser = DUMMY_USERS.find(u => u.email === email);
    if(!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError('Could not identify User', 401);
    }
    res.json({message: 'Logged in!'});
};

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.login = login;