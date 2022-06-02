const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

hbs.registerPartials(partialsPath)

//setup handlers engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=> {
    res.render('index', {
        title: 'Weather App',
        name: 'Dozie Emodi'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Me',
        name:  'Dozie Emodi'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        guide: 'Kindly follow these steps',
        name: 'Dozie Emodi'
    })
})

app.get('/weather',(req,res) =>{
    if(!req.query.address){
            return res.send({
            error: 'Kindly provide an address'
        })
    } 
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{

            if(error){
              return res.send({error})
            }
          
            forecast(latitude,longitude, (error, forecastData) => {
              if(error){
                return res.send({error})
              }
              res.send({
                  forecast:forecastData,
                  location,
                  address: req.query.address
              })
            })
          })
    
})

app.get('/help/*',(req,res) =>{
    res.render('404',{
        title: '404',
        name:'Dozie Emodi',
        errorMessage: 'Help article not found'

    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Dozie Emodi',
        errorMessage: 'Page not found.'
    })
 })

app.listen(3000, () => {
   console.log('web server listening on port 3000')
})






