const request = require('postman-request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=4dc88249735e774abaab50ecf306a4d0&query=' + latitude + ',' + longitude +'&units=m'
    request({url, json: true},(error, {body}) => {
      if(error){
          callback('unable to connect to weather service', undefined)
      }else if(body.error){
          callback('unable to find location', undefined)
      } else {
          callback(undefined ,'It is currently ' + body.current.temperature + ' degress out, with humidity of ' + body.current.humidity + '%.\nThe weather is ' + body.current.weather_descriptions)
      }
    })
  }



  module.exports = forecast