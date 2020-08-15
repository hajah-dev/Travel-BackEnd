const express = require('express');
const bodyParser = require('body-parser');
const placesRoutes = require('./routes/places-routes');
const HttpError = require('./models/http-error');
const usersRoutes = require('./routes/users-route');
const mongoose = require('mongoose');

const app = express();

// The following is for parsing any incoming request body and 
// extract any JSON data which is in there, convert it to regular
// javascript data structures like objects and arrays and then call 
// next automatically, so that we reached the next middleware in line
// which are our own custom routes and then also add this json data there

app.use(bodyParser.json())

// Registering middleware
// We want to use middleware: 'body-parser' that ensures that we 
// parse the request bodies of incoming request. 
// bodyParser.json() will parse any incoming requests body and 
// extract any Json data which is in there, convert it to regular javascript
// data structure like objects and arrays and then call next automatically
// so that we reach the next middleware in line which are our own custom routes
// and then also add this JSON data there.

// The following means that the routes which we configured 
// below are added as middleware in app.js
app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

// Adding a middleware handling all request no matter which 
// verb we used. The idea of the following middleware is 
// that it only runs if we didn't send the response in one
// of our routes before. Because if we do send a response, we
// don't call next, we just send a response, and therefore, 
// no other middleware after the one which send a response will
// be reached. In other words, the current middleware is only reached
// if we have some request which didn't get response, and that can only
// be a request which we don't want to handle. 
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route', 404);
    throw error; // It will be thrown to the next error handling code
                // below. 
});

app.use((error, req, res, next) => {
    // If we provide a middleware function that takes 4 parameters
    // Express will recognize this and treat this as a special middleware
    // function, as an error handling middleware function. That means that this
    // current function will only be executed on the requests that have an error
    // attached to it, so where an error was thrown. In other words, this current
    // function will execute if any middleware in front of it yields an error. 
    if(res.headerSent){
        // That means we check if a response has already been sent, if that's the case
        // we want to return next and forward the error, which means we won't send a response
        // on our own because we already did send response and we can only send one
        // response in total.
        return next(error)
    }
    // If no response has been sent yet: 
    res.status(error.code || 500);
    // Every error we sent back from our API should have a message property, which 
    // the attached client can then use to show an error message to their users
    // 
    res.json({message: error.message || 'An unknown error occured!'});
})
// We first want to establish the connection to the database, if this connection is
// successful then we want to start our back endserver in case the connection in the
// database failed, we don't need the server because we will throw an error instead. 
mongoose.connect('mongodb+srv://************@cluster0.k6kun.mongodb.net/Place?retryWrites=true&w=majority')
        .then(() => {
            app.listen(5000);
        })
        .catch(err => console.log(err));
