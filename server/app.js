const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
const path = require('path');
const { textToSpeech } = require('./services/openai');

const app = express();

app.use(cors());
app.use(express.json());
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

app.post('/text-to-speech', async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).send("No text provided");
    }
    
    try {
        const audioBuffer = await textToSpeech(text);
        res.set({
            'Content-Type': 'audio/mpeg',
            'Content-Length': audioBuffer.length
        });
        res.send(audioBuffer);
    } catch (error) {
        console.error("Error generating speech: ", error);
        res.status(500).send("Error generating speech");
    }
});


module.exports = app;