// In this file, we are going to register a middleware that is responsible
// for handling routes related to places. 

const placesControllers = require('../controllers/places-controller');
const express = require('express');

// The check method we took by destructuring the express-validator will 
// returns a new middleware configured for our validation requirements
const {check} = require('express-validator');

const router = express.Router();

router.get('/:pid', placesControllers.getPlaceById);

router.get('/user/:uid', placesControllers.getPlacesByUserId);

// Here we want to add validator to just post and patch. 
// Note: In the code below, we can register more than one middleware
// on the same HTTP method path combination and they will simply be executed
// from left to right in our arguments.  
// Here check() takes as argument the name of the field in our request body which 
// we want to validate.
router.post('/', 
    [
        check('title')
            .not()
            .isEmpty(),
        check('description')
            .isLength({min: 5}),
        check('address')
            .not()
            .isEmpty()
    ],
    placesControllers.createPlace
);

router.patch('/:pid',
    [
        check('title')
            .not()
            .isEmpty(),
        check('description')
            .isLength({min: 5})
    ],
    placesControllers.updatePlace)

router.delete('/:pid', placesControllers.deletePlace)

// We can the router we export below as a middleware
// in the file that will import it. 
module.exports = router;