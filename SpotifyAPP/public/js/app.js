const searchBar = document.getElementById('searchBar');
const searchBtn = document.getElementById('searchBtn');
const sunny = document.getElementById('sunny');
const hipHop = document.getElementById('hipHop');
const subBtn = document.getElementById('submit');
const weatherContainer = document.getElementById('forecast');
// import {myKey} from views/search.ejs; 

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

function forecastRender(forecastData){
    forecastData.forEach((day , index) => {
        if(index % 2 == 0){
        weatherContainer.innerHTML += 
        `<div class = weatherCard>
        <p> ${day.name} </p>
        <p> ${day.shortForecast} </p>
        <p> ${day.temperature} </p>
        <img src="${day.icon}">`

        }
    })
}

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