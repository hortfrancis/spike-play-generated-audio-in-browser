const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');

const app = express();

app.use(cors());
app.use(logger);

app.get('/', (req, res) => {
    res.send('Spike server available!');
});

app.get('speech-audio', (req, res) => {
    res.send('Spike server available!');
});

module.exports = app;