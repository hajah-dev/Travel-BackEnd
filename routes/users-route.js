// In this file, we are going to register a middleware that is responsible
// for handling routes related to users. 
 
const usersController = require('../controllers/users-controller');
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

router.get('/', usersController.getUsers);

router.post('/signup', 
    [
        check('name')
            .not()
            .isEmpty(),
        check('email')
            .normalizeEmail()
            .isEmail(),
        check('password')
            .isLength({min:6})    
    ],        
    usersController.signUp
);

router.post('/login', usersController.login);


// We can the router we export below as a middleware
// in the file that will import it. 
module.exports = router;