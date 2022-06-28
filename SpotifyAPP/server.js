const { response } = require('express');
const express = require('express');
// const spotifyRoutes = require('./src/spotify/routes')
const app = express();
const PORT = 3000; 
const fetch = require('node-fetch');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use('/api/spotify', spotifyRoutes);
app.set('view engine', 'ejs');

const redirect_uri = 'http://localhost:3000/callback';
const client_id = 'd953cd347dda4a9d868ce4ff54ae8983';
const client_secret = '69b2b6da93404c5997ef18c4ef9ebbe4';

app.get('/', (req,res) => {
    res.render('index');
})

app.get('/home', (req,res) => {
    res.render('home');
})

app.get('/authorize', (req,res) => {
    const auth_query_parameters = new URLSearchParams({
        response_type: 'code',
        client_id: 'd953cd347dda4a9d868ce4ff54ae8983',
        scope:'user-read-private user-read-email',
        redirect_uri: 'http://localhost:3000/callback',
        state: '34fFs29kd09'
    })

    // console.log(auth_query_parameters.toString());
    // console.log(("http://accounts.spotify.com/authorize?" + auth_query_parameters.toString()))

    res.redirect("http://accounts.spotify.com/authorize?" + auth_query_parameters.toString());
});

app.get('/callback', async (req,res) => {
    
    const code = req.query.code; 
    console.log(code);

    // SPOTIFY_TOKEN = 'https://accounts.spotify.com/api/token'
    // request_body = {
    //     'grant_type': 'authorization_code',
    //     'code': code,
    //     'redirect_uri': redirect_uri,
    //     'client_id': 'd953cd347dda4a9d868ce4ff54ae8983',
    //     'client_secret': '69b2b6da93404c5997ef18c4ef9ebbe4'
    // }

    // r = requests.post(url=SPOTIFY_TOKEN, data=request_body)
    // resp = r.json();
    // console.log(resp);
    

    const body = new URLSearchParams({
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
    })

    const response = await fetch('https://accounts.spotify.com/api/token',{
        method: 'POST',
        body: body, 
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            'Authorization':
            'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64')
        },
    })

    const data = await response.json(); 
    console.log(data);
    res.render('callback');
});




// app.get('/about', (req,res) => {
//     res.render('about');
// })

// app.get('/users/code', (req,res) => {
//     res.render('about');
// })


// app.get('/token', async function (req, res, next) {
    
//     let base_url = 'https://accounts.spotify.com'
//     let authentication_url = '/authorize'
//     let client_id = '&client_id=d953cd347dda4a9d868ce4ff54ae8983'
//     let response_type = '?response_type=code'
//     let redirect_uri = '&redirect_uri=localhost:3000/users/code'
//     let state = '&state=34fFs29kd09'
//     let scope = '&scope=user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-collaborative playlist-read-private'
    
//     let code_request_url = base_url + authentication_url + response_type + client_id + scope + redirect_uri + state
    
//     let response = await api.get(code_request_url).catch(err => { console.log(err) })
//     console.log(response)
    
//     res.redirect(code_request_url)
//     console.log(response);
// });

// app.get(['/code', '/:'], async function (req, res) {
//     let code = req.query.code
//     let token_base_url = 'https://accounts.spotify.com/api/token'
//     let grant_type = 'authorization_code'
//     let redirect_uri = 'localhost:3000/users/code'
  
  
//     let access_token = await api.request({
//       url: token_base_url,
//       method: 'post',
//       params: {
//         'grant_type': grant_type,
//         'code': code,
//         'redirect_uri': redirect_uri,
//       },
  
  
//       headers:
//       {
//         'content-type': 'application/x-www-form-urlencoded',
//         'authorization': 'Basic ' + "69b2b6da93404c5997ef18c4ef9ebbe4"
//       }
  
  
  
//     }).catch(err => console.log(err))
  
  
  
//     let username = await api.request({
//       url: 'https://api.spotify.com/v1/me',
//       method: 'get',
  
  
//       headers:
//       {
//         'content-type': 'application/x-www-form-urlencoded',
//         'authorization': 'Bearer ' + access_token.data.access_token
//       }
//     }).catch(err => console.log(err))
  
  
//     res.cookie('session_user', username.data.id)
//     res.cookie('access_token', access_token.data.access_token)
//     res.cookie('refresh_token', access_token.data.refresh_token)
//     // res.render('index', { title: "Spotify Themes App" })
//     res.render('about');
  
//     console.log(access_token);
  
//   })

                        
app.listen(PORT, () => console.log(`listening on port ${PORT}`)); 