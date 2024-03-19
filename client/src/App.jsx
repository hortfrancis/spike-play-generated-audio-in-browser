import { useState, useEffect } from 'react'

import './App.css'

function App() {
    const [audioSrc, setAudioSrc] = useState('');

    useEffect(() => {
        // Generic fetch request 
        (async () => {
            const response = await fetch('http://localhost:3000/');
            console.log(response);
        })();
    }
        , [])

    async function fetchAudio() {
        const response = await fetch('http://localhost:3000/speech-audio');
        console.log(response);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setAudioSrc(url);
    }

    return (
        <>
            <h1>Client App</h1>
            <button onClick={fetchAudio}>Get Audio</button>

            {/* Audio element only appears when it has a source */}
            {audioSrc && (
                <audio controls src={audioSrc}>
                    Your browser does not support the audio element.
                </audio>
            )}
        </>
    )
}

export default App
