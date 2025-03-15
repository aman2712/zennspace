"use client";

import { useEffect, useState, useRef } from "react";
import { LONG_BREAK, POMODORO, SHORT_BREAK } from "@/utils/constants";
import { useAppContext } from "@/app/context/AppContext";
import { FaRotateRight } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import Settings from "./settings";

export default function Timer() {
    // Local state for formatted time display
    const [minutes, setMinutes] = useState('25');
    const [seconds, setSeconds] = useState('00');

    // reset button ref
    const resetButtonRef = useRef(null);

    // settings modal state
    const [isOpen, setIsOpen] = useState(false);

    // Get required states and functions from context
    const { timer, setTimer, mode, switchModes, isRunning, setIsRunning, pomodoroSequences, pomodoroTime, shortBreakTime, longBreakTime } = useAppContext();

    // Update minutes and seconds whenever timer changes
    useEffect(() => {
        const minutes = String(Math.floor(timer / 60)).padStart(2, '0');
        const seconds = String(timer % 60).padStart(2, '0');

        setMinutes(minutes);
        setSeconds(seconds);
    }, [timer])
    
    const handleReset = () => {
        resetButtonRef.current.classList.add('animate-spin')
        setIsRunning(false);
        if(mode === POMODORO) setTimer(pomodoroTime);
        if(mode === SHORT_BREAK) setTimer(shortBreakTime);
        if(mode === LONG_BREAK) setTimer(longBreakTime);
        setTimeout(() => resetButtonRef.current.classList.remove('animate-spin'), 1000)
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            {/* Mode selection buttons with active state highlighting */}
            <div className='flex items-center justify-between mb-7'>
                <div className='flex flex-col justify-center items-center relative'>
                    <p className={`text-lg border border-white px-5 py-1.5 rounded-full font-semibold ${mode === POMODORO && 'bg-white text-black'} hover:bg-white hover:text-black transition duration-150 cursor-pointer`} onClick={() => switchModes(POMODORO)}>
                        pomodoro
                    </p>
                    {/* Pomodoro sequence indicators */}
                    <div className='flex items-center mt-2 absolute -bottom-3'>
                        {Array.from({ length: pomodoroSequences }).map((_, index) => (
                            <div key={index} className={`w-2 h-2 rounded-full bg-white ml-1`}></div>
                        ))}
                    </div>
                </div>
                {/* Short break mode button */}
                <p className={`text-lg ml-4 border border-white px-5 py-1.5 rounded-full font-semibold ${mode === SHORT_BREAK && 'bg-white text-black'} hover:bg-white hover:text-black transition duration-150 cursor-pointer`} onClick={() => switchModes(SHORT_BREAK)}>
                    short break
                </p>
                {/* Long break mode button */}
                <p className={`text-lg ml-4 border border-white px-5 py-1.5 rounded-full font-semibold ${mode === LONG_BREAK && 'bg-white text-black'} hover:bg-white hover:text-black transition duration-150 cursor-pointer`} onClick={() => switchModes(LONG_BREAK)}>
                    long break
                </p>
            </div>
            {/* Timer display */}
            <h1 className='text-9xl font-bold font-azeretmono tracking-tighter'>{minutes}:{seconds}</h1>
            {/* Control buttons */}
            <div className='flex mt-6 items-center'>
                {/* Start/Pause button */}
                <button onClick={() => setIsRunning(!isRunning)} className='text-2xl border bg-white text-black border-white px-8 py-2 rounded-full font-semibold hover:bg-transparent hover:text-white transition duration-150 cursor-pointer'>
                    {isRunning ? 'pause' : 'start'}
                </button>
                {/* Reset button */}
                <FaRotateRight className='ml-4 cursor-pointer' size={40} ref={resetButtonRef} onClick={handleReset} />
                {/* Settings button */}
                <IoIosSettings className='ml-4 cursor-pointer' size={40} onClick={() => setIsOpen(true)} />
                {/* Settings */}
                <Settings isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
        </div>
    )
}