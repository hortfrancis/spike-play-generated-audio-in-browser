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

    // async function fetchAudio() {
    //     const response = await fetch('http://localhost:3000/speech-audio');
    //     console.log(response);
    //     const blob = await response.blob();
    //     const url = URL.createObjectURL(blob);
    //     setAudioSrc(url);
    // }

    const fetchAudio = async () => {
        const text = "I AM MISTER BLOB!!!! Your desired text for speech synthesis. હું હજી ગુજરાતી શીખી રહી છું, તો મારી ગુજરાતી થોડી નબળી છે.";
        try {
            const response = await fetch('http://localhost:3000/text-to-speech', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text }),
            });
            if (response.ok) {
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setAudioSrc(url);
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
