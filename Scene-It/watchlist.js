document.addEventListener('DOMContentLoaded', function(){
//    let localStorageList = localStorage.getItem('watchlist')
   let watchlistJSON = localStorage.getItem('watchlist');
   let watchlist = JSON.parse(watchlistJSON);
    if (watchlist == null){
        watchlist = [];
    } 
        // watchlist.push(movie);
        watchlistJSON = JSON.stringify(watchlist);
        // localStorage.getItem('watchlist', watchlistJSON);
  console.log(watchlist); 
  moviesContainer.innerHTML = renderMovies(movieData)
});

const moviesContainer = document.querySelector('#movies-container');

function renderMovies(list){
    let listArray = list.map(listItem => {
            return `<div class = "col-4 mb-3 mt-3">
                <div class="card" style ="width:12rem"> 
                <img src= "${listItem.Poster}" class ='card-img-top'>
                <div class = 'card-body'>
                    <h4 class ='card-title'>${listItem.Title}</h4>
                    <p class ='card-text'>${listItem.Year}</p>
                    <button class ='btn btn-primary add-button' data-imdbid = "${listItem.imdbID}" >Add</button>
                </div>
                </div>
            </div>`
    })
    console.log(listArray);
    return listArray.join('');
} 



