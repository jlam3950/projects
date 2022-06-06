document.addEventListener('DOMContentLoaded', function(){
    document.addEventListener('click', function(event){
        if(event.target.classList.contains('add-button')){ //look up target
            let movieID = event.target.dataset.imdbid;
            saveToWatchList(movieID);
            return movieID;
        }
    })
});

//json is a text representation of data

function saveToWatchList(id){
    // console.log(id);
    //the find array method will look through an array until the function returns true.
    //it will then return the item 
    const movie = movieData.find(currentMovie => {
        return currentMovie.imdbID == id;
    })

    //pull the watchlist from locaStorage, add it to the watchlist, and save the watchlist back to localStorage. 
    let watchlistJSON = localStorage.getItem('watchlist');
    let watchlist = JSON.parse(watchlistJSON);
    if (watchlist == null){
        watchlist = [];
    } 
        watchlist.push(movie);
        watchlistJSON = JSON.stringify(watchlist);
        localStorage.setItem('watchlist', watchlistJSON);
    console.log(watchlist); 
    
}

const moviesContainer = document.querySelector('.movies-container');
const searchForm = document.getElementById('search-form');
// let movieHtmlArray = []; -probably not needed?
let addBtn = document.querySelector('.btn');

function renderMovies(movieArray){
    let movieHtmlArray = movieArray.map(currentMovie => {
            return `<div class = "col-4 mb-3 mt-3">
                <div class="card" style ="width:12rem"> 
                <img src= "${currentMovie.Poster}" class ='card-img-top'>
                <div class = 'card-body'>
                    <h4 class ='card-title'>${currentMovie.Title}</h4>
                    <p class ='card-text'>${currentMovie.Year}</p>
                    <button class ='btn btn-primary add-button' data-imdbid = "${currentMovie.imdbID}" >Add</button>
                </div>
                </div>
            </div>`
    })
    console.log(movieHtmlArray);
    return movieHtmlArray.join('');
} 

//Step 3 -Make Movies Show Up Whenever You Use the Search Bar 

searchForm.addEventListener('submit', function(e){
    e.preventDefault();
    moviesContainer.innerHTML = renderMovies(movieData);
})
