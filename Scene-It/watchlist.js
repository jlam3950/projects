

document.addEventListener('DOMContentLoaded', function(){
   let localStorageList = localStorage.getItem('watchlist')
   let localList = JSON.parse(localStorageList); 
   if (localList == null){
    localList = [];
}   
   moviesContainer.innerHTML = renderMovies(localList);
   
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
    return listArray.join('');
} 



const removeBtn = document.querySelector('#remove');

removeBtn.addEventListener('click', ()=>{
    window.localStorage.clear();
    moviesContainer.innerHTML = '';
});


