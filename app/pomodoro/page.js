"use client"
import { useState } from "react";
import Image from "next/image";
import Logo from "../components/ui/logo";
import Timer from "../components/ui/timer";
import { useThemeContext } from "../context/ThemeContext";
import { themes } from "@/utils/themes";
import MusicPlayer from "../components/ui/music-player";

import { BsFullscreen } from "react-icons/bs";

export default function Pomodoro() {
    const { theme } = useThemeContext();
    const [showFullscreen, setShowFullscreen] = useState(false);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen(); // Enter fullscreen
        } else {
            document.exitFullscreen(); // Exit fullscreen
        }
    };

    return (
        <div className='flex justify-center items-center h-screen w-screen relative'>
            {theme !== 'Black' && (
                <Image
                    src={`/backgrounds/${themes[theme].url}`}
                    alt="Background"
                    fill={true}
                    objectFit="cover"
                    priority // Ensures fast loading for hero images
                    quality={75} // Adjust quality to balance performance
                    className="-z-20"
                />
            )}
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-30 -z-20"></div>

            <div className='absolute top-10 left-20'>
                <Logo />
            </div>

            {/* Fullscreen Icon Wrapper */}
            <div 
                className="absolute bottom-10 right-20 w-60 h-60"
                onMouseEnter={() => setShowFullscreen(true)}
                onMouseLeave={() => setShowFullscreen(false)}
            >
                {showFullscreen && (
                    <BsFullscreen 
                        className="cursor-pointer text-white text-2xl transition-transform transform hover:scale-110 absolute bottom-10 right-20"
                        onClick={toggleFullscreen}
                    />
                )}
            </div>

            <Timer />
            <MusicPlayer />
        </div>
    )
}
