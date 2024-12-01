const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const weatherAPI = require('./utils/weatherAPI.js')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {{
    res.render('index', {
        title: 'Weather app',
        name: 'Long'
    })
}})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Long'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpText: 'If you need any help please leave a message!!!',
        name: 'Long'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address

    if (!address) {
        return res.send({
            error: 'You must provide a address'
        })
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        weatherAPI(latitude, longitude, (error, weatherAPIData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: weatherAPIData,
                location,
                address
             })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404-page', {
        title: '404',
        name: 'Long',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404-page', {
        title: '404',
        name: 'Long',
        errorMessage: 'Page not found'
    })
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is on port ${port}.`)
})