const express = require('express');
const spotifyRoutes = require('./src/spotify/routes')
const app = express();
const PORT = 3000; 

app.use(express.json());

app.set('view engine', 'ejs');

app.get('/', (req,res) => {
    res.send()
})

app.get('/', (req,res) => {
    res.send("Hello World");
});

app.use('/api/spotify', spotifyRoutes);

app.listen(PORT, () => console.log(`listening on port ${PORT}`)); 