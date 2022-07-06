// const { default: fetch } = require("node-fetch");

const searchBar = document.getElementById('searchBar');
const searchBtn = document.getElementById('searchBtn');
const sunny = document.getElementById('sunny');
const hipHop = document.getElementById('hipHop');
const subBtn = document.getElementById('submit');
const weatherContainer = document.getElementById('forecast_container');
const instructions = document.getElementById('instructions');
const trackContainer = document.getElementById('track_container');
const favorite = document.querySelector('.favoritesBtn');
const key = document.querySelector('.secret');

 
// const { myKey } = require('./views/search.ejs');
// // import { myKey } from 'search.ejs'
// console.log(myKey);

// import { myKey } from '.views/search.ejs'
// console.log(myKey);

let param1;
let param2;
let genre; 
// let value = key.innerText; 
// console.log(value);

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


function forecastRender(forecastData){
    forecastData.forEach((day , index) => {

        // if((day.name).hasOwnProperty(' ')){
        //             day.name = 'Today';
        //         }
            
        // day.name.replace(/Tonight/i, ' ')
        // console.log(day.name);
    
        
        if(index % 2 == 0){

        weatherContainer.innerHTML += 
        `<div class = weatherCard id = "${day.shortForecast}">
        <p class ='dailyName'> ${(day.name).slice(0,3)} </p>
        <p class = 'dailyTemp'> ${day.temperature}° </p>
        <img class = 'dailyImg' src="${day.icon}">`        
        }
    })
    // function shortenDay(x) {
        //     if (x.name.hasOwnProperty(' ')) {
            //         return x.name.slice(0, (day.name.indexOf(' ') + 1));
            //     }
            // }
}

/* <div> $day.shortForecast </div> */
// was on line 73 with template literal 

weatherContainer.addEventListener('click', function(e){
    if(e.target.classList.contains('weatherCard')){
        trackContainer.innerHTML = '';
        let temp = (e.target.getAttribute('id').split(' '));
        // console.log(temp);
        tempParse(temp);
    }
});

function tempParse(temperature){
    for(temp of temperature){
        switch(temp){
            case 'Mostly':
                temp = 'Sunny';
                console.log(temp);
                weatherParameters(temp);
                break;
            case 'Chance':
                temp = 'Thunderstorms';
                console.log(temp);
                break;
            case 'Partly':
                temp = 'Cloudy';
                console.log(temp);
                break;
        }  
        
        weatherParameters(temp);
    } 
} 

function weatherParameters(temp){
    switch(temp){
        case "Sunny":
            param1 = '0c6xIDDpzE81m2q797ordA';
            param2 ='90';
            genre= 'classical';
            callRec(param1,param2,genre);
            break;
    }
}

async function callRec(tr, pop, genre) {
    // need access_token for request
    const url = `https://api.spotify.com/v1/recommendations?seed_tracks=${tr}&limit=10&max_popularity=${pop}&seed_genres=${genre}`;

    // console.log(value);
    try {
        const accessToken = await fetch('/accesstoken');
        const stringifyToken = await accessToken.json();
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + stringifyToken.access_token
                // Authorization: 'Bearer ${value}'
            }
        });

        const data = await response.json();
        console.log(data.tracks);
        // console.log(data.tracks[0]);
        renderTracks(data.tracks);
        
    } catch (error) {
        console.log(error);
    }
}

function renderTracks(tracks){
    console.log(tracks);
    for(track of tracks){
        // if(track.preview_url === 'null'){
        //     Come back to this
        // }
        trackContainer.innerHTML +=
        `<div class= 'songContainer'>
        <div>
        <img id ='albumArt' src =${track.album.images[0].url}>
        </div>
        <div>
        </div> 
        <a href=${track.preview_url}>Preview</a>
        <i class="fa-solid fa-heart-circle-plus favoritesBtn"></i>
        </div>       
        `
        }    
    }

        // <div class = 'songArtist'>
        //     Artist:${track.artists[0].name}
        // </div>
        // <div>
        //     Song:${track.name}
        // </div>

searchBtn.addEventListener('click', function(e){
    instructions.style.visibility = 'hidden';
    e.preventDefault()
    weatherContainer.innerHTML = '';
    trackContainer.innerHTML = '';
    getWeather();
    instructions.style.visibility = 'visible'; 
});

// favorite.addEventListener('click', function(){
//     favorite.style.color = 'red';

//     if(e.target.classList.contains('fa-solid fa-heart-circle-plus favoritesBtn')){ 
//         let  favoriteId = e.target; 
//         // save  to DB 
//         return favoriteId; 
//     }
// })


