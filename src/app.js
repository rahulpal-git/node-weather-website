const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');

const geocodeUtils = require('./utils/geocode.js');
const forecastUtils = require('./utils/forecast.js');

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');;

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/',(req, res) => {
    res.render('index', {
        title: 'Weather!',
        name: 'Rahul',
    });
});

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About Me!',
        name: 'Rahul',
    });
});

app.get('/help',(req, res) => {
    res.render('help',{
        title: 'Help Page!',
        helpText: 'Thus is some helpful text.',
        name: 'Rahul',
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'Rahul',
        errorMessage: 'Help article not found',
        title: '404', 
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address!',
        });
    }

    const address = req.query.address;
    
    geocodeUtils.geocode(address,(error,data = {}) => {
		if(error){
			return res.send({
                error,
            });
		}
		forecastUtils.forecast(data.latitude, data.longitude, (error, forecastData) => {
			if(error){
				return res.send({
                    error,
                });
			};
            res.send({
                address: req.query.address,
                location: data.location,
                forecast: forecastData,
            });
		});
	});

});

// app.get('/products', (req, res) => {
//     if(!req.query.search){
//         return res.send({
//             error: 'Please provide a search term',
//         });
//     }
//     console.log(req.query.search);
//     res.send({
//         products: [],
//     });
// });

app.get('*',(req, res) => {
    res.render('404', {
        name: 'Rahul',
        errorMessage: 'Page not found',
        title: '404', 
    });
});

app.listen(3000, () => {
    console.log('Server is up!');
})