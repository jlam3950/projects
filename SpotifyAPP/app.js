// const Spotify = require('spotify-web-api-js');
// const spotifyApi = new Spotify({
//     const clientId = 'd953cd347dda4a9d868ce4ff54ae8983',
//     const clientSecret = '69b2b6da93404c5997ef18c4ef9ebbe4',
//     redirectUri: 'http://localhost:3000'
// }); 

// const APIcontrol = (function(){

//     const clientId = d953cd347dda4a9d868ce4ff54ae8983;
//     const clientSecret = 69b2b6da93404c5997ef18c4ef9ebbe4;

//     const getToken = async () => {

//         const result = await fetch ('https://accounts.spotify.com/api/token', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urleconded',
//                 'Authorization': 'basic' + window.btoa(clientId + ':' + clientSecret)
//             },
//             body: 'grant_type=client_credientals'
//         });

//         const data = await result.json();
//         return data.access_token; 
//     }

//     const getGenres = async(token) => {

//         const result = await fetch('https://api.spotify.com/v1/browse/categories?locale=sv_US',{
//             method: 'GET',
//             headers: { 'Authorization' : 'Bearer ' + token}
//         });

//         const data = await result.json();
//         console.log(data.categories.item);
//         return data.categories.item;
//     }

//     return {
//         getToken(){
//             return getToken();
//         },
//         getGenres(token){
//             return getGenres(token);
//         }
//     }
// })(); 