import React, { useEffect, useState } from 'react';
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const appId = process.env.speechlyToken;
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

const VoiceSearch = (props) => {
    const [active, setActive] = useState(false);

    const commands = [
        {
            command: 'reset',
            callback: () => resetTranscript()
        },
        {
            command: 'clear',
            callback: () => resetTranscript()
        },
        {
            command: 'RESET',
            callback: () => resetTranscript()
        },
        {
            command: 'CLEAR',
            callback: () => resetTranscript()
        }
    ];

    const {
        transcript,
        listening,
        browserSupportsSpeechRecognition,
        interimTranscript,
        finalTranscript,
        resetTranscript
    } = useSpeechRecognition({ commands });

    const startListening = () => {
        console.log(listening ? 'stop' : 'started')
        if (listening) {
            SpeechRecognition.stopListening(); resetTranscript();
            setActive(false);
        }
        else {
            SpeechRecognition.startListening({ continuous: true, language: 'en_US' });
            setActive(true);
        }
    }

    useEffect(() => {
        if (finalTranscript !== '') {
            props.keyword(finalTranscript);
        }
    }, [interimTranscript, finalTranscript]);

    return (
        browserSupportsSpeechRecognition ? <span className={active ? 'active' : ''}><i className="icon-mic" onClick={startListening}></i></span> : <></>
    );
};

export default VoiceSearch;