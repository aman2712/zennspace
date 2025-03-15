import { useAppContext } from "@/app/context/AppContext";
import { alerts } from "@/utils/alerts";
import { useRef } from "react";
import Toggle from "../shared/toggle";

export default function SoundSettings() {
    const { chosenAlert, setChosenAlert, playAlert, setPlayAlert, musicVolume, setMusicVolume } = useAppContext();
    const audioRef = useRef(null);

    const handleAlertChange = (e) => {
        // Stop and reset previous audio if it exists
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        // Create and play new audio
        audioRef.current = new Audio(alerts[e.target.value].url);
        audioRef.current.play();

        setChosenAlert(e.target.value);
        localStorage.setItem('alert', e.target.value);
    }

    const handleAlertMode = (e) => {
        localStorage.setItem('playAlert', e.target.checked)
        setPlayAlert(e.target.checked)
    }

    return (
        <div className='flex flex-col'>
            <div className='mb-10 w-full flex items-center justify-center bg-gradient py-2 rounded-md'>
                <p className='text-gray-200'>New lo-fi music channels coming soon!</p>
            </div>
            <h1 className='font-semibold'>Choose alert sound</h1>
            <select className='w-full outline-none border border-gray-300 rounded-md p-2 mt-2' onChange={handleAlertChange} value={chosenAlert}>
                {Object.entries(alerts).map(([key, alert]) => (
                    <option key={key} value={key}>
                        {alert.name}
                    </option>
                ))}
            </select>
            <div className='flex mt-10'>
                <Toggle value={playAlert} onChange={handleAlertMode} />
                <p className='ml-2 font-semibold'>Play sound when timer ends</p>
            </div>
            <div className='mt-10'>
                <p className='font-semibold'>Lo-Fi music volume:</p>
                <p className='text-[9px] text-gray-400 mb-3'>ChillHop radio music powered by FluxFM Berlin.</p>
                <input type="range" className='w-[80%] mt-4' min={0} max={100} value={musicVolume} onChange={(e) => setMusicVolume(e.target.value)} />
            </div>
        </div>
    )
}