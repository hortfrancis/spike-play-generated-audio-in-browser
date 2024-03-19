const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Specify where the speech file should be saved
// const speechFile = path.resolve("./speech.mp3");

// async function main() {
//     const mp3 = await openai.audio.speech.create({
//         model: "tts-1",  
//         voice: "nova",  
//         input: "Hello, this is a text-to-speech test in English & Gujarati. હેલો, મારું નામ સિમા છે. હું હજી ગુજરાતી શીખી રહી છું, તો મારી ગુજરાતી થોડી નબળી છે.",
//     });
//     const buffer = Buffer.from(await mp3.arrayBuffer());
//     await fs.promises.writeFile(speechFile, buffer)
//         .then(() => console.log("Speech file saved to: ", speechFile));
// }
// main();

async function textToSpeech(text) {
    const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "nova",
        input: text,
    });
    const buffer = Buffer.from(await mp3.arrayBuffer());
    return buffer; // Return the buffer for direct transmission
}

module.exports  = { textToSpeech };