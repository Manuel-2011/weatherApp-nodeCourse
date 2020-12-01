const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const location = `${latitude},${longitude}`
    const url = `http://api.weatherstack.com/current?access_key=a5233ce1b978cd10b86a609ceae7d1a4&query=${location}`

    request({'url':url, 'json': true}, (error, response) => {
    if (error) {
        callback('Check your connectivity!', undefined)
    } else if (response.body.error) {
        callback('Couldnt find the location!', undefined)
    } else {
        const temp = response.body.current.temperature
        const feels = response.body.current.feelslike
        const description = `The current temperature is ${temp}. It feels like ${feels}`
        callback(undefined, {
            temperature: temp,
            feelslike: feels,
            description: description
        })
    }
    })
}

module.exports = forecast
