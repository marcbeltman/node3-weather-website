const path = require('path')
const express = require('express')
const hbs = require('hbs')

const request = require('request')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Marc Beltman'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Marc Beltman'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Marc Beltman',
        message: 'what the fuck how long am i doing this'
    })
})

// app.get('/weather', (req, res) => {
//     res.send({forecast: 'sunny and 12 degrees', 
//     location: 'kaulille'
//     })
// })


app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({ 
            error: 'you must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
        return console.log(error)
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
        if(error){
            return console.log(error)
        }
            res.send({
                forecast: forecastData, 
                location: location,
                address: req.query.address
            })
        })
    })
})




app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})





app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404 page',
        name: 'Marc Beltman',
        message: 'Help article not found'
    })
})


// moet als laatse
app.get('*', (req, res) =>{
    // res.send('My 404 page')
    res.render('404page', {
        title: '404 page',
        name: 'Marc Beltman',
        message: 'Sorry the page your looking for could not be found'
    })
})




app.listen(port, () => {
    console.log('server is up on port ' + port)
})