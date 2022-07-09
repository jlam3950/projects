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
const searchContainer = document.getElementById('search_container')
const loader = document.getElementById('loader');
const resetBtn = document.getElementById('reset');
// const genreTag = document.getElementById('genre_id')

loader.hidden = true;
resetBtn.hidden = true;
let pop;
let dance;
let instr;
let val;
let mood; 
let genreTotal = 'classical';
// let genre = [];


// document.querySelectorAll('#genre_id').forEach(tag => {
//     tag.addEventListener('click', function(){
//         // console.log(tag.innerHTML);
//         genre.push(tag.innerHTML);
//         genreTotal = genre.join();
//         console.log(genreTotal);
//     })
// })

// loading();
// searchContainer.hidden = true;

searchBtn.addEventListener('click', function(e){
    e.preventDefault()
    loading();
    getWeather();
    hideDuringSearch();
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
    complete();
    resetBtn.hidden = false; 
    searchContainer.hidden = true;

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
        instructions.style.visibility = 'hidden';
        console.log(genreTotal);

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
            // callRec( pop, dance, instr, val, genreTotal)
            callRec(track, pop, dance, instr, val, mood, genreTotal)
            break;
        case "Thunderstorms":
            track = '0c6xIDDpzE81m2q797ordA';
            pop= '75';
            dance = '10';
            instr = '75';
            val = '10';
            mood = '0';
            // callRec(track, pop, dance, instr, val, genreTotal);
            callRec(track, pop, dance, instr, val, mood, genreTotal)
            break;
        case "Cloudy":
            track = '0c6xIDDpzE81m2q797ordA';
            pop= '50';
            dance = '25';
            instr = '100';
            val = '50';
            mood = '0';
            // callRec(track, pop, dance, instr, val, mood, genreTotal)
            callRec(track, pop, dance, instr, val, mood, genreTotal)
            break;
        case "Clear":
            track = '0c6xIDDpzE81m2q797ordA';
            pop= '25';
            dance = '50';
            instr = '100';
            val = '50';
            mood = '0';
            // callRec(track, pop, dance, instr, val, mood, genreTotal)
            callRec(track, pop, dance, instr, val, mood, genreTotal)
            break;
    }
}

async function callRec(tr, pop, dan, ins, val, mood, genre){
    const url = `https://api.spotify.com/v1/recommendations?seed_tracks=${tr}&limit=10&popularity=${pop}&danceability=${dan}&instrumentalness=${ins}&valence=${val}&mood=${mood}&genre=${genre}`
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
        
document.addEventListener('DOMContentLoaded', function(){
    document.addEventListener('click', function(e){
        if(e.target.classList.contains('favoritesBtn')){  
            if(e.target.style.color == 'red'){
                e.target.style.color = 'black';
                //can create post request for delete here.
                return;
            }else{
                let savedTrack = e.target.id;
                e.target.style.color = 'red';
                saveTrack(savedTrack);
            }
        };
    });
});

async function saveTrack(savedTrack){
    const url = '/search';

        try{
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    "track" : savedTrack,
                })
            })
        } catch(err){
            console.log(err);
        }
    }

function loading(){
    loader.hidden = false;
    searchContainer.hidden = true;
    trackContainer.hidden = true;
    weatherContainer.hidden = true;
}

function complete(){
    loader.hidden = true;
    searchContainer.hidden = true;
    // trackContainer.hidden = false;
    // weatherContainer.hidden = false;
}

function hideDuringSearch(){
    instructions.style.visibility = 'hidden';
    weatherContainer.innerHTML = '';
    trackContainer.innerHTML = '';
    instructions.style.visibility = 'visible'; 
    trackContainer.style.visibility = 'visible';
    weatherContainer.style.visibility = 'visible';
}

resetBtn.addEventListener('click', function(){
    weatherContainer.style.visibility = 'hidden';
    trackContainer.style.visibility = 'hidden';
    searchContainer.hidden = false;
    genreTotal = 'classical';
    instructions.style.visibility = 'hidden';
    resetBtn.hidden = true;
})