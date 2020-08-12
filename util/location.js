const axios = require('axios');
const API_KEY = "AIzaSyDU6kngavUH5MXY0h8niYzAZMIiwNAD1-4";
const HttpError = require('../models/http-error');

async function getCoordsForAddress(address){
    // Install the axios package: to send an http requests from 
    // front end applications to backends. 
    // This package can also be used on a NOde server to send a request from 
    // there, and that's exactly what we are doing here
    // So in our case, the axios will allow us to send a request from our Node
    // server to another server (to another backend)
    // The following code should gives us the coordinates of a giving address
    const response = await axios
        .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`)
        
    const data = response.data;
    if(!data || data.status === 'ZERO_RESULTS'){
        const error = new HttpError('Could not find location for the specified address', 422);
        throw error;
    }
    const coordinates = data.results[0].geometry.location;
    return coordinates;
}
module.exports = getCoordsForAddress;