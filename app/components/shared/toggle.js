export default function Toggle({ value, onChange, classes }) {
    return (
        <label className={`inline-flex items-center cursor-pointer ${classes}`}>
            <input type="checkbox" checked={value} onChange={onChange} className="sr-only peer" />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 dark:peer-focus:ring-black rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600 dark:peer-checked:bg-gray-400"></div>
        </label>
    )
}