const request = require('request');

const forecast = (lat,lon,callback) => {
	const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+encodeURIComponent(lat)+'&lon='+encodeURIComponent(lon)+'&appid=b69d6a369d6948a61ae6bc7b5477595e';

	request({url: url, json: true},(error,response) => {
		if(error){
			callback('Unable to Connect to weather services!', undefined)
		}else if(response.body.cod =="400"){
			callback('Unable to find location.Try another search!', undefined)
		}else{
			callback(undefined,'It is currntly '+(response.body.current.temp - 273.15).toFixed(2)+' degrees outside.The wind speed is '+response.body.current.wind_speed + ' and humidity is ' + response.body.current.humidity + '%');
		}
	});
}

module.exports = {
    forecast: forecast,
}