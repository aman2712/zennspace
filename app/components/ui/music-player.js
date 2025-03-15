import { IoPauseOutline, IoPlay } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/app/context/AppContext";

export default function MusicPlayer() {
    const [playing, setPlaying] = useState(false);
    const [audioData, setAudioData] = useState(new Uint8Array(10));

    const { musicVolume } = useAppContext();

    const audioRef = useRef(null);
    const analyserRef = useRef(null);
    const dataArrayRef = useRef(null);
    const audioContextRef = useRef(null);
    const animationRef = useRef(null);

    // Initialize audio element once
    useEffect(() => {
        audioRef.current = new Audio("https://streams.fluxfm.de/Chillhop/mp3-320/streams.fluxfm.de/");
        audioRef.current.crossOrigin = "anonymous";

        // Cleanup: Pause audio and close AudioContext on unmount
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    // change music volume
    useEffect(() => {
        audioRef.current.volume = musicVolume / 100
    }, [musicVolume])

    const initializeAudioContext = () => {
        if (!audioContextRef.current || audioContextRef.current.state === "closed") {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            const audioContext = audioContextRef.current;

            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 128;

            const source = audioContext.createMediaElementSource(audioRef.current);
            source.connect(analyser);
            analyser.connect(audioContext.destination);

            analyserRef.current = analyser;
            dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
        }

        // Start or resume audio visualization
        const updateAudioData = () => {
            if (analyserRef.current && playing) {
                analyserRef.current.getByteFrequencyData(dataArrayRef.current);
                setAudioData([...dataArrayRef.current]);
            }
            animationRef.current = requestAnimationFrame(updateAudioData);
        };

        if (!animationRef.current) {
            updateAudioData();
        }
    };

    const togglePlay = async () => {
        setPlaying((prev) => !prev);
    };

    useEffect(() => {
        const playAudio = async () => {
            try {
                if (playing) {
                    initializeAudioContext();

                    // Resume AudioContext if suspended
                    if (audioContextRef.current.state === "suspended") {
                        await audioContextRef.current.resume();
                    }

                    // Play audio
                    await audioRef.current.play();
                } else {
                    audioRef.current.pause();
                    setAudioData(new Array(10).fill(50));
                    if (animationRef.current) {
                        cancelAnimationFrame(animationRef.current);
                        animationRef.current = null; // Reset animation frame
                    }
                }
            } catch (error) {
                console.error("Error playing audio:", error);
                setPlaying(false); // Reset state if play fails
            }
        };

        playAudio();

        // No cleanup here to avoid interfering with play/pause toggle
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playing]);

    return (
        <div className="absolute bottom-10 left-20 flex gap-2 items-center h-10">
            <div className="flex items-center">
                {playing ? (
                    <IoPauseOutline
                        size={22}
                        className="cursor-pointer hover:text-gray-300 text-white transition duration-300"
                        onClick={togglePlay}
                    />
                ) : (
                    <IoPlay
                        size={22}
                        className="cursor-pointer hover:text-gray-300 text-white transition duration-300"
                        onClick={togglePlay}
                    />
                )}
            </div>
            <div className="flex gap-1 items-center">
                {!playing || audioData[0] === 0 ? Array(10).fill('').map((value, index) => (
                        <div
                            key={index}
                            className="w-1 rounded-md bg-white"
                            style={{ height: `20px` }}
                        />
                    )) : audioData.slice(0, 10).map((value, index) => (
                        <div
                            key={index}
                            className="w-1 rounded-md bg-white"
                            style={{ height: `${value / 10}px` }}
                        />
                    ))

                }
            </div>
        </div>
    );
}