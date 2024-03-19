const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
const path = require('path');

const app = express();

app.use(cors());
app.use(logger);

app.get('/', (req, res) => {
    res.send('Spike server available!');
});

app.get('/speech-audio', (req, res) => {
    const speechFilePath = path.resolve("./speech.mp3");
    res.sendFile(speechFilePath, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error serving the audio file.");
        }
    });
});

module.exports = app;