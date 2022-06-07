document.addEventListener('DOMContentLoaded', function(){
   let localStorageList = localStorage.getItem('watchlist')
   let watchlistJSON = localStorage.getItem('watchlist');
   let watchlist = JSON.parse(watchlistJSON); //converts into json string into an object, while json.stringify converts an object to a json string

    moviesContainer.innerHTML = renderMovies(watchlist);
        
  console.log(watchlist); 
  console.log(JSON.parse(watchlistJSON));
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



