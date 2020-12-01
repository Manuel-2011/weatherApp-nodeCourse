const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000 

//app.com , si estatico. Will look for index.html in the static directory
const publicDirectory = path.join( __dirname, '../public' )
app.use(express.static(publicDirectory))

// For a dinamic page you should:
// 1. install handlebars npm package
// 2. install hbs npm package
// 3. set express.set('view engine', 'hbs') configuration in app.js
// 4. Create a views folder
// 5. create files with hbs extension
app.set('view engine', 'hbs')

//setting to change the name of the default views directory
const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath)
// setting the path por partials
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

//app.com , dinamico
app.get('/', (req, res) => {
    res.render('index', {
        'title': 'The weather app'
    })
})

// app.com/help
app.get('/help', (req, res) => {
    res.render('help', {
        'title': 'Help page'
    })
})

// app.com/about
app.get('/about', (req, res) => {
    res.render('about', {
        'title': 'About page'
    })
})

//app.com/weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }


    geocode(req.query.address, (error, location) => {
        if (error) {
            console.log(error)
            return res.send({
                error
            })
        } else {
            forecast(location.latitude, location.longitude, (error, data) => {
                if (error) {
                    console.log(error)
                    return res.send({
                        error
                    })
                } else {
                    return res.send({
                        location: location.location,
                        temperatura: data.temperature,
                        feelslike: data.feelslike,
                        description: data.description
                    })
                }
            })
        }
    })
})

// app.com/help/.* match anything else
app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'help article not found'
    })
})

// app.com/.* match anything else
app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: '404 page not found'
    })
})


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})