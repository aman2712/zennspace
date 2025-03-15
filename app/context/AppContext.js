"use client";

import { createContext, useContext, useState, useEffect } from "react";

import { POMODORO, LONG_BREAK, SHORT_BREAK } from "@/utils/constants";
import { alerts, alertsList } from "@/utils/alerts";

const AppContext = createContext();

export function AppProvider({ children }) {
    // state for timer variables
    const [pomodoroTime, setPomodoroTime] = useState(1500);
    const [shortBreakTime, setShortBreakTime] = useState(300);
    const [longBreakTime, setLongBreakTime] = useState(600);

    // state for timer
    const [timer, setTimer] = useState(pomodoroTime);
    const [mode, setMode] = useState(POMODORO);
    const [isRunning, setIsRunning] = useState(false);

    // auto pomodoro sequence
    const [automaticSequence, setAutomaticSequence] = useState(false);
    const [pomodoroSequences, setPomodoroSequences] = useState(0);

    // sound alerts state
    const [playAlert, setPlayAlert] = useState(true)
    const [chosenAlert, setChosenAlert] = useState(alertsList.ChillChords);

    // lofi music volume state
    const [musicVolume, setMusicVolume] = useState(50);

    // switch between modes
    const switchModes = (change_to) => {
        setIsRunning(false)
        setMode(change_to);
    }

    // seed existing values in local storage for automatic sequence and alert sound if they exist, load pomodoro times if they exist too
    useEffect(() => {
        const automaticSequence = localStorage.getItem('automaticSequence');
        if (automaticSequence) {
            setAutomaticSequence(automaticSequence === 'true');
        }

        const alert = localStorage.getItem('alert') || alertsList.ChillChords;
        if (alert) {
            setChosenAlert(alert);
        }

        const playAlert = localStorage.getItem('playAlert') || 'true';
        if (playAlert) {
            setPlayAlert(playAlert === 'true');
        }

        setPomodoroTime(parseInt(localStorage.getItem('pomodoroTime')) || 1500);
        setShortBreakTime(parseInt(localStorage.getItem('shortBreakTime')) || 300);
        setLongBreakTime(parseInt(localStorage.getItem('longBreakTime')) || 600);
    }, [])

    // set timer based on mode
    useEffect(() => {
        if (mode === POMODORO) {
            setTimer(pomodoroTime);
        } else if (mode === SHORT_BREAK) {
            setTimer(shortBreakTime);
        } else if (mode === LONG_BREAK) {
            setTimer(longBreakTime);
        }
    }, [mode, pomodoroTime, shortBreakTime, longBreakTime]);

    // timer logic
    useEffect(() => {
        if (!isRunning || timer <= 0) return;

        const interval = setInterval(() => {
            setTimer((prevTime) => {
                if (prevTime <= 1) {
                    if (playAlert) {                        
                        var audio = new Audio(alerts[chosenAlert].url);
                        audio.play()
                    }
                    handleModeSwitch();
                    return 0; // Reset timer to prevent negative values
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval); // Cleanup

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRunning, timer]); // Depend on isRunning and timer

    // Function to handle mode switching
    const handleModeSwitch = () => {
        if (!automaticSequence) {
            console.log("Timer ended");
            return;
        }

        if (mode === POMODORO) {
            setPomodoroSequences((prev) => prev + 1);

            if ((pomodoroSequences + 1) % 4 === 0 && pomodoroSequences !== 0) {
                setMode(LONG_BREAK);
                setTimer(longBreakTime);
            } else {
                setMode(SHORT_BREAK);
                setTimer(shortBreakTime);
            }
        } else {
            setMode(POMODORO);
            setTimer(pomodoroTime);
        }
    };

    const resetAppContext = () => {
        setPomodoroTime(1500)
        setShortBreakTime(300)
        setLongBreakTime(600)
        setAutomaticSequence(false)
        setPlayAlert(true)
        setChosenAlert(alertsList.ChillChords)
        setMusicVolume(50)

        localStorage.setItem('automaticSequence', false)
        localStorage.setItem('alert', alertsList.ChillChords)
        localStorage.setItem('playAlert', true)

        localStorage.setItem('pomodoroTime', 1500)
        localStorage.setItem('shortBreakTime', 300)
        localStorage.setItem('longBreakTime', 600)
    }


    const value = {
        timer,
        setTimer,
        mode,
        switchModes,
        isRunning,
        setIsRunning,
        automaticSequence,
        setAutomaticSequence,
        pomodoroSequences,

        pomodoroTime,
        setPomodoroTime,
        shortBreakTime,
        setShortBreakTime,
        longBreakTime,
        setLongBreakTime,

        chosenAlert,
        setChosenAlert,
        playAlert,
        setPlayAlert,

        musicVolume,
        setMusicVolume,

        resetAppContext
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
