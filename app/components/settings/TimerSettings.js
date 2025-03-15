import Toggle from "../shared/toggle";

export default function TimerSettings({ pomodoroValue, setPomodoroValue, shortBreakValue, setShortBreakValue, longBreakValue, setLongBreakValue, automaticSequence, setAutomaticSequence }) {

    const handleChange = (e) => {
        localStorage.setItem('automaticSequence', e.target.checked)
        setAutomaticSequence(e.target.checked)
    }

    return (
        <div>
            <div className='flex items-center justify-between gap-6'>
                <div className='flex-1'>
                    <h1 className='font-semibold'>Pomodoro</h1>
                    <input className='border border-gray-400 rounded-md px-2 py-1 mt-2 outline-none w-full' type="number" value={pomodoroValue} onChange={(e) => setPomodoroValue(e.target.value)} />
                    <p className='font-semibold text-gray-400 text-sm mt-1'>minutes</p>
                </div>
                <div className='flex-1'>
                    <h1 className='font-semibold'>Short Break</h1>
                    <input className='border border-gray-400 rounded-md px-2 py-1 mt-2 outline-none w-full' type="number" value={shortBreakValue} onChange={(e) => setShortBreakValue(e.target.value)} />
                    <p className='font-semibold text-gray-400 text-sm mt-1'>minutes</p>
                </div>
                <div className='flex-1'>
                    <h1 className='font-semibold'>Long Break</h1>
                    <input className='border border-gray-400 rounded-md px-2 py-1 mt-2 outline-none w-full' type="number" value={longBreakValue} onChange={(e) => setLongBreakValue(e.target.value)} />
                    <p className='font-semibold text-gray-400 text-sm mt-1'>minutes</p>
                </div>
            </div>
            <div className='flex items-start mt-5'>
                <Toggle classes='mt-3' value={automaticSequence} onChange={handleChange} />
                <div>
                    <p className='font-semibold mt-2 ml-2'>Follow the Pomodoro cycle: Work → Short Break (x4), then a Long Break.</p>
                    <p className='text-gray-400 text-sm ml-2 mt-1'>Dots under &apos;Pomodoro&apos; indicate completed cycles.</p>
                </div>
            </div>
        </div>
    )
}