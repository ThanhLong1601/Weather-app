const request = require('postman-request')
require('dotenv').config();

const weatherApiKey = process.env.WEATHER_API_KEY

const weatherAPI = (lat, lng, callback) => {
    const url = `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${lat},${lng}`

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!!!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
            console.log(body.error)
        } else {
            callback(undefined, body.current.condition.text
                + '. It is currently ' 
                + body.current.temp_c 
                + ' degree out. But It feel like ' 
                + body.current.feelslike_c + ' degree. The humidity is about '
                + body.current.humidity + ' grams per cubic meter. There is a '
                + body.current.precip_mm + ' change of rain.')
        }
    })
}

module.exports = weatherAPI