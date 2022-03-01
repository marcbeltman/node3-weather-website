const request = require('request')

const forecast = (latitude, longitude, callback) => {
   
    const url = 'http://api.weatherstack.com/current?access_key=60194ac7691e2b3c78fc0219a6f84a30&query=' + latitude + ',' + longitude + ''

     request({ url: url, json: true }, (error, {body}) => {
      if (error){
       callback('unable to connect to weather api', undefined)
     }else if (body.error){
       callback('unable to find location', undefined)
    }else{
       callback(undefined, body.current.weather_descriptions[0] + " it is currently " + body.current.
         temperature + " " + "degress out. It feels like " + body.current.feelslike + " degress out ")  
       }
    })
}

module.exports = forecast







