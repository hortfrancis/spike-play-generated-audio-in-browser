import { useState, useEffect } from 'react'

import './App.css'

function App() {
    const [audios, setAudios] = useState([]);

    function addAudio(audio) {
        setAudios([...audios, audio]);
    }

    useEffect(() => {
        // Generic fetch request to test backend is working 
        (async () => {
            const response = await fetch('http://localhost:3000/');
            console.log(response);
        })();
    }
        , [])

    const fetchAudio = async () => {
        const text = "That's Mister PIG! to you!";
        try {
            const response = await fetch('http://localhost:3000/text-to-speech', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text }),
            });
            if (response.ok) {
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                // setAudioSrc(url);
                addAudio(url); // Support for multiple audio elements
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.error("Error fetching audio: ", error);
        }
    }


    return (
        <>
            <h1>Client App</h1>
            <button onClick={fetchAudio}>Get Audio</button>

            {audios.map((audio, index) => (
                <audio key={index} autoPlay controls src={audio}>
                    Your browser does not support the audio element.
                </audio>
            ))}
        </>
    )
}

export default App
