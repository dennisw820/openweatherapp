// Dependencies
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const morgan = require('morgan');
const superagent = require('superagent');
const cors = require('cors');
// const bootstrap = require('bootstrap');
// const boostrapIcons = require('boostrap-icons');
const app = express();

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Middleware
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); // Encode special characters
// app.use(morgan('dev'));
app.use(express.static('./public'));

// Get Date
var date = new Date().toDateString();


// Serve Landing Page
app.get('/', function(req, res){
    res.render(__dirname + '/views/index.ejs', {date});
});

// Retrieve Data from User

app.post('/', async (req, res) => {
    const query = req.body.city;
    const apiKey = process.env.apiKey;
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}`;    
    
    // fetch(url).then(res => res.json()).then(data => console.log(data))

    // setWeatherData(data, place) => {
    //     // logo.textContent = ;
    //     location.textContent = data.data.name;
    //     description.textContent = data.data.weather[0].description;
    //     misc.textContent = ;
    // }

    // console.log(query);


    // Make API Call
    // https.get(url, function (response) {

    //     if (res.statusCode === 200) {
    
    //         response.on('data', function (data) {
    //             var weatherData = JSON.parse(data);
    //             var icon = weatherData.weather.icon;
    //             var imgURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
    //             var location = weatherData.name;
    //             var weatherDescription = weatherData.weather[0].description;
    //             var temp = weatherData.main.temp;
    //             var windSpeed = weatherData.wind.speed;
    //             var sunrise = weatherData.sys.sunrise;
    //             var sunset = weatherData.sys.sunset;
                
    //             // console.log(location, weatherDescription, temp, windSpeed, sunrise, sunset);
                
    //             res.render('index', {icon, location, weatherDescription, temp, windSpeed, sunrise, sunset});
    //         });
    //     }
    //     else {
    //         response.on('error', function(errorMessage){
    //             ejs.render('views/error.ejs');
    //         })
    //     }


    // });
        var getData = async (data, err) => {
            var data = await https.get(url)
            var json = JSON.stringify(data)
            try {
                console.log(data)
            }
            catch(err) {
                console.log(err)
            }
        } 
        getData();
    
});

// Image of weather status
// City
// Weather Description
// Temperature (Farenheit & Celsius)
// Wind speed
// Sunrise & Sunset Times

// Spin Up Server
app.listen(process.env.PORT || '3500', () => {
    console.log(`Server is running on port ${process.env.PORT}.`)
});