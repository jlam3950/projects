const searchBar = document.getElementById('searchBar');
const searchBtn = document.getElementById('searchBtn');
const sunny = document.getElementById('sunny');
const hipHop = document.getElementById('hipHop');
const subBtn = document.getElementById('submit');
const weatherContainer = document.getElementById('forecast_container');
 
// const { myKey } = require('./views/search.ejs');
// // import { myKey } from 'search.ejs'
// console.log(myKey);

// import { myKey } from '.views/search.ejs'
// console.log(myKey);

let param1;
let param2;
let genre; 

async function getWeather(){
    const address = searchBar.value; 
    const url = `https://api.geocod.io/v1.6/geocode?q=${address}&api_key=661f10101f5551601645516fff5559650249f94`;

    try{
        const response = await fetch(url, {
            method: 'GET'
        })
        const data = await response.json();
        weatherAPI(data);
    } catch (error){
        console.log(error);
    }
}

async function weatherAPI(data){
    const lat = data.results[0].location.lat;
    const lng = data.results[0].location.lng;

    const url = `https://api.weather.gov/points/${lat},${lng}`
    try{
        const response = await fetch(url, {
            method: 'GET'
        });
        const data = await response.json();
        forecastAPI(data);

    } catch(error){
        console.log(error);
    }
}

function forecastAPI(data){

    const url = data.properties.forecast; 

    fetch(url).then(res => res.json()).then(forecastResponse =>{
        console.log(forecastResponse.properties.periods)
        let data = forecastResponse.properties.periods;
        forecastRender(data);
    })
}

let weeklyForecast = [];

function forecastRender(forecastData){
    forecastData.forEach((day , index) => {
    
        if(index % 2 == 0){
            // console.log(weeklyDate);
        weatherContainer.innerHTML += 
        `<div class = weatherCard id = "${day.shortForecast}">
        <p> ${day.name} </p>
        <div> ${day.shortForecast} </div>
        <p> ${day.temperature} </p>
        <img src="${day.icon}">
        `
        
        // weatherContainer.innerText = `${day.shortForecast}`;
        weeklyForecast.push(day);
        }
    })
    // function shortenDay(x) {
        //     if (x.name.hasOwnProperty(' ')) {
            //         return x.name.slice(0, (day.name.indexOf(' ') + 1));
            //     }
            // }
}

console.log(weeklyForecast);
        
weatherContainer.addEventListener('click', function(e){
    if(e.target.classList.contains('weatherCard')){
        let temp = (e.target.getAttribute('id').split(' '));
        console.log(temp);
        tempParse(temp);
    }
});

function tempParse(temperature){
    //why does this work
    for(temp of temperature){
        switch(temp){
            case 'Mostly':
                temp = 'Sunny';
                console.log(temp);
                break;
        }
    }
    console.log(temp);
}

// function weatherParameters(x){
//     switch(x){
//         case "sunny":
//             param1 = '0c6xIDDpzE81m2q797ordA';
//             param2 ='90';
//             genre= 'classical';
//         case "rainy":
//         case "cloudy":
//     }
// }

searchBtn.addEventListener('click', function(e){
    e.preventDefault()
    weatherContainer.innerHTML = '';
    getWeather();
});

sunny.addEventListener('click', function(){
    console.log('hi');
    param1 = '0c6xIDDpzE81m2q797ordA';
    param2 ='90';
    genre= 'classical';
    sunny.style.background = 'red';
});

// hipHop.addEventListener('click', function(){
    //     genre += 'hip-hop';
    // })
    
    
async function callRec(tr, pop, genre) {
    // need access_token for request
    const url = `https://api.spotify.com/v1/recommendations?seed_tracks=${tr}&limit=10&max_popularity=${pop}&seed_genres=${genre}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + 'BQCHq7i9HCe_QYCdGQbbn_ipUT6rC5BLarrA6iYvqYrbrWIo01LZSabB5c7w1TFCKQhoIb0rINVeDgShNiXDurj52Z14lY2XrQCcWhz2XbfJ_nBaAhpm-g_VLYWM94nFLrYOrX6yRkdLRJgdw4THQfKI310ewP3ZVNQbWYqPK44Uea4t0yVDWgDaKhxEY90xNQ'
            }
        });

        const data = await response.json();
        console.log(data);
        console.log(data.tracks[0]);
    } catch (error) {
        console.log(error);
    }
}
    
subBtn.addEventListener('click', function(e){
    e.preventDefault()
    callRec(param1,param2,genre)
});
// https://api.spotify.com/v1/recommendations?seed_tracks=0c6xIDDpzE81m2q797ordA&limit=10&max_popularity=90&seed_genres='classical'

