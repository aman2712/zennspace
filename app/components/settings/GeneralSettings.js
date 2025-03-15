import { useThemeContext } from "@/app/context/ThemeContext";
import EmailSubscription from "../ui/email-subscription";
import { themes } from "@/utils/themes";

import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";

export default function GeneralSettings() {
    const { theme, setTheme } = useThemeContext();

    const handleThemeChange = (e) => {
        setTheme(e.target.value);
        localStorage.setItem('theme', e.target.value);
    }

    return (
        <div>
            <h1 className='font-semibold'>Select Theme:</h1>
            <select className='w-full border border-gray-300 rounded-md p-2 mt-2 outline-none' onChange={handleThemeChange} value={theme}>
                {Object.entries(themes).map(([key, theme]) => (
                    <option key={key} value={key}>
                        {theme.name}
                    </option>
                ))}
            </select>
            <p className='text-sm mt-4 text-gray-400 font-semibold'>We&apos;re working on Animated Themes! Get ready for a whole new vibe - stay tuned!</p>
            <p className='text-sm mt-10 text-gray-400 -mb-3'>Subscribe to our newsletter to be the first to know about new features and get exclusive productivity tips!</p>
            <EmailSubscription />
            <div className='flex items-center mt-5 gap-2'>
                <p className='text-sm text-gray-400'>Follow us on</p>
                <Link href="https://x.com/zennspace" target="_blank">
                    <FaXTwitter size={15} />
                </Link>
            </div>
        </div>
    )
}