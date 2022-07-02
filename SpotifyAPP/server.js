require('dotenv').config();
const { response } = require('express');
const express = require('express');
const spotifyRoutes = require('./src/spotify/routes')
const app = express();
const PORT = 3000; 
const fetch = require('node-fetch');
const pool = require('./db');


app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static('public'));
app.use(express.json());
app.use('/api/spotify', spotifyRoutes);
app.set('view engine', 'ejs');

const redirect_uri = 'http://localhost:3000/callback';
const client = process.env.CLIENT_ID; 
const secret = process.env.CLIENT_SECRET;
let access_token;

app.get('/', (req,res) => {
    pool.query('SELECT * FROM users', (err,res)=>{
        if(!err){
            console.log(res.rows);
        }else{
            console.log(err);
        }
    });
    res.render('index');
})

app.get('/home', (req,res) => {
    res.render('home');
})

app.get('/authorize', (req,res) => {
    const auth_query_parameters = new URLSearchParams({
        response_type: 'code',
        client_id: client, 
        scope:'user-read-private user-read-email',
        redirect_uri: 'http://localhost:3000/callback',
        state: '34fFs29kd09'
    })
    res.redirect("http://accounts.spotify.com/authorize?" + auth_query_parameters.toString());
});

app.get('/callback', async (req,res) => {
    
    const code = req.query.code; 

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
            'Basic ' + Buffer.from(`${client}:${secret}`).toString('base64')
        },
    })

    const data = await response.json(); 
    access_token = data.access_token;
    // localStorage.setItem('token', access_token);
   
    res.redirect('search');
});

async function endPointData(endpoint){
    const response = await fetch('https://api.spotify.com/v1' + endpoint, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + access_token
        }
    });
    console.log('Bearer ' + access_token);
    //consider pushing information to db, create function (take response)
    const data = await response.json();
    return data;
}

app.get('/search', async (req,res) => {

    const userInfo = await endPointData('/me');
    const recInfo = await endPointData('/recommendations');
    // console.log(userInfo);
     //consider inserting into db, pull
    res.render('search', { user: userInfo });
});

                        
app.listen(PORT, () => console.log(`listening on port ${PORT}`)); 
