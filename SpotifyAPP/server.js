require('dotenv').config();
const { response } = require('express');
const express = require('express');
// const spotifyRoutes = require('./src/spotify/routes')
const app = express();
const PORT = 3000; 
const fetch = require('node-fetch');
// const db = require('./src/spotify/queries');
const pool = require('./db');

app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static('public'));
app.use(express.json());
// app.use('/api/spotify', spotifyRoutes);
app.set('view engine', 'ejs');

const redirect_uri = 'http://localhost:3000/callback';
const client = process.env.CLIENT_ID; 
const secret = process.env.CLIENT_SECRET;
let access_token;
let userInfo; 

app.get('/', (req,res) => {
    
    // pool.query('SELECT * FROM users WHERE user_id=1', (err,res)=>{
    //     if(!err){
    //         console.log(res.rows);
    //     }else{
    //         console.log(err);
    //     }
    // });
    res.render('index');
})

app.post('/'), (req,res) => {

}

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
    console.log('Bearer ' + access_token);
    res.redirect('search');
});

async function endPointData(){
    const response = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + access_token
        }
    });

    const data = await response.json();
    
    try{
         await pool.query('INSERT INTO users (username) VALUES ($1)', [ data.id ])
        } catch (err){
        console.log(err);
    }
    return data;
}

app.get('/search', async (req,res) => {

    const userInfo = await endPointData(); 
    res.render('search', { user: userInfo});  
});

// app.post('/search', async (req,res) =>{
//     try{
//         userInfo = await endPointData('/me');
//         console.log(userInfo);
//          const spotifyID = userInfo.id;
//          await pool.query('INSERT INTO users (username) VALUES ($1)', [ spotifyID ])
//          console.log(res.rows);
//         } catch (err){
//         console.log(err);
//     }
// });

app.get('/accesstoken', (req,res) =>{
    res.send({access_token});
})

app.get('/playlist', (req,res) => {
    res.render('playlist');
})

app.post('/playlist', async (req,res) => {
    try{
    const {track} = req.body;
    console.log(track);
    const newTrack = await pool.query("INSERT INTO testing (track_name) VALUES ($1)," [ track ])
    console.log(res.json(newTrack));
    } catch(err){
        console.log(err);
    }
})

  


// const addTrack = (req,res) => {
//     const { track } = req.body; 
//     // pool.query("SELECT s FROM users s WHERE s.email = $1", [email], (error, results) => {
//         //     if(results.rows.length) {
//             //         res.send('Email already exists.')
//             //     }
            
//             pool.query("INSERT INTO users (track - artist) VALUES ($1)", [ track ], (error,results) =>{
//                 if (error) throw error;
//                 res.status(201).send('User Created Successfully!');
//                 console.log('User created')
//             })
//             // });
//         };
        
app.listen(PORT, () => console.log(`listening on port ${PORT}`)); 