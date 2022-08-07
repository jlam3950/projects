const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const pool = require('../db');
const playlistController = require ('../controllers/playlistController.js');

route.get('/', playlistController.saveToPlaylist);

module.exports = router;