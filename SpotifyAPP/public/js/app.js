// const { default: fetch } = require("node-fetch");

const searchBar = document.getElementById('searchBar');
const searchBtn = document.getElementById('searchBtn');
const sunny = document.getElementById('sunny');
const hipHop = document.getElementById('hipHop');
const subBtn = document.getElementById('submit');
const weatherContainer = document.getElementById('forecast_container');
const instructions = document.getElementById('instructions');
const trackContainer = document.getElementById('track_container');
const key = document.querySelector('.secret');

let pop;
let dance;
let instr;
let val;
let genre;
let mood; 

searchBtn.addEventListener('click', function(e){
    e.preventDefault()
    instructions.style.visibility = 'hidden';
    weatherContainer.innerHTML = '';
    trackContainer.innerHTML = '';
    getWeather();
    instructions.style.visibility = 'visible'; 
});
 
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
        let data = forecastResponse.properties.periods;
        forecastRender(data);
    })
}

function forecastRender(forecastData){
    forecastData.forEach((day , index) => {
        
        if(index % 2 == 0){

        weatherContainer.innerHTML += 
        `<div class = weatherCard id = "${day.shortForecast}">
        <p class ='dailyName'> ${(day.name).slice(0,3)} </p>
        <p class = 'dailyTemp'> ${day.temperature}° </p>
        <img class = 'dailyImg' src="${day.icon}">`        
        }
    })
}

weatherContainer.addEventListener('click', function(e){
    if(e.target.classList.contains('weatherCard')){
        trackContainer.innerHTML = '';
        let temp = (e.target.getAttribute('id').split(' ')[0]);
        tempParse(temp);
    }
});

function tempParse(temp){
    switch(temp){
        case 'Mostly':
            temp = 'Sunny';
            weatherParameters(temp);
            break;
        case 'Chance':
            temp = 'Thunderstorms';
            break;
        case 'Scattered':
            temp = 'Thunderstorms';
            break;
        case 'Partly':
            temp = 'Cloudy';
            break;
        case 'Areas':
            temp = 'Cloudy';
            break;
    }  
    console.log(temp);
    weatherParameters(temp);
} 

function weatherParameters(temp){
    switch(temp){
        case "Sunny":
            track = '0c6xIDDpzE81m2q797ordA';
            pop= '100';
            dance = '50';
            instr = '50';
            val = '100';
            mood = '1';
            callRec(track, pop, dance, instr, val)
            break;
        case "Thunderstorms":
            track = '0c6xIDDpzE81m2q797ordA';
            pop= '75';
            dance = '10';
            instr = '75';
            val = '10';
            mood = '0';
            callRec(track, pop, dance, instr, val)
            break;
        case "Cloudy":
            track = '0c6xIDDpzE81m2q797ordA';
            pop= '50';
            dance = '25';
            instr = '100';
            val = '50';
            mood = '0';
            callRec(track, pop, dance, instr, val, mood)
            break;
    }
}

async function callRec(tr, pop, dan, ins, val, mood){
    const url =  `https://api.spotify.com/v1/recommendations?seed_tracks=${tr}&limit=10&popularity=${pop}&danceability=${dan}&instrumentalness=${ins}&valence=${val}&mood=${mood}`
    try {
        const accessToken = await fetch('/accesstoken');
        const stringifyToken = await accessToken.json();
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + stringifyToken.access_token
            }
        });

        const data = await response.json();
        renderTracks(data.tracks);
        
    } catch (error) {
        console.log(error);
    }
}

function renderTracks(tracks){
    console.log(tracks);
    for(track of tracks){
     
        trackContainer.innerHTML +=
        `<div class= 'songContainer'>
        <div>
        <img id ='albumArt' src =${track.album.images[0].url}>
        </div>
        <div class = 'songArtist'>
            Artist:${track.artists[0].name}
        </div>
        <div>
            Song:${track.name}
        </div>
        <div>
        </div> 
        <a href=${track.preview_url}>${track.preview_url ? 'Preview' : ''}</a>
        <i class="fa-solid fa-heart-circle-plus favoritesBtn" id = "${track.name} - ${track.artists[0].name}"></i>
        </div>`
        }    
    }
        // create onclick on the favoritesBtn to turn it to red, and to see if we can grab the value from one of the divs
        // send that to server via post route, via front end 
        // then on the backend can write to the database
        // render the playlist from  backend 
        
document.addEventListener('DOMContentLoaded', function(){
    document.addEventListener('click', function(e){
        if(e.target.classList.contains('favoritesBtn')){ 
            let savedTrack = e.target.id;
            console.log(savedTrack);
            e.target.style.color = 'red';
            saveTrack(savedTrack);
        };
    });
});

async function saveTrack(savedTrack = 'jeff'){
    // const url = '/playlist';
        try{
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    "track" : "savedTrack",
                })
            })
        } catch(err){
            console.log(err);
        }
    }
