const request = require('postman-request')



const geocode = (location, callback) => {
    const geoKey = 'pk.eyJ1IjoibWFudWVsMjAxMSIsImEiOiJja2h5N3pyNTAxdXN1MnNuM3lqcDd4dGdmIn0.3D5VaqVCCHYAJxSYsANokg'
    const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(location)}.json?access_token=${geoKey}&limit=1`

    request({'url': geoUrl, 'json': true}, (error, response) => {
        if (error) {
            callback('Couldnt connect to geoCoding API', undefined)
        } else if ( response.body.features.length === 0) {
            callback('Couldnt find the location', undefined)
        } else {
            callback(undefined, {
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }  
    })    
}

module.exports = geocode

