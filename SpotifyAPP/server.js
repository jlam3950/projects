const express = require('express');
const spotifyRoutes = require('./src/spotify/routes')
const app = express();
const PORT = 3000; 

app.use(express.json());
app.set('view engine', 'ejs');

app.get('/login', (req,res) => {
    res.render('login');
})

app.get('/home', (req,res) => {
    res.render('home');
})

app.get('/about', (req,res) => {
    res.render('views');
})

app.get('/', (req,res) => {
    res.send("Hello World");
});

app.use('/api/spotify', spotifyRoutes);

app.listen(PORT, () => console.log(`listening on port ${PORT}`)); 