import { useState, useEffect } from "react";
import Modal from "../shared/modal";
import { useAppContext } from "@/app/context/AppContext";
import GeneralSettings from "../settings/GeneralSettings";
import TimerSettings from "../settings/TimerSettings";
import SoundSettings from "../settings/SoundSettings";
import { useThemeContext } from "@/app/context/ThemeContext";

const settings = [
    {
        name: 'General',
    },
    {
        name: 'Timers',
    },
    {
        name: 'Sounds',
    },
]

export default function Settings({ isOpen, setIsOpen }) {
    const [currentSetting, setCurrentSetting] = useState('General');

    const { automaticSequence, setAutomaticSequence, pomodoroTime, setPomodoroTime, shortBreakTime, setShortBreakTime, longBreakTime, setLongBreakTime, resetAppContext } = useAppContext();
    const { resetThemeContext } = useThemeContext();

    const [pomodoroValue, setPomodoroValue] = useState(pomodoroTime / 60);
    const [shortBreakValue, setShortBreakValue] = useState(shortBreakTime / 60);
    const [longBreakValue, setLongBreakValue] = useState(longBreakTime / 60);

    useEffect(() => {
        setPomodoroValue(pomodoroTime / 60);
        setShortBreakValue(shortBreakTime / 60);
        setLongBreakValue(longBreakTime / 60);
    }, [pomodoroTime, shortBreakTime, longBreakTime])

    const handleModalSave = () => {
        if(pomodoroValue >= 60 || shortBreakValue >= 60 || longBreakValue >= 60) return
        if(pomodoroValue <= 0 || shortBreakValue <= 0 || longBreakValue <= 0) return
        if(pomodoroValue % 1 !== 0 || shortBreakValue % 1 !== 0 || longBreakValue % 1 !== 0) return
        
        setPomodoroTime(pomodoroValue * 60);
        setShortBreakTime(shortBreakValue * 60);
        setLongBreakTime(longBreakValue * 60);
        setIsOpen(false);

        localStorage.setItem('pomodoroTime', pomodoroValue * 60);
        localStorage.setItem('shortBreakTime', shortBreakValue * 60);
        localStorage.setItem('longBreakTime', longBreakValue * 60);
    }

    const handleReset = () => {
        resetAppContext();
        resetThemeContext();
        setIsOpen(false);

        setPomodoroValue(25);
        setShortBreakValue(5);
        setLongBreakValue(10);
    }

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} onSave={handleModalSave} onReset={handleReset}>
            <div className='flex pt-4'>
                <div className='flex-[0.3]'>
                    {settings.map((setting, index) => (
                        <p
                            key={index}
                            className={`text-lg font-semibold ${currentSetting === setting.name && 'border-b-2'} max-w-fit mb-3 cursor-pointer hover:text-slate-300 transition duration-150`}
                            onClick={() => setCurrentSetting(setting.name)}
                        >
                            {setting.name}
                        </p>
                    ))}
                </div>
                <div className='min-h-[30rem] flex-[0.8]'>
                    {currentSetting === 'General' && (
                        <GeneralSettings />
                    )}
                    {currentSetting === 'Timers' && (
                        <TimerSettings
                            pomodoroValue={pomodoroValue}
                            setPomodoroValue={setPomodoroValue}
                            shortBreakValue={shortBreakValue}
                            setShortBreakValue={setShortBreakValue}
                            longBreakValue={longBreakValue}
                            setLongBreakValue={setLongBreakValue}
                            automaticSequence={automaticSequence}
                            setAutomaticSequence={setAutomaticSequence}
                        />
                    )}
                    {currentSetting === 'Sounds' && (
                        <div>
                            <SoundSettings />
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    )
}