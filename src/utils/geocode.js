const request = require('postman-request')
require('dotenv').config();

const geocodingApiKey = process.env.GEOCODE_API_KEY;

const geocode = (address, callback) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${geocodingApiKey}`;
    console.log('Searching for location:', address);

    request({url, json: true}, (error, { body }) => {
        console.log('Geocoding API Response:', body);
        if (error) {
            callback('Unable to connect to geocoding service!!!', undefined)
        } else if (body.results.length === 0) {
            callback('This address was not found. Try another search', undefined)
        } else {
            callback(undefined, {
                location: body.results[0].formatted,
                latitude: body.results[0].geometry.lat,
                longitude: body.results[0].geometry.lng
            })
        }
    })
}

module.exports = geocode